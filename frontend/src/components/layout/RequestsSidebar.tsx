"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Search,
  Tag,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock,
  Zap,
} from "lucide-react";

export interface RequestItem {
  id: string;
  model: string;
  promptPreview: string;
  responsePreview: string;
  timestamp: string;
  status: "success" | "error" | "pending";
  promptName?: string;
  cost?: number;
  latencyMs?: number;
}

interface RequestsSidebarProps {
  requests: RequestItem[];
  selectedId?: string;
  onSelectRequest: (id: string) => void;
  view?: "requests" | "traces";
  onViewChange?: (view: "requests" | "traces") => void;
  className?: string;
}

export function RequestsSidebar({
  requests,
  selectedId,
  onSelectRequest,
  view = "requests",
  onViewChange,
  className,
}: RequestsSidebarProps) {
  const [search, setSearch] = useState("");

  const filteredRequests = requests.filter(
    (req) =>
      req.model.toLowerCase().includes(search.toLowerCase()) ||
      req.promptPreview.toLowerCase().includes(search.toLowerCase()) ||
      req.promptName?.toLowerCase().includes(search.toLowerCase())
  );

  const StatusIcon = ({ status }: { status: string }) => {
    switch (status) {
      case "success":
        return <CheckCircle2 className="h-3 w-3 text-emerald-500" />;
      case "error":
        return <XCircle className="h-3 w-3 text-red-500" />;
      default:
        return <AlertCircle className="h-3 w-3 text-amber-500" />;
    }
  };

  return (
    <aside className={cn("w-[260px] border-r border-slate-200 bg-slate-50/50 flex flex-col", className)}>
      {/* Search */}
      <div className="p-3 space-y-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 h-8 text-[13px] bg-white border-slate-200 focus:border-blue-300 focus:ring-blue-200 placeholder:text-slate-400"
          />
        </div>
        <Button
          variant="outline"
          size="sm"
          className="w-full h-8 gap-2 text-[13px] font-medium border-slate-200 bg-white hover:bg-slate-50 text-slate-600 justify-start"
        >
          <Tag className="h-3.5 w-3.5" />
          Tags
        </Button>
      </div>

      {/* View Toggle */}
      <div className="px-3 pb-2">
        <div className="flex bg-slate-100 rounded-lg p-0.5">
          <button
            onClick={() => onViewChange?.("requests")}
            className={cn(
              "flex-1 px-3 py-1.5 text-[12px] font-semibold rounded-md transition-all duration-150",
              view === "requests"
                ? "bg-white text-slate-800 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            )}
          >
            Requests
          </button>
          <button
            onClick={() => onViewChange?.("traces")}
            className={cn(
              "flex-1 px-3 py-1.5 text-[12px] font-semibold rounded-md transition-all duration-150",
              view === "traces"
                ? "bg-white text-slate-800 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            )}
          >
            Traces
          </button>
        </div>
      </div>

      {/* Request List */}
      <ScrollArea className="flex-1">
        <div className="px-2 pb-2">
          {filteredRequests.map((request, index) => (
            <button
              key={request.id}
              onClick={() => onSelectRequest(request.id)}
              className={cn(
                "w-full text-left p-2.5 rounded-lg mb-1 transition-all duration-150",
                selectedId === request.id
                  ? "bg-blue-50 border border-blue-200 shadow-sm"
                  : "hover:bg-white hover:shadow-sm border border-transparent"
              )}
              style={{ animationDelay: `${index * 30}ms` }}
            >
              {/* Model & Status */}
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[12px] font-semibold text-slate-800">{request.model}</span>
                <StatusIcon status={request.status} />
              </div>

              {/* Prompt Preview */}
              <div className="mb-1">
                <span className="text-[10px] font-semibold text-blue-600 uppercase tracking-wider">Prompt: </span>
                <span className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">{request.promptPreview}</span>
              </div>

              {/* Response Preview */}
              <div className="mb-2">
                <span className="text-[10px] font-semibold text-emerald-600 uppercase tracking-wider">Response: </span>
                <span className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">{request.responsePreview}</span>
              </div>

              {/* Footer with timestamp and metrics */}
              <div className="flex items-center justify-between pt-1.5 border-t border-slate-100">
                {request.promptName && (
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <Zap className="h-2.5 w-2.5" />
                    {request.promptName}
                  </span>
                )}
                <span className="text-[10px] text-slate-400 flex items-center gap-1 ml-auto">
                  <Clock className="h-2.5 w-2.5" />
                  {request.timestamp}
                </span>
              </div>
            </button>
          ))}

          {filteredRequests.length === 0 && (
            <div className="py-8 text-center">
              <p className="text-[13px] text-slate-400">No requests found</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </aside>
  );
}
