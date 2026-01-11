"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Star,
  Share,
  MoreHorizontal,
  ChevronDown,
  FlaskConical,
  Plus,
  Layers,
  Clock,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Thermometer,
  Hash,
  Percent,
  Maximize2,
  Copy,
  FolderPlus,
} from "lucide-react";

interface LogDetailProps {
  log: {
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
  };
  onOpenInPlayground?: () => void;
  onAddToDataset?: () => void;
}

export function LogDetailView({ log, onOpenInPlayground, onAddToDataset }: LogDetailProps) {
  const [starred, setStarred] = useState(false);
  const [showVariables, setShowVariables] = useState(false);

  const tagColors = {
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    slate: "bg-slate-100 text-slate-700 border-slate-200",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
    amber: "bg-amber-50 text-amber-700 border-amber-200",
    violet: "bg-violet-50 text-violet-700 border-violet-200",
  };

  return (
    <div className="flex-1 bg-white">
      {/* Header */}
      <div className="h-[52px] border-b border-slate-200 px-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <FolderPlus className="h-4 w-4 text-slate-400" />
            <span className="text-[14px] font-semibold text-slate-800">{log.promptName}</span>
            <span className="text-[13px] text-slate-400">[#{log.promptNumber}]</span>
          </div>
          <div className="flex items-center gap-1.5 text-[13px] text-slate-500">
            <Layers className="h-3.5 w-3.5" />
            <span>Groups</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[13px] text-slate-500">Logged {log.loggedAt}</span>

          <button
            onClick={() => setStarred(!starred)}
            className="p-1.5 hover:bg-slate-100 rounded-md transition-colors"
          >
            <Star className={cn("h-4 w-4", starred ? "fill-amber-400 text-amber-400" : "text-slate-400")} />
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1.5 text-[13px] border-slate-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100">
                Score {log.score}
                <ChevronDown className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              {[100, 75, 50, 25, 0].map((score) => (
                <DropdownMenuItem key={score} className="text-[13px]">
                  Score {score}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" size="sm" className="h-8 gap-1.5 text-[13px] border-slate-200 text-slate-600 hover:bg-slate-50">
            <Share className="h-3.5 w-3.5" />
            Share
          </Button>

          <Button variant="outline" size="sm" className="h-8 gap-1.5 text-[13px] border-slate-200 text-slate-600 hover:bg-slate-50">
            Metadata
          </Button>

          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-700">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Model Card */}
        <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/30">
          {/* Model Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-[15px] font-semibold text-slate-900 mb-0.5">{log.model}</h3>
              <p className="text-[13px] text-slate-500 font-mono">{log.apiCall}</p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex items-center gap-2 mb-5">
            {log.tags.map((tag) => (
              <Badge
                key={tag.name}
                variant="outline"
                className={cn("text-[11px] font-medium px-2 py-0.5 rounded-md", tagColors[tag.color])}
              >
                {tag.name}
              </Badge>
            ))}
            <button className="text-[12px] text-slate-400 hover:text-slate-600 flex items-center gap-1">
              <Plus className="h-3 w-3" />
              Add tag
            </button>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-5 gap-4 mb-5">
            <MetricItem
              label="Time"
              value={log.metrics.time}
              icon={<Clock className="h-3.5 w-3.5" />}
            />
            <MetricItem
              label="Cost"
              value={log.metrics.cost}
              icon={<DollarSign className="h-3.5 w-3.5" />}
            />
            <MetricItem
              label="Input Tokens"
              value={log.metrics.inputTokens.toLocaleString()}
              icon={<ArrowUpRight className="h-3.5 w-3.5" />}
            />
            <MetricItem
              label="Output Tokens"
              value={log.metrics.outputTokens.toLocaleString()}
              icon={<ArrowDownRight className="h-3.5 w-3.5" />}
            />
            <MetricItem
              label="Frequency Penalty"
              value={log.metrics.frequencyPenalty.toString()}
              icon={<Percent className="h-3.5 w-3.5" />}
            />
          </div>

          {/* Secondary Metrics */}
          <div className="grid grid-cols-5 gap-4 mb-5 pt-4 border-t border-slate-200">
            <MetricItem
              label="Maximum Tokens"
              value={log.metrics.maxTokens.toLocaleString()}
              icon={<Hash className="h-3.5 w-3.5" />}
            />
            <MetricItem
              label="Presence Penalty"
              value={log.metrics.presencePenalty.toString()}
              icon={<Percent className="h-3.5 w-3.5" />}
            />
            <MetricItem
              label="Seed"
              value={log.metrics.seed.toString()}
              icon={<Hash className="h-3.5 w-3.5" />}
            />
            <MetricItem
              label="Temperature"
              value={log.metrics.temperature.toString()}
              icon={<Thermometer className="h-3.5 w-3.5" />}
            />
            <MetricItem
              label="Top P"
              value={log.metrics.topP.toString()}
              icon={<Percent className="h-3.5 w-3.5" />}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
            <Button
              onClick={onOpenInPlayground}
              variant="outline"
              className="h-9 gap-2 text-[13px] border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100"
            >
              <FlaskConical className="h-4 w-4" />
              Open in Playground
            </Button>
            <Button
              onClick={onAddToDataset}
              variant="outline"
              className="h-9 gap-2 text-[13px] border-slate-200 text-slate-600 hover:bg-slate-100"
            >
              <Plus className="h-4 w-4" />
              Add to Dataset
            </Button>
            <div className="ml-auto">
              <Button
                onClick={() => setShowVariables(!showVariables)}
                variant="ghost"
                className={cn(
                  "h-9 gap-2 text-[13px]",
                  showVariables ? "text-blue-600" : "text-slate-500"
                )}
              >
                Variables
                <Layers className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricItem({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-1.5 mb-1">
        <span className="text-slate-400">{icon}</span>
        <span className="text-[11px] text-slate-500 font-medium">{label}</span>
      </div>
      <span className="text-[14px] font-semibold text-slate-800">{value}</span>
    </div>
  );
}
