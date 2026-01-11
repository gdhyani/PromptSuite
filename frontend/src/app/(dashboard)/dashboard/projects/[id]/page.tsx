"use client";

import Link from "next/link";
import type { Route } from "next";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  RefreshCw,
  ExternalLink,
  FileCode2,
  Play,
  Copy,
  ChevronRight,
  Zap,
  DollarSign,
  Clock,
  MessageSquare,
  Wrench,
  FileJson,
  User,
  Bot,
  Search,
  Filter,
  ArrowUpRight,
  GitBranch,
  CheckCircle2,
  Timer,
  Hash,
  TrendingUp,
  Loader2,
} from "lucide-react";

// Mock data for the project
const project = {
  id: "1",
  name: "AI Chat Assistant",
  description: "Customer support chatbot with GPT-4 integration",
  githubUrl: "https://github.com/acme/chat-assistant",
  branch: "main",
  lastScanned: "2024-01-15T10:30:00Z",
  stats: {
    totalRuns: 12847,
    avgLatency: 1.23,
    totalCost: 456.78,
    promptCount: 12,
  },
};

// Grouped prompts by file
const promptsByFile = [
  {
    filePath: "src/services/chat.ts",
    prompts: [
      {
        id: "p1",
        lineNumber: 42,
        promptType: "system",
        model: "gpt-4",
        preview: "You are a helpful customer support assistant for Acme Inc...",
        variables: ["company_name", "user_context"],
        config: { temperature: 0.7, maxTokens: 1000 },
        runs: 3421,
        avgLatency: 1.2,
      },
      {
        id: "p2",
        lineNumber: 78,
        promptType: "user",
        model: "gpt-4",
        preview: "Based on the following conversation history: {history}...",
        variables: ["history", "query"],
        config: { temperature: 0.5, maxTokens: 500 },
        runs: 2891,
        avgLatency: 0.9,
      },
    ],
  },
  {
    filePath: "src/services/summarize.ts",
    prompts: [
      {
        id: "p3",
        lineNumber: 23,
        promptType: "system",
        model: "gpt-3.5-turbo",
        preview: "You are a text summarization expert. Provide concise...",
        variables: [],
        config: { temperature: 0.3, maxTokens: 300 },
        runs: 1567,
        avgLatency: 0.6,
      },
    ],
  },
  {
    filePath: "src/tools/weather.ts",
    prompts: [
      {
        id: "p4",
        lineNumber: 15,
        promptType: "tool",
        model: "gpt-4",
        preview: "function: get_weather, parameters: { location: string }...",
        variables: [],
        config: { temperature: 0, maxTokens: 100 },
        runs: 892,
        avgLatency: 0.4,
      },
    ],
  },
  {
    filePath: "src/services/structured.ts",
    prompts: [
      {
        id: "p5",
        lineNumber: 56,
        promptType: "structured_output",
        model: "gpt-4-turbo",
        preview: "response_format: { type: 'json_schema', schema: {...} }",
        variables: ["input_data"],
        config: { temperature: 0.2, maxTokens: 800 },
        runs: 1243,
        avgLatency: 1.8,
      },
    ],
  },
];

