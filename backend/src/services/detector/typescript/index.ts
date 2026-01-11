/**
 * TypeScript/JavaScript prompt detector using TypeScript Compiler API
 */

import ts from "typescript";
import { BaseDetector, type DetectorResult } from "../base.js";
import type {
  DetectedPrompt,
  DetectedMessage,
  ExtractedConfig,
  DetectorOptions,
  DetectionError,
  AIProvider,
  PromptType,
  DEFAULT_DETECTOR_OPTIONS,
} from "../types.js";
import { logger } from "../../../lib/logger.js";

interface VariableDefinition {
  name: string;
  value: string;
  line: number;
  column: number;
}

export class TypeScriptDetector extends BaseDetector {
  readonly language = "typescript" as const;
  readonly extensions = ["ts", "tsx", "js", "jsx", "mjs", "cjs"];

  // Variable definitions found in the file (for resolution)
  private variableMap: Map<string, VariableDefinition> = new Map();
  private sourceFile: ts.SourceFile | null = null;
  private code: string = "";

  async detect(
    code: string,
    filePath: string,
    options: DetectorOptions = {}
  ): Promise<DetectorResult> {
    const prompts: DetectedPrompt[] = [];
    const errors: DetectionError[] = [];

    this.code = code;
    this.variableMap.clear();

    try {
      // Parse the source file
      this.sourceFile = ts.createSourceFile(
        filePath,
        code,
        ts.ScriptTarget.Latest,
        true, // setParentNodes - needed for traversal
        this.getScriptKind(filePath)
      );

      // First pass: collect variable definitions
      if (options.resolveVariables !== false) {
        this.collectVariableDefinitions(this.sourceFile);
      }

      // Second pass: find AI SDK calls
      this.visitNode(this.sourceFile, prompts, errors, filePath, options);

    } catch (error) {
      errors.push({
        filePath,
        message: `Failed to parse file: ${(error as Error).message}`,
        code: "PARSE_ERROR",
      });
    }

    return { prompts, errors };
  }

  private getScriptKind(filePath: string): ts.ScriptKind {
    const ext = filePath.split(".").pop()?.toLowerCase();
    switch (ext) {
      case "tsx":
        return ts.ScriptKind.TSX;
      case "jsx":
        return ts.ScriptKind.JSX;
      case "js":
      case "mjs":
      case "cjs":
        return ts.ScriptKind.JS;
      default:
        return ts.ScriptKind.TS;
    }
  }

  /**
   * First pass: collect all variable/const definitions for later resolution
   */
  private collectVariableDefinitions(node: ts.Node): void {
    if (ts.isVariableDeclaration(node) && node.initializer) {
      const name = node.name.getText(this.sourceFile!);
      const value = this.extractStringValue(node.initializer);

      if (value !== null) {
        const { line, character } = this.sourceFile!.getLineAndCharacterOfPosition(
          node.getStart(this.sourceFile!)
        );
        this.variableMap.set(name, {
          name,
          value,
          line: line + 1,
          column: character + 1,
        });
      }
    }

    ts.forEachChild(node, (child) => this.collectVariableDefinitions(child));
  }

  /**
   * Extract string value from various node types
   */
  private extractStringValue(node: ts.Node): string | null {
    // String literal: "hello" or 'hello'
    if (ts.isStringLiteral(node)) {
      return node.text;
    }

    // Template literal: `hello ${world}`
    if (ts.isTemplateExpression(node)) {
      return this.extractTemplateExpression(node);
    }

    // No substitution template: `hello`
    if (ts.isNoSubstitutionTemplateLiteral(node)) {
      return node.text;
    }

    // Identifier - look up in variable map
    if (ts.isIdentifier(node)) {
      const varDef = this.variableMap.get(node.text);
      return varDef?.value ?? null;
    }

    // Binary expression (string concatenation): "a" + "b"
    if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) {
      const left = this.extractStringValue(node.left);
      const right = this.extractStringValue(node.right);
      if (left !== null && right !== null) {
        return left + right;
      }
    }

