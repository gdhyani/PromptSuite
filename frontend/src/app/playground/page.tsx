"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Play,
  Copy,
  Check,
  Trash2,
  Plus,
  Loader2,
  Timer,
  Hash,
  Coins,
  Bot,
  User,
  CheckCircle2,
  XCircle,
  Settings2,
  Sparkles,
  FlaskConical,
  Maximize2,
  Minimize2,
  Gauge,
  ArrowLeft,
} from "lucide-react";

const models = [
  { value: "gpt-4o", label: "GPT-4o", provider: "OpenAI", inputCost: 0.0025, outputCost: 0.01 },
  { value: "gpt-4o-mini", label: "GPT-4o Mini", provider: "OpenAI", inputCost: 0.00015, outputCost: 0.0006 },
  { value: "gpt-4-turbo", label: "GPT-4 Turbo", provider: "OpenAI", inputCost: 0.01, outputCost: 0.03 },
  { value: "gpt-4", label: "GPT-4", provider: "OpenAI", inputCost: 0.03, outputCost: 0.06 },
  { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo", provider: "OpenAI", inputCost: 0.0005, outputCost: 0.0015 },
];

type MessageRole = "system" | "user" | "assistant";

interface Message {
  id: string;
  role: MessageRole;
  content: string;
}

export default function PlaygroundPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", role: "system", content: "You are a helpful assistant." },
    { id: "2", role: "user", content: "Hello! How can you help me today?" },
  ]);
  const [config, setConfig] = useState({
    model: "gpt-4o",
    temperature: 0.7,
    maxTokens: 1000,
    topP: 1,
  });
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [expandedPanel, setExpandedPanel] = useState<"editor" | "response" | null>(null);
  const [response, setResponse] = useState<null | {
    content: string;
    usage: { promptTokens: number; completionTokens: number; totalTokens: number };
    latencyMs: number;
    status: "success" | "error";
    model: string;
    finishReason: string;
  }>(null);

  const copyToClipboard = useCallback((text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  }, []);

  const handleRun = async () => {
    setIsRunning(true);
    setResponse(null);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setResponse({
      content: `Hello! I'm here to help you with a wide variety of tasks. I can:

1. **Answer questions** - From general knowledge to specific topics
2. **Help with writing** - Essays, emails, creative content, and more
3. **Explain concepts** - Break down complex ideas into simple terms
4. **Code assistance** - Debug, write, or explain code
5. **Brainstorm ideas** - Help you think through problems

What would you like to explore today?`,
      usage: { promptTokens: 42, completionTokens: 89, totalTokens: 131 },
      latencyMs: 1234,
      status: "success",
      model: config.model,
      finishReason: "stop",
    });
    setIsRunning(false);
  };

  const selectedModel = models.find(m => m.value === config.model);
  const estimatedCost = response ?
    ((response.usage.promptTokens / 1000) * (selectedModel?.inputCost || 0) +
     (response.usage.completionTokens / 1000) * (selectedModel?.outputCost || 0)).toFixed(6) :
    "0.000000";

  return (
    <div className="flex flex-col h-screen bg-slate-50 light">
      {/* Top Navigation Bar */}
      <div className="h-14 border-b border-slate-200 flex items-center justify-between px-4 bg-white">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <Separator orientation="vertical" className="h-6 bg-slate-200" />
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 shadow-md">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="font-display font-semibold text-sm text-slate-900">PromptSuite</span>
          </Link>
          <Separator orientation="vertical" className="h-6 bg-slate-200" />
          <div className="flex items-center gap-2">
            <FlaskConical className="h-4 w-4 text-slate-400" />
            <span className="text-sm font-medium text-slate-700">Playground</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Select value={config.model} onValueChange={(value) => setConfig({ ...config, model: value })}>
            <SelectTrigger className="h-9 w-44 bg-white border-slate-200 text-slate-700 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white border-slate-200">
              {models.map((model) => (
                <SelectItem key={model.value} value={model.value}>
                  {model.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            size="sm"
            className="h-9 gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20"
            onClick={handleRun}
            disabled={isRunning || messages.length === 0}
          >
            {isRunning ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Play className="h-3.5 w-3.5" />
            )}
            Run
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Editor */}
        <div className={`flex flex-col border-r border-slate-200 bg-white transition-all duration-300 ${
          expandedPanel === "response" ? "w-0 overflow-hidden" :
          expandedPanel === "editor" ? "flex-1" : "flex-1"
        }`}>
          {/* Editor Header */}
          <div className="h-11 border-b border-slate-200 flex items-center justify-between px-4 bg-slate-50/50">
            <span className="text-sm font-medium text-slate-700">Messages</span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs gap-1.5 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                onClick={() => setMessages([...messages, { id: Date.now().toString(), role: "user", content: "" }])}
              >
                <Plus className="h-3 w-3" />
                Add
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-slate-400 hover:text-slate-700"
                onClick={() => setExpandedPanel(expandedPanel === "editor" ? null : "editor")}
              >
                {expandedPanel === "editor" ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-auto p-4 space-y-4 bg-slate-50/30">
            {messages.map((message, index) => (
              <div key={message.id} className="group">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-md ${
                      message.role === "system" ? "bg-blue-50" :
                      message.role === "user" ? "bg-emerald-50" : "bg-violet-50"
                    }`}>
                      {message.role === "system" ? (
                        <Bot className="h-3.5 w-3.5 text-blue-600" />
                      ) : message.role === "user" ? (
                        <User className="h-3.5 w-3.5 text-emerald-600" />
                      ) : (
                        <Bot className="h-3.5 w-3.5 text-violet-600" />
                      )}
                    </div>
                    <Select
                      value={message.role}
                      onValueChange={(value) => {
                        const updated = [...messages];
                        updated[index].role = value as MessageRole;
                        setMessages(updated);
                      }}
                    >
                      <SelectTrigger className="w-28 h-7 text-xs bg-white border-slate-200 text-slate-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-slate-200">
                        <SelectItem value="system">System</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="assistant">Assistant</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-slate-400 hover:text-slate-700"
                      onClick={() => copyToClipboard(message.content, message.id)}
                    >
                      {copied === message.id ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                    </Button>
                    {messages.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-slate-400 hover:text-red-500"
                        onClick={() => setMessages(messages.filter((_, i) => i !== index))}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    )}
                  </div>
                </div>
                <Textarea
                  value={message.content}
                  onChange={(e) => {
                    const updated = [...messages];
                    updated[index].content = e.target.value;
                    setMessages(updated);
                  }}
                  className="min-h-[120px] font-mono text-sm bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 resize-none focus:border-blue-300 focus:ring-blue-200"
                  placeholder="Enter message content..."
                />
              </div>
            ))}
          </div>

          {/* Config Panel */}
          <div className="border-t border-slate-200 bg-white p-4">
            <div className="flex items-center gap-2 mb-3">
              <Settings2 className="h-3.5 w-3.5 text-slate-400" />
              <span className="text-xs font-medium text-slate-500">Parameters</span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <Label className="text-[10px] text-slate-500 uppercase">Temperature</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="2"
                    step="0.1"
                    value={config.temperature}
                    onChange={(e) => setConfig({ ...config, temperature: parseFloat(e.target.value) })}
                    className="flex-1 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                  <span className="text-xs text-slate-600 w-8">{config.temperature}</span>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] text-slate-500 uppercase">Max Tokens</Label>
                <Input
                  type="number"
                  value={config.maxTokens}
                  onChange={(e) => setConfig({ ...config, maxTokens: parseInt(e.target.value) })}
                  className="h-7 text-xs bg-white border-slate-200 text-slate-700"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] text-slate-500 uppercase">Top P</Label>
                <Input
                  type="number"
                  value={config.topP}
                  step="0.1"
                  min="0"
                  max="1"
                  onChange={(e) => setConfig({ ...config, topP: parseFloat(e.target.value) })}
                  className="h-7 text-xs bg-white border-slate-200 text-slate-700"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Response */}
        <div className={`flex flex-col bg-white transition-all duration-300 ${
          expandedPanel === "editor" ? "w-0 overflow-hidden" :
          expandedPanel === "response" ? "flex-1" : "w-[480px]"
        }`}>
          {/* Response Header */}
          <div className="h-11 border-b border-slate-200 flex items-center justify-between px-4 bg-slate-50/50">
            <div className="flex items-center gap-2">
              <FlaskConical className="h-4 w-4 text-slate-400" />
              <span className="text-sm font-medium text-slate-700">Output</span>
              {response && (
                <Badge
                  variant="outline"
                  className={`text-xs ${
                    response.status === "success"
                      ? "border-emerald-200 text-emerald-700 bg-emerald-50"
                      : "border-red-200 text-red-700 bg-red-50"
                  }`}
                >
                  {response.status === "success" ? (
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                  ) : (
                    <XCircle className="h-3 w-3 mr-1" />
                  )}
                  {response.status}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-1">
              {response && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-slate-400 hover:text-slate-700"
                  onClick={() => copyToClipboard(response.content, "response")}
                >
                  {copied === "response" ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-slate-400 hover:text-slate-700"
                onClick={() => setExpandedPanel(expandedPanel === "response" ? null : "response")}
              >
                {expandedPanel === "response" ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
              </Button>
            </div>
          </div>

          {/* Response Content */}
          <div className="flex-1 overflow-auto bg-slate-50/30">
            {!response && !isRunning && (
              <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center mb-4">
                  <Play className="h-5 w-5 text-slate-400" />
                </div>
                <h4 className="font-medium text-slate-600 mb-2">Ready to run</h4>
                <p className="text-sm text-slate-500 max-w-[240px]">
                  Configure your messages and click Run to execute.
                </p>
              </div>
            )}

            {isRunning && (
              <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center">
                    <Loader2 className="h-6 w-6 text-blue-600 animate-spin" />
                  </div>
                </div>
                <h4 className="font-medium text-slate-700 mt-4 mb-2">Running...</h4>
                <p className="text-sm text-slate-500">
                  Executing with {config.model}
                </p>
              </div>
            )}

            {response && (
              <div className="p-4 space-y-4">
                {/* Stats Row */}
                <div className="grid grid-cols-4 gap-2">
                  <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                      <Timer className="h-3 w-3" />
                      <span className="text-xs">Latency</span>
                    </div>
                    <p className="text-sm font-semibold text-slate-800">{(response.latencyMs / 1000).toFixed(2)}s</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                      <Hash className="h-3 w-3" />
                      <span className="text-xs">Tokens</span>
                    </div>
                    <p className="text-sm font-semibold text-slate-800">{response.usage.totalTokens}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                      <Coins className="h-3 w-3" />
                      <span className="text-xs">Cost</span>
                    </div>
                    <p className="text-sm font-semibold text-slate-800">${estimatedCost}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                      <Gauge className="h-3 w-3" />
                      <span className="text-xs">Finish</span>
                    </div>
                    <p className="text-sm font-semibold text-slate-800 capitalize">{response.finishReason}</p>
                  </div>
                </div>

                {/* Token Breakdown */}
                <div className="flex items-center gap-4 px-1 text-xs">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <span className="text-slate-500">Input: {response.usage.promptTokens}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-slate-500">Output: {response.usage.completionTokens}</span>
                  </div>
                </div>

                {/* Response Text */}
                <div className="rounded-xl bg-white border border-slate-200 shadow-sm p-4">
                  <div className="flex items-center gap-2 mb-3 pb-3 border-b border-slate-100">
                    <Bot className="h-4 w-4 text-violet-600" />
                    <span className="text-xs font-medium text-slate-600">Assistant</span>
                    <Badge variant="outline" className="text-xs border-slate-200 text-slate-500 ml-auto">
                      {response.model}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
                    {response.content}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
