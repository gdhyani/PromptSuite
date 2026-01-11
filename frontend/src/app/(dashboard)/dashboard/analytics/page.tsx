"use client";

import { useState } from "react";
import Link from "next/link";
import type { Route } from "next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronRight,
  Zap,
  DollarSign,
  Timer,
  Hash,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  ThumbsUp,
  ThumbsDown,
  Coins,
  Activity,
  Target,
} from "lucide-react";

// Mock analytics data
const overviewStats = [
  {
    label: "Total Requests",
    value: "124,847",
    change: "+12.5%",
    trend: "up" as const,
    icon: Zap,
    bgColor: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  {
    label: "Total Cost",
    value: "$1,234.56",
    change: "+8.3%",
    trend: "up" as const,
    icon: Coins,
    bgColor: "bg-emerald-50",
    iconColor: "text-emerald-500",
  },
  {
    label: "Avg Latency",
    value: "1.23s",
    change: "-5.2%",
    trend: "down" as const,
    icon: Timer,
    bgColor: "bg-amber-50",
    iconColor: "text-amber-500",
  },
  {
    label: "Success Rate",
    value: "99.2%",
    change: "+0.3%",
    trend: "up" as const,
    icon: Target,
    bgColor: "bg-violet-50",
    iconColor: "text-violet-500",
  },
];

// Daily usage data
const dailyData = [
  { date: "Jan 5", requests: 4200, cost: 123 },
  { date: "Jan 6", requests: 3800, cost: 112 },
  { date: "Jan 7", requests: 5100, cost: 145 },
  { date: "Jan 8", requests: 4800, cost: 138 },
  { date: "Jan 9", requests: 5500, cost: 156 },
  { date: "Jan 10", requests: 4900, cost: 142 },
  { date: "Jan 11", requests: 5200, cost: 148 },
];

// Model breakdown
const modelBreakdown = [
  { model: "gpt-4o", requests: 45231, cost: 456.78, percentage: 36, color: "bg-blue-500" },
  { model: "gpt-4", requests: 32891, cost: 523.45, percentage: 26, color: "bg-emerald-500" },
  { model: "gpt-4-turbo", requests: 28456, cost: 198.23, percentage: 23, color: "bg-amber-500" },
  { model: "gpt-3.5-turbo", requests: 18269, cost: 56.10, percentage: 15, color: "bg-violet-500" },
];

// Top prompts by usage
const topPrompts = [
  { name: "Customer Support Assistant", file: "chat.ts:42", runs: 12847, avgLatency: 1.2, cost: 234.56 },
  { name: "Text Summarizer", file: "summarize.ts:23", runs: 8934, avgLatency: 0.8, cost: 89.12 },
  { name: "Code Assistant", file: "code.ts:15", runs: 7823, avgLatency: 1.5, cost: 156.78 },
  { name: "Translation Service", file: "translate.ts:31", runs: 5678, avgLatency: 0.9, cost: 67.45 },
  { name: "Image Analyzer", file: "vision.ts:56", runs: 4521, avgLatency: 2.1, cost: 178.90 },
];

// Latency percentiles
const latencyPercentiles = [
  { label: "p50", value: 0.82, color: "bg-emerald-500" },
  { label: "p90", value: 1.45, color: "bg-amber-500" },
  { label: "p95", value: 2.12, color: "bg-orange-500" },
  { label: "p99", value: 3.87, color: "bg-rose-500" },
];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("7d");

  const maxRequests = Math.max(...dailyData.map(d => d.requests));

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
          <h1 className="text-sm font-medium text-slate-900">Analytics</h1>
        </div>

        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="h-8 w-32 bg-slate-50 border-slate-200 text-slate-700 text-xs">
              <Calendar className="h-3.5 w-3.5 mr-2 text-slate-400" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white border-slate-200">
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="h-8 gap-2 text-slate-600 hover:text-slate-900 border-slate-200">
            <Download className="h-3.5 w-3.5" />
            Export
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 space-y-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-4 gap-4">
          {overviewStats.map((stat) => (
            <div
              key={stat.label}
              className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-4 w-4 ${stat.iconColor}`} />
                </div>
                <div className={`flex items-center gap-1 text-xs font-medium ${
                  stat.trend === "up" && stat.label !== "Avg Latency" ? "text-emerald-600" :
                  stat.trend === "down" && stat.label === "Avg Latency" ? "text-emerald-600" :
                  "text-rose-600"
                }`}>
                  {stat.trend === "up" ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {stat.change}
                </div>
              </div>
              <p className="text-2xl font-semibold text-slate-900">{stat.value}</p>
              <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-3 gap-4">
          {/* Usage Chart */}
          <div className="col-span-2 p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-medium text-slate-800">Request Volume</h3>
                <p className="text-xs text-slate-500 mt-0.5">Daily requests over time</p>
              </div>
              <Badge variant="secondary" className="text-[10px] bg-slate-100 text-slate-500 border-0">
                {timeRange}
              </Badge>
            </div>
            <div className="h-52 flex items-end gap-3 pt-4">
              {dailyData.map((day) => (
                <div key={day.date} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full relative group">
                    <div
                      className="w-full bg-blue-500 rounded-sm transition-all hover:bg-blue-600 cursor-pointer"
                      style={{ height: `${(day.requests / maxRequests) * 160}px` }}
                    />
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 px-2 py-1 rounded text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {day.requests.toLocaleString()} requests
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400">{day.date.split(" ")[1]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Latency Percentiles */}
          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-medium text-slate-800">Latency</h3>
                <p className="text-xs text-slate-500 mt-0.5">Response time percentiles</p>
              </div>
            </div>
            <div className="space-y-4">
              {latencyPercentiles.map((p) => (
                <div key={p.label} className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 uppercase font-medium">{p.label}</span>
                    <span className="text-slate-800 font-semibold">{p.value}s</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${p.color}`}
                      style={{ width: `${Math.min((p.value / 5) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tables Row */}
        <div className="grid grid-cols-2 gap-4">
          {/* Model Breakdown */}
          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-medium text-slate-800">Cost by Model</h3>
                <p className="text-xs text-slate-500 mt-0.5">Token costs per model</p>
              </div>
            </div>
            <div className="space-y-4">
              {modelBreakdown.map((item) => (
                <div key={item.model} className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${item.color}`} />
                      <span className="text-slate-700 font-mono">{item.model}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-slate-400">{item.requests.toLocaleString()}</span>
                      <span className="text-slate-800 font-medium w-20 text-right">${item.cost.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${item.color}`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">Total</span>
              <span className="text-slate-800 font-semibold">$1,234.56</span>
            </div>
          </div>

          {/* Top Prompts */}
          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-medium text-slate-800">Top Prompts</h3>
                <p className="text-xs text-slate-500 mt-0.5">Ranked by usage</p>
              </div>
            </div>
            <div className="space-y-1">
              {topPrompts.map((prompt, index) => (
                <div
                  key={prompt.name}
                  className="flex items-center gap-3 p-2.5 rounded-md hover:bg-slate-50 transition-colors cursor-pointer group"
                >
                  <span className="w-5 h-5 rounded bg-slate-100 flex items-center justify-center text-[10px] text-slate-500 font-medium">
                    {index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-700 truncate">{prompt.name}</p>
                    <p className="text-[10px] text-slate-400 font-mono">{prompt.file}</p>
                  </div>
                  <div className="flex items-center gap-4 text-[11px]">
                    <span className="text-slate-400 w-14 text-right">{prompt.runs.toLocaleString()}</span>
                    <span className="text-slate-600 font-medium w-16 text-right">${prompt.cost.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Stats Row */}
        <div className="grid grid-cols-4 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-xs text-slate-500">Input Tokens</span>
            </div>
            <p className="text-xl font-semibold text-slate-900">32.4M</p>
            <p className="text-xs text-slate-400 mt-1">71.7% of total</p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-xs text-slate-500">Output Tokens</span>
            </div>
            <p className="text-xl font-semibold text-slate-900">12.8M</p>
            <p className="text-xs text-slate-400 mt-1">28.3% of total</p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <ThumbsUp className="h-3.5 w-3.5 text-emerald-500" />
              <span className="text-xs text-slate-500">Positive Feedback</span>
            </div>
            <p className="text-xl font-semibold text-slate-900">1,247</p>
            <p className="text-xs text-slate-400 mt-1">93.4% of rated</p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <ThumbsDown className="h-3.5 w-3.5 text-rose-500" />
              <span className="text-xs text-slate-500">Negative Feedback</span>
            </div>
            <p className="text-xl font-semibold text-slate-900">89</p>
            <p className="text-xs text-slate-400 mt-1">6.6% of rated</p>
          </div>
        </div>
      </div>
    </div>
  );
}
