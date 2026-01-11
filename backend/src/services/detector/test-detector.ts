/**
 * Test script for the prompt detector
 * Run with: npx tsx src/services/detector/test-detector.ts
 */

import { detectPromptsInFile } from "./index.js";

const testCode = `
import OpenAI from "openai";

const openai = new OpenAI();

// Variable that holds the system prompt
const systemPrompt = "You are a helpful coding assistant that writes clean TypeScript code.";

// User prompt template
const userTemplate = \`Please help me with the following task: \${task}\`;

async function chatWithGPT(task: string, context: string) {
  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: \`Task: \${task}\\n\\nContext: \${context}\` },
    ],
    temperature: 0.7,
    max_tokens: 2000,
    stream: true,
  });

  return response;
}

// Another function with tools
async function functionCalling() {
  const client = new OpenAI();

  const response = await client.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: "You are a weather assistant." },
      { role: "user", content: "What's the weather in San Francisco?" },
    ],
    tools: [
      {
        type: "function",
        function: {
          name: "get_weather",
          description: "Get the current weather for a location",
          parameters: {
            type: "object",
            properties: {
              location: { type: "string", description: "City name" },
            },
            required: ["location"],
          },
        },
      },
    ],
  });

  return response;
}

// Structured output example
async function structuredOutput() {
  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo",
    messages: [
      { role: "user", content: "Extract the name and age from: John is 25 years old" },
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "person",
        schema: {
          type: "object",
          properties: {
            name: { type: "string" },
            age: { type: "number" },
          },
        },
      },
    },
  });

  return response;
}
`;

async function runTest() {
  console.log("Testing TypeScript Detector with AST parsing...\n");
  console.log("=".repeat(60));

  const result = await detectPromptsInFile(testCode, "test.ts", {
    resolveVariables: true,
    providers: ["openai", "anthropic"],
  });

  console.log(`\nFound ${result.prompts.length} prompts:\n`);

  for (let i = 0; i < result.prompts.length; i++) {
    const prompt = result.prompts[i];
    console.log(`--- Prompt ${i + 1} ---`);
    console.log(`  Location: Line ${prompt.lineNumber}, Column ${prompt.columnNumber}`);
    console.log(`  Provider: ${prompt.provider}`);
    console.log(`  SDK Method: ${prompt.sdkMethod}`);
    console.log(`  Type: ${prompt.promptType}`);
    console.log(`  Model: ${prompt.extractedConfig.model || "not specified"}`);
    console.log(`  Temperature: ${prompt.extractedConfig.temperature ?? "not specified"}`);
    console.log(`  Max Tokens: ${prompt.extractedConfig.maxTokens ?? "not specified"}`);
    console.log(`  Stream: ${prompt.extractedConfig.stream}`);
    console.log(`  Confidence: ${(prompt.confidence * 100).toFixed(0)}%`);
    console.log(`  Messages (${prompt.messages.length}):`);
    for (const msg of prompt.messages) {
      console.log(`    - [${msg.role}]: "${msg.content.substring(0, 50)}${msg.content.length > 50 ? "..." : ""}"`);
      if (msg.variables.length > 0) {
        console.log(`      Variables: ${msg.variables.join(", ")}`);
      }
      if (msg.variableRef) {
        console.log(`      From variable: ${msg.variableRef.name} (defined at line ${msg.variableRef.definedAt?.line})`);
      }
    }
    if (prompt.extractedConfig.tools.length > 0) {
      console.log(`  Tools: ${prompt.extractedConfig.tools.map(t => t.name).join(", ")}`);
    }
    if (prompt.extractedConfig.responseFormat) {
      console.log(`  Response Format: ${prompt.extractedConfig.responseFormat.type}`);
    }
    console.log("");
  }

  if (result.errors.length > 0) {
    console.log("\nErrors:");
    for (const error of result.errors) {
      console.log(`  - ${error.message} (${error.code})`);
    }
  }

  console.log("=".repeat(60));
  console.log("Test complete!");
}

runTest().catch(console.error);
