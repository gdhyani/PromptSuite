"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import type { Route } from "next";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Save,
  Copy,
  Check,
  History,
  Loader2,
  CheckCircle2,
  XCircle,
  Clock,
  DollarSign,
  Zap,
  Bot,
  User,
  Plus,
  Trash2,
  Maximize2,
  Minimize2,
  ChevronRight,
  ChevronDown,
  Sparkles,
  GitBranch,
  Tag,
  RotateCcw,
  Eye,
  Code2,
  Settings2,
  ExternalLink,
  FileText,
  ArrowLeft,
  Wand2,
  FlaskConical,
  Gauge,
  Timer,
  Coins,
  Hash,
  MessageSquare,
} from "lucide-react";

// Mock prompt data
const prompt = {
  id: "p1",
  projectId: "1",
  projectName: "AI Chat Assistant",
  filePath: "src/services/chat.ts",
  lineNumber: 42,
  promptType: "system" as const,
  model: "gpt-4",
  originalContent: `You are a helpful customer support assistant for {{company_name}}.

Your role is to assist customers with their inquiries about products, orders, and general questions.

Context about the user:
{{user_context}}

Guidelines:
- Be friendly and professional
- Provide accurate information
- If unsure, offer to escalate to a human agent
- Keep responses concise but helpful`,
  config: {
    model: "gpt-4",
    temperature: 0.7,
    maxTokens: 1000,
    topP: 1,
    frequencyPenalty: 0,
    presencePenalty: 0,
    stream: false,
  },
  variables: [
    { name: "company_name", description: "The company name", defaultValue: "Acme Inc", type: "string" },
    { name: "user_context", description: "User's account info", defaultValue: "Premium customer since 2023", type: "text" },
  ],
  tags: ["production", "support", "gpt-4"],
  metadata: {
    createdAt: "2024-01-10T10:00:00Z",
    updatedAt: "2024-01-15T14:30:00Z",
    createdBy: "john@example.com",
    lastRunAt: "2024-01-15T14:30:00Z",
  },
};

// Version history
const versions = [
  { id: "v5", version: 5, createdAt: "2024-01-15T14:30:00Z", author: "john@example.com", changes: "Added user context variable", isCurrent: true },
  { id: "v4", version: 4, createdAt: "2024-01-14T11:00:00Z", author: "john@example.com", changes: "Updated guidelines section" },
  { id: "v3", version: 3, createdAt: "2024-01-12T09:15:00Z", author: "jane@example.com", changes: "Reduced temperature to 0.7" },
  { id: "v2", version: 2, createdAt: "2024-01-11T16:45:00Z", author: "john@example.com", changes: "Added company name variable" },
  { id: "v1", version: 1, createdAt: "2024-01-10T10:00:00Z", author: "john@example.com", changes: "Initial version" },
];

// Test run history
const testRuns = [
  { id: "r1", status: "success", latencyMs: 1847, tokens: 343, cost: 0.012, createdAt: "2024-01-15T14:30:00Z", rating: 5 },
  { id: "r2", status: "success", latencyMs: 2103, tokens: 412, cost: 0.015, createdAt: "2024-01-15T14:25:00Z", rating: 4 },
  { id: "r3", status: "error", latencyMs: 5000, tokens: 0, cost: 0, createdAt: "2024-01-15T14:20:00Z", rating: null },
  { id: "r4", status: "success", latencyMs: 1654, tokens: 298, cost: 0.011, createdAt: "2024-01-15T14:15:00Z", rating: 5 },
];