const promptTypeConfig: Record<string, { icon: React.ElementType; color: string; bgColor: string }> = {
  system: { icon: Bot, color: "text-blue-400", bgColor: "bg-blue-500/10" },
  user: { icon: User, color: "text-emerald-400", bgColor: "bg-emerald-500/10" },
  assistant: { icon: MessageSquare, color: "text-violet-400", bgColor: "bg-violet-500/10" },
  tool: { icon: Wrench, color: "text-amber-400", bgColor: "bg-amber-500/10" },
  structured_output: { icon: FileJson, color: "text-rose-400", bgColor: "bg-rose-500/10" },
};

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isScanning, setIsScanning] = useState(false);

  const handleRescan = async () => {
    setIsScanning(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsScanning(false);
  };

  const filteredPrompts = promptsByFile.filter(file =>
    file.filePath.toLowerCase().includes(searchQuery.toLowerCase()) ||
    file.prompts.some(p => p.preview.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0b]">
      {/* Header */}
      <div className="h-14 border-b border-zinc-800/60 flex items-center justify-between px-6 bg-[#0f0f10]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-sm text-zinc-500">
            <Link href="/dashboard" as={"/dashboard" as Route} className="hover:text-zinc-300 transition-colors">
              Dashboard
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/dashboard/projects" as={"/dashboard/projects" as Route} className="hover:text-zinc-300 transition-colors">
              Projects
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
          </div>
          <h1 className="text-sm font-medium text-zinc-100">{project.name}</h1>
          <Badge variant="outline" className="text-[10px] border-zinc-700 text-zinc-500 gap-1">
            <GitBranch className="h-3 w-3" />
            {project.branch}
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 gap-2 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
            onClick={handleRescan}
            disabled={isScanning}
          >
            {isScanning ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <RefreshCw className="h-3.5 w-3.5" />
            )}
            {isScanning ? "Scanning..." : "Rescan"}
          </Button>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="ghost" size="sm" className="h-8 gap-2 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50">
              <ExternalLink className="h-3.5 w-3.5" />
              GitHub
            </Button>
          </a>
        </div>
      </div>

      {/* Stats */}
      <div className="border-b border-zinc-800/60 bg-[#0f0f10]">
        <div className="px-6 py-4">
          <div className="grid grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Zap className="h-4 w-4 text-blue-400" />
              </div>
              <div>
                <p className="text-lg font-semibold text-zinc-100">{project.stats.totalRuns.toLocaleString()}</p>
                <p className="text-xs text-zinc-500">Total Runs</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10">
                <Timer className="h-4 w-4 text-amber-400" />
              </div>
              <div>
                <p className="text-lg font-semibold text-zinc-100">{project.stats.avgLatency}s</p>
                <p className="text-xs text-zinc-500">Avg Latency</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10">
                <DollarSign className="h-4 w-4 text-emerald-400" />
              </div>
              <div>
                <p className="text-lg font-semibold text-zinc-100">${project.stats.totalCost.toFixed(2)}</p>
                <p className="text-xs text-zinc-500">Total Cost</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-violet-500/10">
                <Hash className="h-4 w-4 text-violet-400" />
              </div>
              <div>
                <p className="text-lg font-semibold text-zinc-100">{project.stats.promptCount}</p>
                <p className="text-xs text-zinc-500">Prompts</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        {/* Search and Filters */}
        <div className="flex items-center gap-3 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
            <Input
              placeholder="Search prompts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 bg-zinc-900/50 border-zinc-800 text-zinc-200 placeholder:text-zinc-600"
            />
          </div>
          <Button variant="outline" size="sm" className="h-9 gap-2 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50">
            <Filter className="h-3.5 w-3.5" />
            Filter
          </Button>
        </div>

        {/* Prompts List */}
        <div className="space-y-4">
          {filteredPrompts.map((file) => (
            <div
              key={file.filePath}
              className="rounded-lg border border-zinc-800/60 bg-zinc-900/30 overflow-hidden"
            >
              {/* File Header */}
              <div className="flex items-center gap-3 px-4 py-3 bg-zinc-900/50 border-b border-zinc-800/40">
                <FileCode2 className="h-4 w-4 text-zinc-500" />
                <code className="text-sm font-mono text-zinc-300">{file.filePath}</code>
                <Badge variant="secondary" className="ml-auto text-[10px] bg-zinc-800 text-zinc-400 border-0">
                  {file.prompts.length} prompt{file.prompts.length > 1 ? "s" : ""}
                </Badge>
              </div>

              {/* Prompts */}
              <div className="divide-y divide-zinc-800/40">
                {file.prompts.map((prompt) => {
                  const typeConfig = promptTypeConfig[prompt.promptType];
                  return (
                    <Link
                      key={prompt.id}
                      href={`/dashboard/projects/${params.id}/prompts/${prompt.id}` as Route}
                      className="flex items-start gap-4 px-4 py-4 hover:bg-zinc-800/30 transition-colors group"
                    >
                      {/* Left Section */}
                      <div className="flex items-center gap-3 min-w-[140px]">
                        <div className={`p-1.5 rounded-md ${typeConfig.bgColor}`}>
                          <typeConfig.icon className={`h-3.5 w-3.5 ${typeConfig.color}`} />
                        </div>
                        <div>
                          <span className="text-xs text-zinc-500 font-mono">L{prompt.lineNumber}</span>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <Badge
                              variant="outline"
                              className={`text-[10px] capitalize ${typeConfig.color} border-current/20 px-1.5 py-0`}
                            >
                              {prompt.promptType.replace("_", " ")}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <Badge variant="secondary" className="text-[10px] font-mono bg-zinc-800 text-zinc-400 border-0">
                            {prompt.model}
                          </Badge>
                          {prompt.variables.length > 0 && (
                            <span className="text-[10px] text-zinc-600">
                              {prompt.variables.length} variable{prompt.variables.length > 1 ? "s" : ""}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-zinc-400 font-mono line-clamp-1">
                          {prompt.preview}
                        </p>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-6 text-xs text-zinc-600">
                        <div className="flex items-center gap-1.5">
                          <Zap className="h-3 w-3" />
                          <span>{prompt.runs.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Timer className="h-3 w-3" />
                          <span>{prompt.avgLatency}s</span>
                        </div>
                      </div>

                      {/* Arrow */}
                      <ChevronRight className="h-4 w-4 text-zinc-700 group-hover:text-zinc-500 transition-colors" />
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPrompts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-14 h-14 rounded-xl bg-zinc-800/50 flex items-center justify-center mb-4">
              <Search className="h-5 w-5 text-zinc-600" />
            </div>
            <h3 className="text-sm font-medium text-zinc-300 mb-1">No prompts found</h3>
            <p className="text-sm text-zinc-600">
              Try adjusting your search query
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
