"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  ChevronDown,
  ChevronUp,
  Maximize2,
  X,
  ArrowsUpFromLine,
  Copy,
  Check,
} from "lucide-react";

interface Message {
  role: "system" | "user" | "assistant";
  content: string;
  variables?: Record<string, string>;
}

interface PromptResponseViewerProps {
  messages: Message[];
  response: {
    role: "assistant";
    content: string;
  };
  className?: string;
}

export function PromptResponseViewer({
  messages,
  response,
  className,
}: PromptResponseViewerProps) {
  return (
    <div className={cn("grid grid-cols-2 gap-4 p-5 pt-0", className)}>
      {/* Prompt Panel */}
      <div className="border border-slate-200 rounded-xl bg-white overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <h3 className="text-[13px] font-semibold text-slate-800">Prompt</h3>
            <button className="text-[12px] text-blue-600 hover:text-blue-700 font-medium">
              (Show full JSON)
            </button>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-slate-700">
              <ArrowsUpFromLine className="h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-slate-700">
              <X className="h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-slate-700">
              <Maximize2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        <ScrollArea className="h-[400px]">
          <div className="p-1">
            {messages.map((message, index) => (
              <MessageBlock key={index} message={message} />
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Response Panel */}
      <div className="border border-slate-200 rounded-xl bg-white overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <h3 className="text-[13px] font-semibold text-slate-800">Response</h3>
            <button className="text-[12px] text-blue-600 hover:text-blue-700 font-medium">
              (Show full JSON)
            </button>
          </div>
          <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-slate-700">
            <Maximize2 className="h-3.5 w-3.5" />
          </Button>
        </div>

        <ScrollArea className="h-[400px]">
          <div className="p-1">
            <ResponseBlock response={response} />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

function MessageBlock({ message }: { message: Message }) {
  const [isOpen, setIsOpen] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const roleColors = {
    system: "text-violet-600 bg-violet-50",
    user: "text-emerald-600 bg-emerald-50",
    assistant: "text-blue-600 bg-blue-50",
  };

  const roleLabels = {
    system: "SYSTEM",
    user: "USER",
    assistant: "ASSISTANT",
  };

  // Highlight variables in content
  const renderContent = (content: string, variables?: Record<string, string>) => {
    if (!variables || Object.keys(variables).length === 0) {
      return <span className="text-slate-700">{content}</span>;
    }

    // Find and highlight variable values
    let result = content;
    const parts: Array<{ type: "text" | "variable"; content: string }> = [];
    let lastIndex = 0;

    Object.entries(variables).forEach(([key, value]) => {
      const index = result.indexOf(value, lastIndex);
      if (index !== -1) {
        if (index > lastIndex) {
          parts.push({ type: "text", content: result.slice(lastIndex, index) });
        }
        parts.push({ type: "variable", content: value });
        lastIndex = index + value.length;
      }
    });

    if (lastIndex < result.length) {
      parts.push({ type: "text", content: result.slice(lastIndex) });
    }

    if (parts.length === 0) {
      return <span className="text-slate-700">{content}</span>;
    }

    return (
      <>
        {parts.map((part, i) =>
          part.type === "variable" ? (
            <span key={i} className="text-blue-600 font-medium">
              {part.content}
            </span>
          ) : (
            <span key={i} className="text-slate-700">
              {part.content}
            </span>
          )
        )}
      </>
    );
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="border border-slate-200 rounded-lg m-2 overflow-hidden">
        <CollapsibleTrigger asChild>
          <button className="w-full px-4 py-2.5 flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition-colors">
            <span className={cn("text-[11px] font-bold uppercase tracking-wider", roleColors[message.role].split(" ")[0])}>
              {roleLabels[message.role]}
            </span>
            {isOpen ? (
              <ChevronUp className="h-4 w-4 text-slate-400" />
            ) : (
              <ChevronDown className="h-4 w-4 text-slate-400" />
            )}
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="px-4 py-3 bg-white relative group">
            <p className="text-[13px] leading-relaxed whitespace-pre-wrap">
              {renderContent(message.content, message.variables)}
            </p>
            <button
              onClick={handleCopy}
              className="absolute top-2 right-2 p-1.5 rounded-md bg-white border border-slate-200 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-slate-50"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-emerald-500" />
              ) : (
                <Copy className="h-3.5 w-3.5 text-slate-400" />
              )}
            </button>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}

function ResponseBlock({ response }: { response: { role: "assistant"; content: string } }) {
  const [isOpen, setIsOpen] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(response.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="border border-slate-200 rounded-lg m-2 overflow-hidden">
        <CollapsibleTrigger asChild>
          <button className="w-full px-4 py-2.5 flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition-colors">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
              ASSISTANT
            </span>
            {isOpen ? (
              <ChevronUp className="h-4 w-4 text-slate-400" />
            ) : (
              <ChevronDown className="h-4 w-4 text-slate-400" />
            )}
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="px-4 py-3 bg-white relative group">
            <p className="text-[13px] leading-relaxed text-slate-700 whitespace-pre-wrap">
              {response.content}
            </p>
            <button
              onClick={handleCopy}
              className="absolute top-2 right-2 p-1.5 rounded-md bg-white border border-slate-200 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-slate-50"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-emerald-500" />
              ) : (
                <Copy className="h-3.5 w-3.5 text-slate-400" />
              )}
            </button>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}
