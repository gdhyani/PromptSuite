"use client";

import { useState } from "react";
import { RequestsSidebar, type RequestItem } from "@/components/layout/RequestsSidebar";
import { LogDetailView } from "@/components/logs/LogDetailView";
import { PromptResponseViewer } from "@/components/logs/PromptResponseViewer";

// Mock data for demo - matching PromptLayer style
const mockRequests: RequestItem[] = [
  {
    id: "1",
    model: "gpt-3.5-turbo",
    promptPreview: "You are a friendly AI personal stylist. Your client is not very stylish or wise, and he...",
    responsePreview: "It looks like there is no chance of rain today, so it should be safe to wear suede! Enjoy...",
    timestamp: "3:12:03 AM",
    status: "success",
    promptName: "daily_weather",
    cost: 0.0010275,
    latencyMs: 1000,
  },
  {
    id: "2",
    model: "gpt-3.5-turbo",
    promptPreview: "You are a friendly AI personal stylist. Your client is not very stylish or wise, and he needs...",
    responsePreview: "Today will be mild and partly cloudy, with a max temperature of around 77°F. Suns...",
    timestamp: "3:12:01 AM",
    status: "success",
    promptName: "daily_weather",
  },
  {
    id: "3",
    model: "gpt-3.5-turbo",
    promptPreview: "You are a friendly AI personal stylist. Your client is not very stylish or wise, and he needs...",
    responsePreview: "Today's precipitation probability is 0, so it seems safe to wear suede! Enjoy your stylis...",
    timestamp: "2 days ago",
    status: "success",
    promptName: "daily_weather",
  },
  {
    id: "4",
    model: "gpt-3.5-turbo",
    promptPreview: "You are a friendly AI personal stylist. Your client is not very stylish or wise, and he needs...",
    responsePreview: "Today will have scattered clouds and be cool, with a high of around 73°F. Sunset at...",
    timestamp: "2 days ago",
    status: "success",
    promptName: "daily_weather",
  },
  {
    id: "5",
    model: "gpt-4",
    promptPreview: "Analyze this code snippet and identify potential security vulnerabilities...",
    responsePreview: "I've identified 3 potential security issues: 1) SQL injection vulnerability in the query...",
    timestamp: "3 days ago",
    status: "success",
    promptName: "code_review",
  },
  {
    id: "6",
    model: "gpt-3.5-turbo",
    promptPreview: "Generate a creative marketing tagline for a sustainable fashion brand...",
    responsePreview: "Error: Rate limit exceeded. Please try again later.",
    timestamp: "4 days ago",
    status: "error",
    promptName: "marketing_copy",
  },
];

interface LogDetail {
  id: string;
  promptName: string;
  promptNumber: number;
  model: string;
  apiCall: string;
  tags: Array<{ name: string; color: "blue" | "slate" | "emerald" | "amber" | "violet" }>;
  loggedAt: string;
  score: number;
  metrics: {
    time: string;
    cost: string;
    inputTokens: number;
    outputTokens: number;
    frequencyPenalty: number;
    maxTokens: number;
    presencePenalty: number;
    seed: number;
    temperature: number;
    topP: number;
  };
}

const mockLogDetails: Record<string, LogDetail> = {
  "1": {
    id: "1",
    promptName: "daily_weather",
    promptNumber: 7,
    model: "gpt-3.5-turbo",
    apiCall: "openai.OpenAI.chat.completions.create",
    tags: [
      { name: "prod", color: "slate" },
      { name: "weather-message-follow-up", color: "blue" },
    ],
    loggedAt: "16 hours ago",
    score: 100,
    metrics: {
      time: "1s",
      cost: "$0.0010275",
      inputTokens: 645,
      outputTokens: 30,
      frequencyPenalty: 0,
      maxTokens: 256,
      presencePenalty: 0,
      seed: 0,
      temperature: 0.66,
      topP: 1,
    },
  },
  "5": {
    id: "5",
    promptName: "code_review",
    promptNumber: 12,
    model: "gpt-4",
    apiCall: "openai.OpenAI.chat.completions.create",
    tags: [
      { name: "prod", color: "emerald" },
      { name: "security-review", color: "violet" },
    ],
    loggedAt: "3 days ago",
    score: 95,
    metrics: {
      time: "2.3s",
      cost: "$0.0456",
      inputTokens: 1245,
      outputTokens: 456,
      frequencyPenalty: 0,
      maxTokens: 1024,
      presencePenalty: 0,
      seed: 0,
      temperature: 0.3,
      topP: 1,
    },
  },
};