// Models available
const models = [
  { value: "gpt-4o", label: "GPT-4o", provider: "OpenAI", inputCost: 0.0025, outputCost: 0.01 },
  { value: "gpt-4o-mini", label: "GPT-4o Mini", provider: "OpenAI", inputCost: 0.00015, outputCost: 0.0006 },
  { value: "gpt-4-turbo", label: "GPT-4 Turbo", provider: "OpenAI", inputCost: 0.01, outputCost: 0.03 },
  { value: "gpt-4", label: "GPT-4", provider: "OpenAI", inputCost: 0.03, outputCost: 0.06 },
  { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo", provider: "OpenAI", inputCost: 0.0005, outputCost: 0.0015 },
  { value: "claude-3-opus", label: "Claude 3 Opus", provider: "Anthropic", inputCost: 0.015, outputCost: 0.075 },
  { value: "claude-3-sonnet", label: "Claude 3 Sonnet", provider: "Anthropic", inputCost: 0.003, outputCost: 0.015 },
];

type MessageRole = "system" | "user" | "assistant";

interface Message {
  id: string;
  role: MessageRole;
  content: string;
}

// Initial messages
const initialMessages: Message[] = [
  { id: "m1", role: "system", content: prompt.originalContent },
];

export default function PromptEditorPage({
  params,
}: {
  params: { id: string; promptId: string };
}) {
  const [messages, setMessages] = useState(initialMessages);
  const [variables, setVariables] = useState(
    prompt.variables.reduce((acc, v) => ({ ...acc, [v.name]: v.defaultValue }), {} as Record<string, string>)
  );
  const [config, setConfig] = useState(prompt.config);
  const [tags, setTags] = useState(prompt.tags);
  const [newTag, setNewTag] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [isImproving, setIsImproving] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [expandedPanel, setExpandedPanel] = useState<"editor" | "response" | null>(null);
  const [activeTab, setActiveTab] = useState("messages");
  const [sidebarTab, setSidebarTab] = useState("versions");
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
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setResponse({
      content: `Hello! Thank you for contacting Acme Inc customer support. I'm here to help you with any questions about our products, orders, or services.

I can see you've been a valued Premium customer since 2023 - thank you for your continued trust in us!

How may I assist you today? Whether you need help with:
- Product information
- Order status or tracking
- Returns or exchanges
- Account settings
- Any other questions

I'm here to help make your experience as smooth as possible.`,
      usage: { promptTokens: 245, completionTokens: 98, totalTokens: 343 },
      latencyMs: 1847,
      status: "success",
      model: config.model,
      finishReason: "stop",
    });
    setIsRunning(false);
  };

  const handleImprovePrompt = async () => {
    setIsImproving(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Simulate AI improvement
    const improvedContent = `You are an expert customer support specialist for {{company_name}}, dedicated to providing exceptional service.

## Your Role
Assist customers with inquiries about products, orders, returns, and general questions while maintaining a positive brand experience.

## Customer Context
{{user_context}}

## Communication Guidelines
1. **Tone**: Warm, professional, and empathetic
2. **Clarity**: Use clear, jargon-free language
3. **Efficiency**: Provide complete answers in the first response when possible
4. **Escalation**: If unable to resolve, offer to connect with a specialist

## Response Format
- Start with a personalized greeting
- Acknowledge the customer's concern
- Provide a clear solution or next steps
- End with an offer for additional assistance`;

    setMessages([{ ...messages[0], content: improvedContent }]);
    setIsImproving(false);
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const selectedModel = models.find(m => m.value === config.model);
  const estimatedCost = response ?
    ((response.usage.promptTokens / 1000) * (selectedModel?.inputCost || 0) +
     (response.usage.completionTokens / 1000) * (selectedModel?.outputCost || 0)).toFixed(6) :
    "0.000000";

  return (
    <div className="flex flex-col h-screen bg-[#0a0a0b]">
      {/* Top Navigation Bar */}
      <div className="h-14 border-b border-zinc-800/80 flex items-center justify-between px-4 bg-[#0f0f10]">
        <div className="flex items-center gap-3">
          <Link
            href={`/dashboard/projects/${params.id}` as Route}
            className="p-1.5 rounded-md hover:bg-zinc-800/50 transition-colors text-zinc-400 hover:text-zinc-200"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <Separator orientation="vertical" className="h-6 bg-zinc-800" />
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-sm text-zinc-400">
              <Link href="/dashboard" as={"/dashboard" as Route} className="hover:text-zinc-200 transition-colors">
                Dashboard
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link href={`/dashboard/projects/${params.id}` as Route} className="hover:text-zinc-200 transition-colors">
                {prompt.projectName}
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
            </div>
            <code className="text-sm font-mono text-zinc-200">{prompt.filePath}:{prompt.lineNumber}</code>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/30 font-mono text-xs">
            v{versions[0].version}
          </Badge>
          <Separator orientation="vertical" className="h-6 bg-zinc-800" />
          <Button
            variant="ghost"
            size="sm"
            className="h-8 gap-2 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
            onClick={() => handleImprovePrompt()}
            disabled={isImproving}
          >
            {isImproving ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Wand2 className="h-3.5 w-3.5" />
            )}
            Improve with AI
          </Button>
          <Button variant="ghost" size="sm" className="h-8 gap-2 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50">
            <Save className="h-3.5 w-3.5" />
            Save
          </Button>
          <Button
            size="sm"
            className="h-8 gap-2 bg-emerald-600 hover:bg-emerald-700 text-white"
            onClick={handleRun}
            disabled={isRunning}
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
        <div className={`flex flex-col border-r border-zinc-800/80 transition-all duration-300 ${
          expandedPanel === "response" ? "w-0 overflow-hidden" :
          expandedPanel === "editor" ? "flex-1" : "flex-1"
        }`}>
          {/* Editor Tabs */}
          <div className="h-11 border-b border-zinc-800/80 flex items-center justify-between px-4 bg-[#0f0f10]">
            <div className="flex items-center gap-1">
              {[
                { id: "messages", label: "Messages", icon: MessageSquare },
                { id: "variables", label: "Variables", icon: Code2 },
                { id: "parameters", label: "Parameters", icon: Settings2 },
                { id: "metadata", label: "Metadata", icon: FileText },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`h-8 px-3 rounded-md flex items-center gap-2 text-sm transition-colors ${
                    activeTab === tab.id
                      ? "bg-zinc-800 text-zinc-100"
                      : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50"
                  }`}
                >
                  <tab.icon className="h-3.5 w-3.5" />
                  {tab.label}
                </button>
              ))}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-zinc-500 hover:text-zinc-300"
              onClick={() => setExpandedPanel(expandedPanel === "editor" ? null : "editor")}
            >
              {expandedPanel === "editor" ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
            </Button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-auto p-4 bg-[#0a0a0b]">
            {activeTab === "messages" && (
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div key={message.id} className="group">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`p-1.5 rounded-md ${
                          message.role === "system" ? "bg-blue-500/10" :
                          message.role === "user" ? "bg-emerald-500/10" : "bg-violet-500/10"
                        }`}>
                          {message.role === "system" ? (
                            <Bot className="h-3.5 w-3.5 text-blue-400" />
                          ) : message.role === "user" ? (
                            <User className="h-3.5 w-3.5 text-emerald-400" />
                          ) : (
                            <Bot className="h-3.5 w-3.5 text-violet-400" />
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
                          <SelectTrigger className="w-28 h-7 text-xs bg-transparent border-zinc-700/50 text-zinc-300">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-zinc-900 border-zinc-700">
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
                          className="h-7 w-7 text-zinc-500 hover:text-zinc-300"
                          onClick={() => copyToClipboard(message.content, message.id)}
                        >
                          {copied === message.id ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                        </Button>
                        {messages.length > 1 && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-zinc-500 hover:text-rose-400"
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
                      className="min-h-[280px] font-mono text-sm bg-zinc-900/50 border-zinc-800 text-zinc-200 placeholder:text-zinc-600 resize-none focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700"
                      placeholder="Enter message content..."
                    />
                  </div>
                ))}

                <Button
                  variant="outline"
                  className="w-full h-10 border-dashed border-zinc-700/50 bg-transparent text-zinc-500 hover:text-zinc-300 hover:border-zinc-600 hover:bg-zinc-800/30"
                  onClick={() => setMessages([...messages, { id: `m${Date.now()}`, role: "user" as MessageRole, content: "" }])}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Message
                </Button>
              </div>
            )}

            {activeTab === "variables" && (
              <div className="space-y-4">
                <div className="text-sm text-zinc-500 mb-4">
                  Variables detected in your prompt are shown below. Use <code className="text-zinc-400 bg-zinc-800 px-1 py-0.5 rounded">{"{{variable_name}}"}</code> syntax.
                </div>
                {prompt.variables.map((variable) => (
                  <div key={variable.name} className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <code className="text-sm font-mono text-emerald-400">{`{{${variable.name}}}`}</code>
                        <Badge variant="outline" className="text-xs border-zinc-700 text-zinc-500">{variable.type}</Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-zinc-500 hover:text-zinc-300"
                        onClick={() => setVariables({ ...variables, [variable.name]: variable.defaultValue })}
                      >
                        <RotateCcw className="h-3 w-3" />
                      </Button>
                    </div>
                    <p className="text-xs text-zinc-500 mb-3">{variable.description}</p>
                    {variable.type === "text" ? (
                      <Textarea
                        value={variables[variable.name] || ""}
                        onChange={(e) => setVariables({ ...variables, [variable.name]: e.target.value })}
                        placeholder={`Enter ${variable.name}...`}
                        className="min-h-[80px] font-mono text-sm bg-zinc-950 border-zinc-800 text-zinc-200 resize-none"
                      />
                    ) : (
                      <Input
                        value={variables[variable.name] || ""}
                        onChange={(e) => setVariables({ ...variables, [variable.name]: e.target.value })}
                        placeholder={`Enter ${variable.name}...`}
                        className="font-mono text-sm bg-zinc-950 border-zinc-800 text-zinc-200"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeTab === "parameters" && (
              <div className="space-y-6">
                {/* Model Selection */}
                <div className="space-y-2">
                  <Label className="text-sm text-zinc-400">Model</Label>
                  <Select value={config.model} onValueChange={(value) => setConfig({ ...config, model: value })}>
                    <SelectTrigger className="bg-zinc-900/50 border-zinc-800 text-zinc-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-zinc-700">
                      {models.map((model) => (
                        <SelectItem key={model.value} value={model.value}>
                          <div className="flex items-center justify-between w-full gap-4">
                            <span>{model.label}</span>
                            <span className="text-xs text-zinc-500">{model.provider}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedModel && (
                    <p className="text-xs text-zinc-600">
                      Pricing: ${selectedModel.inputCost}/1K input, ${selectedModel.outputCost}/1K output
                    </p>
                  )}
                </div>

                {/* Temperature */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm text-zinc-400">Temperature</Label>
                    <Input
                      type="number"
                      value={config.temperature}
                      onChange={(e) => setConfig({ ...config, temperature: parseFloat(e.target.value) })}
                      className="w-20 h-7 text-sm bg-zinc-900/50 border-zinc-800 text-zinc-200 text-center"
                      step="0.1"
                      min="0"
                      max="2"
                    />
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="2"
                    step="0.1"
                    value={config.temperature}
                    onChange={(e) => setConfig({ ...config, temperature: parseFloat(e.target.value) })}
                    className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                  <div className="flex justify-between text-xs text-zinc-600">
                    <span>Precise</span>
                    <span>Creative</span>
                  </div>
                </div>

                {/* Max Tokens */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm text-zinc-400">Max Tokens</Label>
                    <Input
                      type="number"
                      value={config.maxTokens}
                      onChange={(e) => setConfig({ ...config, maxTokens: parseInt(e.target.value) })}
                      className="w-24 h-7 text-sm bg-zinc-900/50 border-zinc-800 text-zinc-200 text-center"
                    />
                  </div>
                </div>

                {/* Top P */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm text-zinc-400">Top P</Label>
                    <Input
                      type="number"
                      value={config.topP}
                      onChange={(e) => setConfig({ ...config, topP: parseFloat(e.target.value) })}
                      className="w-20 h-7 text-sm bg-zinc-900/50 border-zinc-800 text-zinc-200 text-center"
                      step="0.1"
                      min="0"
                      max="1"
                    />
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={config.topP}
                    onChange={(e) => setConfig({ ...config, topP: parseFloat(e.target.value) })}
                    className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>

                <Separator className="bg-zinc-800" />

                {/* Frequency Penalty */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm text-zinc-400">Frequency Penalty</Label>
                    <Input
                      type="number"
                      value={config.frequencyPenalty}
                      onChange={(e) => setConfig({ ...config, frequencyPenalty: parseFloat(e.target.value) })}
                      className="w-20 h-7 text-sm bg-zinc-900/50 border-zinc-800 text-zinc-200 text-center"
                      step="0.1"
                      min="-2"
                      max="2"
                    />
                  </div>
                </div>

                {/* Presence Penalty */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm text-zinc-400">Presence Penalty</Label>
                    <Input
                      type="number"
                      value={config.presencePenalty}
                      onChange={(e) => setConfig({ ...config, presencePenalty: parseFloat(e.target.value) })}
                      className="w-20 h-7 text-sm bg-zinc-900/50 border-zinc-800 text-zinc-200 text-center"
                      step="0.1"
                      min="-2"
                      max="2"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "metadata" && (
              <div className="space-y-6">
                {/* Tags */}
                <div className="space-y-3">
                  <Label className="text-sm text-zinc-400">Tags</Label>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-zinc-800 text-zinc-300 hover:bg-zinc-700 cursor-pointer group"
                        onClick={() => removeTag(tag)}
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                        <XCircle className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Badge>
                    ))}
                    <div className="flex items-center gap-1">
                      <Input
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addTag()}
                        placeholder="Add tag..."
                        className="h-6 w-24 text-xs bg-transparent border-zinc-700 text-zinc-300"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-zinc-500 hover:text-zinc-300"
                        onClick={addTag}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator className="bg-zinc-800" />

                {/* Metadata Info */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-zinc-500">Created</span>
                    <span className="text-sm text-zinc-300">{new Date(prompt.metadata.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-zinc-500">Last Updated</span>
                    <span className="text-sm text-zinc-300">{new Date(prompt.metadata.updatedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-zinc-500">Created By</span>
                    <span className="text-sm text-zinc-300">{prompt.metadata.createdBy}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-zinc-500">Last Run</span>
                    <span className="text-sm text-zinc-300">{new Date(prompt.metadata.lastRunAt).toLocaleString()}</span>
                  </div>
                </div>

                <Separator className="bg-zinc-800" />

                {/* Source */}
                <div className="space-y-3">
                  <Label className="text-sm text-zinc-400">Source</Label>
                  <div className="p-3 rounded-lg bg-zinc-900/50 border border-zinc-800">
                    <div className="flex items-center gap-2 text-sm">
                      <FileText className="h-4 w-4 text-zinc-500" />
                      <code className="text-zinc-300 font-mono">{prompt.filePath}:{prompt.lineNumber}</code>
                    </div>
                    <a
                      href={`https://github.com/acme/chat-assistant/blob/main/${prompt.filePath}#L${prompt.lineNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-300 mt-2"
                    >
                      View in GitHub
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Response */}
        <div className={`flex flex-col bg-[#0f0f10] transition-all duration-300 ${
          expandedPanel === "editor" ? "w-0 overflow-hidden" :
          expandedPanel === "response" ? "flex-1" : "w-[480px]"
        }`}>
          {/* Response Header */}
          <div className="h-11 border-b border-zinc-800/80 flex items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <FlaskConical className="h-4 w-4 text-zinc-500" />
              <span className="text-sm font-medium text-zinc-300">Output</span>
              {response && (
                <Badge
                  variant="outline"
                  className={`text-xs ${
                    response.status === "success"
                      ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/10"
                      : "border-rose-500/30 text-rose-400 bg-rose-500/10"
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
                  className="h-7 w-7 text-zinc-500 hover:text-zinc-300"
                  onClick={() => copyToClipboard(response.content, "response")}
                >
                  {copied === "response" ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-zinc-500 hover:text-zinc-300"
                onClick={() => setExpandedPanel(expandedPanel === "response" ? null : "response")}
              >
                {expandedPanel === "response" ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
              </Button>
            </div>
          </div>

          {/* Response Content */}
          <div className="flex-1 overflow-auto">
            {!response && !isRunning && (
              <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <div className="w-14 h-14 rounded-xl bg-zinc-800/50 flex items-center justify-center mb-4">
                  <Play className="h-5 w-5 text-zinc-600" />
                </div>
                <h4 className="font-medium text-zinc-400 mb-2">No output yet</h4>
                <p className="text-sm text-zinc-600 max-w-[240px]">
                  Click Run to execute the prompt and see the response here.
                </p>
              </div>
            )}

            {isRunning && (
              <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <Loader2 className="h-6 w-6 text-emerald-400 animate-spin" />
                  </div>
                </div>
                <h4 className="font-medium text-zinc-300 mt-4 mb-2">Running...</h4>
                <p className="text-sm text-zinc-500">
                  Executing with {config.model}
                </p>
              </div>
            )}

            {response && (
              <div className="p-4 space-y-4">
                {/* Stats Row */}
                <div className="grid grid-cols-4 gap-2">
                  <div className="p-3 rounded-lg bg-zinc-900/50 border border-zinc-800/50">
                    <div className="flex items-center gap-1.5 text-zinc-500 mb-1">
                      <Timer className="h-3 w-3" />
                      <span className="text-xs">Latency</span>
                    </div>
                    <p className="text-sm font-semibold text-zinc-200">{(response.latencyMs / 1000).toFixed(2)}s</p>
                  </div>
                  <div className="p-3 rounded-lg bg-zinc-900/50 border border-zinc-800/50">
                    <div className="flex items-center gap-1.5 text-zinc-500 mb-1">
                      <Hash className="h-3 w-3" />
                      <span className="text-xs">Tokens</span>
                    </div>
                    <p className="text-sm font-semibold text-zinc-200">{response.usage.totalTokens}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-zinc-900/50 border border-zinc-800/50">
                    <div className="flex items-center gap-1.5 text-zinc-500 mb-1">
                      <Coins className="h-3 w-3" />
                      <span className="text-xs">Cost</span>
                    </div>
                    <p className="text-sm font-semibold text-zinc-200">${estimatedCost}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-zinc-900/50 border border-zinc-800/50">
                    <div className="flex items-center gap-1.5 text-zinc-500 mb-1">
                      <Gauge className="h-3 w-3" />
                      <span className="text-xs">Finish</span>
                    </div>
                    <p className="text-sm font-semibold text-zinc-200 capitalize">{response.finishReason}</p>
                  </div>
                </div>

                {/* Token Breakdown */}
                <div className="flex items-center gap-4 px-1 text-xs">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-blue-400" />
                    <span className="text-zinc-500">Input: {response.usage.promptTokens}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-zinc-500">Output: {response.usage.completionTokens}</span>
                  </div>
                </div>

                {/* Response Text */}
                <div className="rounded-lg bg-zinc-900/50 border border-zinc-800/50 p-4">
                  <div className="flex items-center gap-2 mb-3 pb-3 border-b border-zinc-800/50">
                    <Bot className="h-4 w-4 text-violet-400" />
                    <span className="text-xs font-medium text-zinc-400">Assistant</span>
                    <Badge variant="outline" className="text-xs border-zinc-700 text-zinc-500 ml-auto">
                      {response.model}
                    </Badge>
                  </div>
                  <p className="text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed">
                    {response.content}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar - Versions & History */}
        <div className="w-64 border-l border-zinc-800/80 bg-[#0a0a0b] flex flex-col">
          <div className="h-11 border-b border-zinc-800/80 flex items-center gap-1 px-2">
            <button
              onClick={() => setSidebarTab("versions")}
              className={`flex-1 h-7 px-2 rounded-md flex items-center justify-center gap-1.5 text-xs transition-colors ${
                sidebarTab === "versions"
                  ? "bg-zinc-800 text-zinc-200"
                  : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50"
              }`}
            >
              <GitBranch className="h-3 w-3" />
              Versions
            </button>
            <button
              onClick={() => setSidebarTab("history")}
              className={`flex-1 h-7 px-2 rounded-md flex items-center justify-center gap-1.5 text-xs transition-colors ${
                sidebarTab === "history"
                  ? "bg-zinc-800 text-zinc-200"
                  : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50"
              }`}
            >
              <History className="h-3 w-3" />
              History
            </button>
          </div>

          <div className="flex-1 overflow-auto p-2">
            {sidebarTab === "versions" && (
              <div className="space-y-1">
                {versions.map((version) => (
                  <button
                    key={version.id}
                    className={`w-full p-2.5 rounded-lg text-left transition-colors ${
                      version.isCurrent
                        ? "bg-emerald-500/10 border border-emerald-500/30"
                        : "hover:bg-zinc-800/50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-xs font-medium ${version.isCurrent ? "text-emerald-400" : "text-zinc-300"}`}>
                        Version {version.version}
                      </span>
                      {version.isCurrent && (
                        <Badge className="h-4 text-[10px] bg-emerald-500/20 text-emerald-400 border-0">
                          Current
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-zinc-500 line-clamp-1">{version.changes}</p>
                    <p className="text-[10px] text-zinc-600 mt-1">
                      {new Date(version.createdAt).toLocaleDateString()} by {version.author.split("@")[0]}
                    </p>
                  </button>
                ))}
              </div>
            )}

            {sidebarTab === "history" && (
              <div className="space-y-1">
                {testRuns.map((run) => (
                  <button
                    key={run.id}
                    className="w-full p-2.5 rounded-lg text-left hover:bg-zinc-800/50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        {run.status === "success" ? (
                          <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                        ) : (
                          <XCircle className="h-3 w-3 text-rose-400" />
                        )}
                        <span className="text-xs text-zinc-300">{(run.latencyMs / 1000).toFixed(2)}s</span>
                      </div>
                      <span className="text-xs text-zinc-500">{run.tokens} tokens</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-zinc-600">
                        {new Date(run.createdAt).toLocaleTimeString()}
                      </span>
                      {run.rating && (
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-1 h-1 rounded-full ${
                                i < run.rating! ? "bg-amber-400" : "bg-zinc-700"
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