    return null;
  }

  /**
   * Extract template expression with placeholders
   */
  private extractTemplateExpression(node: ts.TemplateExpression): string {
    let result = node.head.text;

    for (const span of node.templateSpans) {
      // Add placeholder for the expression
      const exprText = span.expression.getText(this.sourceFile!);
      result += `\${${exprText}}`;
      result += span.literal.text;
    }

    return result;
  }

  /**
   * Main visitor - traverse AST looking for AI SDK calls
   */
  private visitNode(
    node: ts.Node,
    prompts: DetectedPrompt[],
    errors: DetectionError[],
    filePath: string,
    options: DetectorOptions
  ): void {
    // Check if this is a call expression
    if (ts.isCallExpression(node)) {
      const detected = this.analyzeCallExpression(node, filePath, options);
      if (detected) {
        prompts.push(detected);
      }
    }

    // Recurse into children
    ts.forEachChild(node, (child) =>
      this.visitNode(child, prompts, errors, filePath, options)
    );
  }

  /**
   * Analyze a call expression to see if it's an AI SDK call
   */
  private analyzeCallExpression(
    node: ts.CallExpression,
    filePath: string,
    options: DetectorOptions
  ): DetectedPrompt | null {
    const callText = node.expression.getText(this.sourceFile!);

    // Detect provider and method
    const detection = this.detectProviderAndMethod(callText);
    if (!detection) return null;

    const { provider, sdkMethod } = detection;

    // Check if we should detect this provider
    if (options.providers && !options.providers.includes(provider)) {
      return null;
    }

    // Get position info
    const startPos = this.sourceFile!.getLineAndCharacterOfPosition(node.getStart(this.sourceFile!));
    const endPos = this.sourceFile!.getLineAndCharacterOfPosition(node.getEnd());

    // Extract the config object (first argument)
    const configArg = node.arguments[0];
    if (!configArg || !ts.isObjectLiteralExpression(configArg)) {
      return null;
    }

    // Parse the config
    const { messages, config, promptType, warnings } = this.parseConfigObject(configArg, provider);

    // Collect all variables from messages
    const allVariables = messages.flatMap(m => m.variables);

    const prompt: DetectedPrompt = {
      filePath,
      lineNumber: startPos.line + 1,
      columnNumber: startPos.character + 1,
      endLineNumber: endPos.line + 1,
      endColumnNumber: endPos.character + 1,
      promptType,
      provider,
      sdkMethod,
      originalContent: node.getText(this.sourceFile!),
      extractedConfig: config,
      messages,
      variables: [...new Set(allVariables)],
      confidence: 0,
      warnings,
    };

    prompt.confidence = this.calculateConfidence(prompt);

    return prompt;
  }

  /**
   * Detect which AI provider and SDK method is being called
   */
  private detectProviderAndMethod(callText: string): { provider: AIProvider; sdkMethod: string } | null {
    // OpenAI patterns
    if (/(?:openai|client)\s*\.\s*chat\s*\.\s*completions\s*\.\s*create/.test(callText)) {
      return { provider: "openai", sdkMethod: "chat.completions.create" };
    }
    if (/(?:openai|client)\s*\.\s*beta\s*\.\s*chat\s*\.\s*completions\s*\.\s*parse/.test(callText)) {
      return { provider: "openai", sdkMethod: "beta.chat.completions.parse" };
    }
    if (/(?:openai|client)\s*\.\s*completions\s*\.\s*create/.test(callText)) {
      return { provider: "openai", sdkMethod: "completions.create" };
    }

    // Anthropic patterns
    if (/(?:anthropic|client)\s*\.\s*messages\s*\.\s*create/.test(callText)) {
      return { provider: "anthropic", sdkMethod: "messages.create" };
    }
    if (/(?:anthropic|client)\s*\.\s*completions\s*\.\s*create/.test(callText)) {
      return { provider: "anthropic", sdkMethod: "completions.create" };
    }

    // Azure OpenAI patterns
    if (/(?:azure|azureClient)\s*\.\s*chat\s*\.\s*completions\s*\.\s*create/.test(callText)) {
      return { provider: "azure", sdkMethod: "chat.completions.create" };
    }

    // Google AI patterns
    if (/(?:genai|model)\s*\.\s*generateContent/.test(callText)) {
      return { provider: "google", sdkMethod: "generateContent" };
    }

    return null;
  }

  /**
   * Parse the config object to extract messages, model, etc.
   */
  private parseConfigObject(
    configNode: ts.ObjectLiteralExpression,
    provider: AIProvider
  ): {
    messages: DetectedMessage[];
    config: ExtractedConfig;
    promptType: PromptType;
    warnings: string[];
  } {
    const messages: DetectedMessage[] = [];
    const warnings: string[] = [];
    const config: ExtractedConfig = {
      model: null,
      temperature: null,
      maxTokens: null,
      topP: null,
      stream: false,
      tools: [],
      responseFormat: null,
    };
    let promptType: PromptType = "user";

    for (const prop of configNode.properties) {
      if (!ts.isPropertyAssignment(prop)) continue;

      const propName = prop.name.getText(this.sourceFile!);

      switch (propName) {
        case "model":
          config.model = this.extractStringValue(prop.initializer);
          break;

        case "temperature":
          if (ts.isNumericLiteral(prop.initializer)) {
            config.temperature = parseFloat(prop.initializer.text);
          }
          break;

        case "max_tokens":
        case "maxTokens":
          if (ts.isNumericLiteral(prop.initializer)) {
            config.maxTokens = parseInt(prop.initializer.text, 10);
          }
          break;

        case "top_p":
        case "topP":
          if (ts.isNumericLiteral(prop.initializer)) {
            config.topP = parseFloat(prop.initializer.text);
          }
          break;

        case "stream":
          if (prop.initializer.kind === ts.SyntaxKind.TrueKeyword) {
            config.stream = true;
          }
          break;

        case "messages":
          const parsedMessages = this.parseMessages(prop.initializer);
          messages.push(...parsedMessages);
          break;

        case "system":
          // Anthropic style: system is a top-level string
          const systemContent = this.extractStringValue(prop.initializer);
          if (systemContent) {
            messages.unshift({
              role: "system",
              content: systemContent,
              variables: this.extractVariables(systemContent),
            });
            promptType = "system";
          }
          break;

        case "tools":
          if (ts.isArrayLiteralExpression(prop.initializer)) {
            config.tools = this.parseTools(prop.initializer);
            promptType = "tool";
          }
          break;

        case "response_format":
        case "responseFormat":
          config.responseFormat = this.parseResponseFormat(prop.initializer);
          if (config.responseFormat) {
            promptType = "structured_output";
          }
          break;
      }
    }

    // Determine prompt type from messages if not set by tools/response_format
    if (promptType === "user" && messages.some(m => m.role === "system")) {
      promptType = "system";
    }

    return { messages, config, promptType, warnings };
  }

  /**
   * Parse messages array
   */
  private parseMessages(node: ts.Node): DetectedMessage[] {
    const messages: DetectedMessage[] = [];

    if (!ts.isArrayLiteralExpression(node)) {
      // Might be a variable reference
      if (ts.isIdentifier(node)) {
        const varDef = this.variableMap.get(node.text);
        if (varDef) {
          // Try to parse the variable value as JSON
          try {
            const parsed = JSON.parse(varDef.value);
            if (Array.isArray(parsed)) {
              for (const msg of parsed) {
                if (msg.role && msg.content) {
                  messages.push({
                    role: msg.role,
                    content: msg.content,
                    variables: this.extractVariables(msg.content),
                  });
                }
              }
            }
          } catch {
            // Not valid JSON, skip
          }
        }
      }
      return messages;
    }

    for (const element of node.elements) {
      if (ts.isObjectLiteralExpression(element)) {
        const msg = this.parseMessageObject(element);
        if (msg) {
          messages.push(msg);
        }
      }
    }

    return messages;
  }

  /**
   * Parse a single message object
   */
  private parseMessageObject(node: ts.ObjectLiteralExpression): DetectedMessage | null {
    let role = "";
    let content = "";
    let variableRef: DetectedMessage["variableRef"];

    for (const prop of node.properties) {
      if (!ts.isPropertyAssignment(prop)) continue;

      const propName = prop.name.getText(this.sourceFile!);

      if (propName === "role") {
        role = this.extractStringValue(prop.initializer) || "";
      } else if (propName === "content") {
        // Check if content is a variable reference
        if (ts.isIdentifier(prop.initializer)) {
          const varName = prop.initializer.text;
          const varDef = this.variableMap.get(varName);
          if (varDef) {
            content = varDef.value;
            variableRef = {
              name: varName,
              definedAt: { line: varDef.line, column: varDef.column },
            };
          } else {
            content = `{{${varName}}}`; // Mark as unresolved variable
          }
        } else {
          content = this.extractStringValue(prop.initializer) || "";
        }
      }
    }

    if (!role) return null;

    return {
      role,
      content,
      variables: this.extractVariables(content),
      variableRef,
    };
  }

  /**
   * Parse tools array
   */
  private parseTools(node: ts.ArrayLiteralExpression): ExtractedConfig["tools"] {
    const tools: ExtractedConfig["tools"] = [];

    for (const element of node.elements) {
      if (ts.isObjectLiteralExpression(element)) {
        let name = "";
        let description = "";

        for (const prop of element.properties) {
          if (!ts.isPropertyAssignment(prop)) continue;
          const propName = prop.name.getText(this.sourceFile!);

          if (propName === "function" && ts.isObjectLiteralExpression(prop.initializer)) {
            // OpenAI style: { type: "function", function: { name, description } }
            for (const fnProp of prop.initializer.properties) {
              if (!ts.isPropertyAssignment(fnProp)) continue;
              const fnPropName = fnProp.name.getText(this.sourceFile!);
              if (fnPropName === "name") {
                name = this.extractStringValue(fnProp.initializer) || "";
              } else if (fnPropName === "description") {
                description = this.extractStringValue(fnProp.initializer) || "";
              }
            }
          } else if (propName === "name") {
            name = this.extractStringValue(prop.initializer) || "";
          } else if (propName === "description") {
            description = this.extractStringValue(prop.initializer) || "";
          }
        }

        if (name) {
          tools.push({ name, description });
        }
      }
    }

    return tools;
  }

  /**
   * Parse response_format object
   */
  private parseResponseFormat(node: ts.Node): ExtractedConfig["responseFormat"] {
    if (!ts.isObjectLiteralExpression(node)) return null;

    let type: "json_object" | "json_schema" | "text" = "text";

    for (const prop of node.properties) {
      if (!ts.isPropertyAssignment(prop)) continue;
      const propName = prop.name.getText(this.sourceFile!);

      if (propName === "type") {
        const typeValue = this.extractStringValue(prop.initializer);
        if (typeValue === "json_object") type = "json_object";
        else if (typeValue === "json_schema") type = "json_schema";
      }
    }

    return { type };
  }
}

// Export singleton instance
export const typescriptDetector = new TypeScriptDetector();