const defaultLogDetail = mockLogDetails["1"];

interface Message {
  role: "system" | "user" | "assistant";
  content: string;
  variables?: Record<string, string>;
}

interface ResponseMessage {
  role: "assistant";
  content: string;
}

const mockMessagesMap: Record<string, Message[]> = {
  "1": [
    {
      role: "assistant",
      content: "Some jeans or trousers and comfortable shoes that are suitable for wet conditions, such as waterproof boots or sneakers.",
    },
    {
      role: "user",
      content: `Today is August 22

Summary: Scattered clouds. Mild.
Temperature Max: 77.54
Precip Probability: 0
Temperature Min: 56.48
Icon: clear-day
Humidity: 0.4
Wind Speed: 9.83
Time: 1724299200
Precip Type: rain
Sunset Time: 1724370240
Sunrise Time: 1724321520
Pressure: 1019.64`,
      variables: {
        date: "August 22",
        summary: "Scattered clouds. Mild.",
      },
    },
  ],
  "5": [
    {
      role: "system",
      content: "You are a senior security engineer reviewing code for vulnerabilities. Be thorough and specific.",
    },
    {
      role: "user",
      content: `Please review this code snippet for security issues:

function getUserData(userId) {
  const query = "SELECT * FROM users WHERE id = " + userId;
  return db.execute(query);
}`,
    },
  ],
};

const defaultMessages = mockMessagesMap["1"];

const mockResponsesMap: Record<string, ResponseMessage> = {
  "1": {
    role: "assistant",
    content: "It looks like there is no chance of rain today, so it should be safe to wear suede! Enjoy your stylish outfit without worrying about the weather.",
  },
  "5": {
    role: "assistant",
    content: `I've identified 3 potential security issues in this code:

1. **SQL Injection Vulnerability**: The userId parameter is directly concatenated into the query string without sanitization. An attacker could pass malicious input like "1; DROP TABLE users;" to execute arbitrary SQL.

2. **No Input Validation**: There's no validation of the userId parameter type or format.

3. **Overly Broad Query**: Using SELECT * exposes all columns including potentially sensitive data.

**Recommended fix:**
\`\`\`javascript
function getUserData(userId) {
  if (!Number.isInteger(userId)) {
    throw new Error('Invalid user ID');
  }
  const query = "SELECT id, name, email FROM users WHERE id = ?";
  return db.execute(query, [userId]);
}
\`\`\``,
  },
};

const defaultResponse = mockResponsesMap["1"];

export default function LogsPage() {
  const [selectedRequestId, setSelectedRequestId] = useState<string>("1");
  const [view, setView] = useState<"requests" | "traces">("requests");

  const currentLog = mockLogDetails[selectedRequestId] || defaultLogDetail;
  const currentMessages = mockMessagesMap[selectedRequestId] || defaultMessages;
  const currentResponse = mockResponsesMap[selectedRequestId] || defaultResponse;

  return (
    <div className="flex h-[calc(100vh-52px)]">
      {/* Left Sidebar - Requests List */}
      <RequestsSidebar
        requests={mockRequests}
        selectedId={selectedRequestId}
        onSelectRequest={setSelectedRequestId}
        view={view}
        onViewChange={setView}
        className="h-full"
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-auto bg-white">
        {/* Log Detail Header & Metrics */}
        <LogDetailView
          log={currentLog}
          onOpenInPlayground={() => console.log("Open in playground")}
          onAddToDataset={() => console.log("Add to dataset")}
        />

        {/* Prompt/Response Viewer */}
        <PromptResponseViewer
          messages={currentMessages}
          response={currentResponse}
        />
      </div>
    </div>
  );
}
