import { logger } from "../../lib/logger.js";

interface DetectedPromptData {
  filePath: string;
  lineNumber: number;
  columnNumber: number;
  promptType: "system" | "user" | "assistant" | "tool" | "structured_output";
  originalContent: string;
  extractedConfig: {
    model: string;
    temperature: number | null;
    maxTokens: number | null;
    stream: boolean;
    tools: any[];
    responseFormat: any | null;
  };
  messages: Array<{
    role: string;
    content: string;
    variables: string[];
  }>;
  variables: string[];
}

// Regex patterns for OpenAI SDK detection
const OPENAI_CALL_PATTERN =
  /(?:openai|client)\s*\.\s*(?:chat\s*\.\s*completions|beta\.chat\.completions)\s*\.\s*create\s*\(/g;
const MESSAGE_PATTERN = /messages\s*:\s*\[([^\]]*)\]/gs;
const ROLE_CONTENT_PATTERN = /role\s*:\s*["'](\w+)["'][^}]*content\s*:\s*(?:["'`]([^"'`]*?)["'`]|(\w+))/g;
const MODEL_PATTERN = /model\s*:\s*["']([^"']+)["']/;
const TEMPERATURE_PATTERN = /temperature\s*:\s*([\d.]+)/;
const MAX_TOKENS_PATTERN = /max_tokens\s*:\s*(\d+)/;
const STREAM_PATTERN = /stream\s*:\s*(true|false)/;
const TOOLS_PATTERN = /tools\s*:\s*\[/;
const RESPONSE_FORMAT_PATTERN = /response_format\s*:\s*\{/;

// Pattern for template variables like ${variable} or {variable}
const VARIABLE_PATTERN = /\$\{(\w+)\}|\{(\w+)\}/g;

function extractVariables(content: string): string[] {
  const variables: string[] = [];
  let match;
  while ((match = VARIABLE_PATTERN.exec(content)) !== null) {
    variables.push(match[1] || match[2]);
  }
  return [...new Set(variables)];
}

function getLineNumber(code: string, index: number): { line: number; column: number } {
  const lines = code.substring(0, index).split("\n");
  return {
    line: lines.length,
    column: lines[lines.length - 1].length + 1,
  };
}

export function detectOpenAIPrompts(code: string, filePath: string): DetectedPromptData[] {
  const prompts: DetectedPromptData[] = [];

  // Find all OpenAI chat completion calls
  let callMatch;
  OPENAI_CALL_PATTERN.lastIndex = 0;

  while ((callMatch = OPENAI_CALL_PATTERN.exec(code)) !== null) {
    const startIndex = callMatch.index;
    const { line, column } = getLineNumber(code, startIndex);

    // Extract the full call block (rough extraction - find matching parentheses)
    let depth = 1;
    let endIndex = startIndex + callMatch[0].length;
    while (depth > 0 && endIndex < code.length) {
      if (code[endIndex] === "(") depth++;
      if (code[endIndex] === ")") depth--;
      endIndex++;
    }

    const callBlock = code.substring(startIndex, endIndex);

    // Extract messages
    const messages: Array<{ role: string; content: string; variables: string[] }> = [];
    MESSAGE_PATTERN.lastIndex = 0;
    const messagesMatch = MESSAGE_PATTERN.exec(callBlock);

    if (messagesMatch) {
      const messagesContent = messagesMatch[1];
      ROLE_CONTENT_PATTERN.lastIndex = 0;
      let roleMatch;

      while ((roleMatch = ROLE_CONTENT_PATTERN.exec(messagesContent)) !== null) {
        const role = roleMatch[1];
        const content = roleMatch[2] || roleMatch[3] || "";
        const variables = extractVariables(content);

        messages.push({ role, content, variables });
      }
    }

    // Extract config
    const modelMatch = MODEL_PATTERN.exec(callBlock);
    const tempMatch = TEMPERATURE_PATTERN.exec(callBlock);
    const maxTokensMatch = MAX_TOKENS_PATTERN.exec(callBlock);
    const streamMatch = STREAM_PATTERN.exec(callBlock);
    const hasTools = TOOLS_PATTERN.test(callBlock);
    const hasResponseFormat = RESPONSE_FORMAT_PATTERN.test(callBlock);

    // Determine prompt type based on content
    let promptType: DetectedPromptData["promptType"] = "user";
    if (messages.some((m) => m.role === "system")) {
      promptType = "system";
    }
    if (hasTools) {
      promptType = "tool";
    }
    if (hasResponseFormat) {
      promptType = "structured_output";
    }

    // Collect all variables
    const allVariables = messages.flatMap((m) => m.variables);

    prompts.push({
      filePath,
      lineNumber: line,
      columnNumber: column,
      promptType,
      originalContent: callBlock,
      extractedConfig: {
        model: modelMatch?.[1] || "gpt-4",
        temperature: tempMatch ? parseFloat(tempMatch[1]) : null,
        maxTokens: maxTokensMatch ? parseInt(maxTokensMatch[1], 10) : null,
        stream: streamMatch?.[1] === "true",
        tools: [], // Would need deeper parsing
        responseFormat: null, // Would need deeper parsing
      },
      messages,
      variables: [...new Set(allVariables)],
    });

    logger.debug("Detected OpenAI prompt", { filePath, line, messagesCount: messages.length });
  }

  return prompts;
}
