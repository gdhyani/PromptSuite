"use client";

import { useState } from "react";
import Link from "next/link";
import type { Route } from "next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronRight,
  Search,
  FileCode2,
  Bot,
  User,
  Wrench,
  FileJson,
  MessageSquare,
  Zap,
  Timer,
  DollarSign,
  Filter,
  LayoutGrid,
  List,
  Star,
  StarOff,
  Copy,
  Play,
  MoreHorizontal,
  ArrowUpDown,
  FolderKanban,
  GitBranch,
  ExternalLink,
  Check,
  Sparkles,
  TrendingUp,
} from "lucide-react";

// All prompts across all projects
const allPrompts = [
  {
    id: "p1",
    name: "Customer Support Agent",
    projectId: "1",
    projectName: "AI Chat Assistant",
    filePath: "src/services/chat.ts",
    lineNumber: 42,
    promptType: "system" as const,
    model: "gpt-4o",
    preview: "You are a helpful customer support assistant for Acme Inc. You are friendly, professional, and always try to help customers...",
    variables: ["company_name", "user_context", "history"],
    config: { temperature: 0.7, maxTokens: 1000 },
    runs: 12847,
    avgLatency: 1.23,
    totalCost: 234.56,
    starred: true,
    lastUsed: "2024-01-15T10:30:00Z",
    versions: 5,
  },
  {
    id: "p2",
    name: "Code Review Assistant",
    projectId: "2",
    projectName: "Code Review Bot",
    filePath: "src/review/analyzer.ts",
    lineNumber: 78,
    promptType: "system" as const,
    model: "gpt-4-turbo",
    preview: "You are an expert code reviewer. Analyze the following code for bugs, security issues, performance problems...",
    variables: ["code", "language", "context"],
    config: { temperature: 0.2, maxTokens: 2000 },
    runs: 5672,
    avgLatency: 2.1,
    totalCost: 189.34,
    starred: true,
    lastUsed: "2024-01-15T09:15:00Z",
    versions: 3,
  },
  {
    id: "p3",
    name: "Text Summarizer",
    projectId: "1",
    projectName: "AI Chat Assistant",
    filePath: "src/services/summarize.ts",
    lineNumber: 23,
    promptType: "system" as const,
    model: "gpt-3.5-turbo",
    preview: "You are a text summarization expert. Provide concise summaries that capture key points while maintaining accuracy...",
    variables: ["text", "max_length"],
    config: { temperature: 0.3, maxTokens: 500 },
    runs: 8934,
    avgLatency: 0.8,
    totalCost: 45.67,
    starred: false,
    lastUsed: "2024-01-15T08:00:00Z",
    versions: 2,
  },
  {
    id: "p4",
    name: "SQL Query Generator",
    projectId: "4",
    projectName: "Data Analyzer",
    filePath: "src/query/builder.ts",
    lineNumber: 56,
    promptType: "system" as const,
    model: "gpt-4o",
    preview: "You are a SQL expert. Convert the following natural language query into optimized SQL. Consider the schema...",
    variables: ["query", "schema", "database_type"],
    config: { temperature: 0.1, maxTokens: 800 },
    runs: 8901,
    avgLatency: 0.9,
    totalCost: 78.90,
    starred: true,
    lastUsed: "2024-01-14T16:30:00Z",
    versions: 4,
  },
  {
    id: "p5",
    name: "Weather Tool",
    projectId: "1",
    projectName: "AI Chat Assistant",
    filePath: "src/tools/weather.ts",
    lineNumber: 15,
    promptType: "tool" as const,
    model: "gpt-4o",
    preview: "function: get_weather, parameters: { location: string, unit: 'celsius' | 'fahrenheit' }",
    variables: [],
    config: { temperature: 0, maxTokens: 100 },
    runs: 3421,
    avgLatency: 0.4,
    totalCost: 12.34,
    starred: false,
    lastUsed: "2024-01-15T10:00:00Z",
    versions: 1,
  },
  {
    id: "p6",
    name: "Email Response",
    projectId: "5",
    projectName: "Email Assistant",
    filePath: "src/email/responder.ts",
    lineNumber: 34,
    promptType: "user" as const,
    model: "gpt-4o",
    preview: "Draft a professional response to the following email. Maintain the same tone and address all points raised...",
    variables: ["email_content", "sender_name", "context"],
    config: { temperature: 0.6, maxTokens: 1000 },
    runs: 4567,
    avgLatency: 1.5,
    totalCost: 156.78,
    starred: false,
    lastUsed: "2024-01-15T07:00:00Z",
    versions: 6,
  },
  {
    id: "p7",
    name: "Structured Output Parser",
    projectId: "3",
    projectName: "Content Generator",
    filePath: "src/services/structured.ts",
    lineNumber: 89,
    promptType: "structured_output" as const,
    model: "gpt-4-turbo",
    preview: "response_format: { type: 'json_schema', schema: { title: string, summary: string, tags: string[] } }",
    variables: ["input_data"],
    config: { temperature: 0.2, maxTokens: 800 },
    runs: 23456,
    avgLatency: 1.8,
    totalCost: 345.67,
    starred: true,
    lastUsed: "2024-01-14T16:00:00Z",
    versions: 8,
  },
  {
    id: "p8",
    name: "Translation Service",
    projectId: "6",
    projectName: "Translation Service",
    filePath: "src/translate/engine.ts",
    lineNumber: 12,
    promptType: "system" as const,
    model: "gpt-4o",
    preview: "You are an expert translator. Translate the following text while preserving context, idioms, and cultural nuances...",
    variables: ["text", "source_lang", "target_lang"],
    config: { temperature: 0.3, maxTokens: 2000 },
    runs: 2345,
    avgLatency: 1.1,
    totalCost: 67.89,
    starred: false,
    lastUsed: "2024-01-10T09:30:00Z",
    versions: 2,
  },
];

const promptTypeConfig: Record<string, { icon: React.ElementType; color: string; bgColor: string; label: string }> = {
  system: { icon: Bot, color: "text-blue-500", bgColor: "bg-blue-50", label: "System" },
  user: { icon: User, color: "text-emerald-500", bgColor: "bg-emerald-50", label: "User" },
  assistant: { icon: MessageSquare, color: "text-violet-500", bgColor: "bg-violet-50", label: "Assistant" },
  tool: { icon: Wrench, color: "text-amber-500", bgColor: "bg-amber-50", label: "Tool" },
  structured_output: { icon: FileJson, color: "text-rose-500", bgColor: "bg-rose-50", label: "Structured" },
};

function formatTime(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString();
}

export default function PromptsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [projectFilter, setProjectFilter] = useState("all");
  const [modelFilter, setModelFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const projects = Array.from(new Set(allPrompts.map(p => p.projectName)));
  const models = Array.from(new Set(allPrompts.map(p => p.model)));

  const filteredPrompts = allPrompts.filter((prompt) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (!prompt.name.toLowerCase().includes(query) &&
          !prompt.preview.toLowerCase().includes(query) &&
          !prompt.filePath.toLowerCase().includes(query)) {
        return false;
      }
    }
    if (typeFilter !== "all" && prompt.promptType !== typeFilter) {
      return false;
    }
    if (projectFilter !== "all" && prompt.projectName !== projectFilter) {
      return false;
    }
    if (modelFilter !== "all" && prompt.model !== modelFilter) {
      return false;
    }
    return true;
  });

  const totalRuns = allPrompts.reduce((a, b) => a + b.runs, 0);
  const totalCost = allPrompts.reduce((a, b) => a + b.totalCost, 0);
  const avgLatency = allPrompts.reduce((a, b) => a + b.avgLatency, 0) / allPrompts.length;

  const handleCopy = (id: string) => {
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Header */}
      <div className="h-14 border-b border-slate-200 flex items-center justify-between px-6 bg-white">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-sm text-slate-500">
            <Link href="/dashboard" as={"/dashboard" as Route} className="hover:text-slate-900 transition-colors">
              Dashboard
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
          </div>
          <h1 className="text-sm font-medium text-slate-900">All Prompts</h1>
          <Badge variant="secondary" className="text-[10px] bg-slate-100 text-slate-500 border-0">
            {allPrompts.length} prompts
          </Badge>
        </div>

        <Link href={"/playground" as Route}>
          <Button size="sm" className="h-8 gap-2 bg-slate-900 text-white hover:bg-slate-800">
            <Play className="h-3.5 w-3.5" />
            Test in Playground
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="border-b border-slate-200 bg-white">
        <div className="px-6 py-4">
          <div className="grid grid-cols-5 gap-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-violet-50">
                <FileCode2 className="h-4 w-4 text-violet-500" />
              </div>
              <div>
                <p className="text-lg font-semibold text-slate-900">{allPrompts.length}</p>
                <p className="text-xs text-slate-500">Total Prompts</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-50">
                <Zap className="h-4 w-4 text-amber-500" />
              </div>
              <div>
                <p className="text-lg font-semibold text-slate-900">{totalRuns.toLocaleString()}</p>
                <p className="text-xs text-slate-500">Total Runs</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-50">
                <Timer className="h-4 w-4 text-blue-500" />
              </div>
              <div>
                <p className="text-lg font-semibold text-slate-900">{avgLatency.toFixed(2)}s</p>
                <p className="text-xs text-slate-500">Avg Latency</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-50">
                <DollarSign className="h-4 w-4 text-emerald-500" />
              </div>
              <div>
                <p className="text-lg font-semibold text-slate-900">${totalCost.toFixed(2)}</p>
                <p className="text-xs text-slate-500">Total Cost</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-rose-50">
                <Star className="h-4 w-4 text-rose-500" />
              </div>
              <div>
                <p className="text-lg font-semibold text-slate-900">{allPrompts.filter(p => p.starred).length}</p>
                <p className="text-xs text-slate-500">Starred</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        {/* Filters */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 min-w-[300px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search prompts by name, content, or file path..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 bg-white border-slate-200 text-slate-800 placeholder:text-slate-400"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="h-9 w-36 bg-white border-slate-200 text-slate-700 text-xs">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent className="bg-white border-slate-200">
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="system">System</SelectItem>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="tool">Tool</SelectItem>
                <SelectItem value="structured_output">Structured</SelectItem>
              </SelectContent>
            </Select>
            <Select value={projectFilter} onValueChange={setProjectFilter}>
              <SelectTrigger className="h-9 w-44 bg-white border-slate-200 text-slate-700 text-xs">
                <SelectValue placeholder="Project" />
              </SelectTrigger>
              <SelectContent className="bg-white border-slate-200">
                <SelectItem value="all">All Projects</SelectItem>
                {projects.map(project => (
                  <SelectItem key={project} value={project}>{project}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={modelFilter} onValueChange={setModelFilter}>
              <SelectTrigger className="h-9 w-36 bg-white border-slate-200 text-slate-700 text-xs">
                <SelectValue placeholder="Model" />
              </SelectTrigger>
              <SelectContent className="bg-white border-slate-200">
                <SelectItem value="all">All Models</SelectItem>
                {models.map(model => (
                  <SelectItem key={model} value={model}>{model}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-1 p-1 rounded-md bg-white border border-slate-200">
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded transition-colors ${viewMode === "list" ? "bg-slate-100 text-slate-800" : "text-slate-400 hover:text-slate-600"}`}
            >
              <List className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded transition-colors ${viewMode === "grid" ? "bg-slate-100 text-slate-800" : "text-slate-400 hover:text-slate-600"}`}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Prompts List View */}
        {viewMode === "list" && (
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-[1fr_140px_120px_100px_90px_90px_80px_60px] gap-4 px-4 py-3 border-b border-slate-100 bg-slate-50">
              <div className="text-xs font-medium text-slate-500 uppercase tracking-wide flex items-center gap-1">
                Prompt
                <ArrowUpDown className="h-3 w-3" />
              </div>
              <div className="text-xs font-medium text-slate-500 uppercase tracking-wide">Project</div>
              <div className="text-xs font-medium text-slate-500 uppercase tracking-wide">Type</div>
              <div className="text-xs font-medium text-slate-500 uppercase tracking-wide">Model</div>
              <div className="text-xs font-medium text-slate-500 uppercase tracking-wide text-right">Runs</div>
              <div className="text-xs font-medium text-slate-500 uppercase tracking-wide text-right">Cost</div>
              <div className="text-xs font-medium text-slate-500 uppercase tracking-wide">Used</div>
              <div></div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-slate-100">
              {filteredPrompts.map((prompt) => {
                const typeConfig = promptTypeConfig[prompt.promptType];
                return (
                  <Link
                    key={prompt.id}
                    href={`/dashboard/projects/${prompt.projectId}/prompts/${prompt.id}` as Route}
                    className="grid grid-cols-[1fr_140px_120px_100px_90px_90px_80px_60px] gap-4 px-4 py-3 hover:bg-slate-50 transition-colors group"
                  >
                    {/* Prompt Info */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        {prompt.starred && <Star className="h-3 w-3 text-amber-400 fill-amber-400" />}
                        <p className="text-sm font-medium text-slate-800 truncate group-hover:text-slate-900">
                          {prompt.name}
                        </p>
                        {prompt.versions > 1 && (
                          <Badge variant="secondary" className="text-[9px] bg-slate-100 text-slate-500 border-0">
                            v{prompt.versions}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <code className="text-[10px] text-slate-400 font-mono truncate">
                          {prompt.filePath}:{prompt.lineNumber}
                        </code>
                      </div>
                    </div>

                    {/* Project */}
                    <div className="flex items-center">
                      <span className="text-xs text-slate-500 truncate">{prompt.projectName}</span>
                    </div>

                    {/* Type */}
                    <div className="flex items-center gap-2">
                      <div className={`p-1 rounded ${typeConfig.bgColor}`}>
                        <typeConfig.icon className={`h-3 w-3 ${typeConfig.color}`} />
                      </div>
                      <span className={`text-xs ${typeConfig.color}`}>{typeConfig.label}</span>
                    </div>

                    {/* Model */}
                    <div className="flex items-center">
                      <Badge variant="secondary" className="text-[10px] font-mono bg-slate-100 text-slate-500 border-0">
                        {prompt.model}
                      </Badge>
                    </div>

                    {/* Runs */}
                    <div className="flex items-center justify-end">
                      <span className="text-xs font-mono text-slate-500">{prompt.runs.toLocaleString()}</span>
                    </div>

                    {/* Cost */}
                    <div className="flex items-center justify-end">
                      <span className="text-xs font-mono text-slate-700">${prompt.totalCost.toFixed(2)}</span>
                    </div>

                    {/* Last Used */}
                    <div className="flex items-center">
                      <span className="text-[10px] text-slate-400">{formatTime(prompt.lastUsed)}</span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-slate-400 hover:text-slate-600"
                        onClick={(e) => {
                          e.preventDefault();
                          handleCopy(prompt.id);
                        }}
                      >
                        {copiedId === prompt.id ? (
                          <Check className="h-3 w-3 text-emerald-500" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Prompts Grid View */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredPrompts.map((prompt) => {
              const typeConfig = promptTypeConfig[prompt.promptType];
              return (
                <Link
                  key={prompt.id}
                  href={`/dashboard/projects/${prompt.projectId}/prompts/${prompt.id}` as Route}
                  className="group"
                >
                  <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm hover:border-slate-300 hover:shadow-md transition-all">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className={`p-2 rounded-lg ${typeConfig.bgColor}`}>
                          <typeConfig.icon className={`h-4 w-4 ${typeConfig.color}`} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            {prompt.starred && <Star className="h-3 w-3 text-amber-400 fill-amber-400" />}
                            <h3 className="text-sm font-medium text-slate-800 group-hover:text-slate-900">
                              {prompt.name}
                            </h3>
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <Badge variant="secondary" className="text-[10px] font-mono bg-slate-100 text-slate-500 border-0">
                              {prompt.model}
                            </Badge>
                            <span className="text-[10px] text-slate-400">{prompt.projectName}</span>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-slate-600"
                        onClick={(e) => e.preventDefault()}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Preview */}
                    <p className="text-xs text-slate-500 font-mono line-clamp-2 mb-3">
                      {prompt.preview}
                    </p>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      <Badge
                        variant="outline"
                        className={`text-[10px] ${typeConfig.color} border-current/20 px-1.5 py-0`}
                      >
                        {typeConfig.label}
                      </Badge>
                      {prompt.variables.length > 0 && (
                        <Badge
                          variant="outline"
                          className="text-[10px] border-emerald-200 text-emerald-600 px-1.5 py-0"
                        >
                          {prompt.variables.length} vars
                        </Badge>
                      )}
                      {prompt.versions > 1 && (
                        <Badge
                          variant="outline"
                          className="text-[10px] border-slate-200 text-slate-500 px-1.5 py-0"
                        >
                          v{prompt.versions}
                        </Badge>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                      <div className="flex items-center gap-4 text-[10px] text-slate-400">
                        <div className="flex items-center gap-1">
                          <Zap className="h-3 w-3" />
                          <span>{prompt.runs.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Timer className="h-3 w-3" />
                          <span>{prompt.avgLatency}s</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-3 w-3" />
                          <span>${prompt.totalCost.toFixed(0)}</span>
                        </div>
                      </div>
                      <code className="text-[9px] text-slate-400 font-mono">
                        L{prompt.lineNumber}
                      </code>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {filteredPrompts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center mb-4">
              <FileCode2 className="h-5 w-5 text-slate-400" />
            </div>
            <h3 className="text-sm font-medium text-slate-700 mb-1">No prompts found</h3>
            <p className="text-sm text-slate-500">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
