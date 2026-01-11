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
  Plus,
  Search,
  Filter,
  BookTemplate,
  Copy,
  Star,
  Clock,
  User,
  Tag,
  Zap,
  Bot,
  Code2,
  FileJson,
  Wrench,
  MoreHorizontal,
  ArrowUpRight,
  Check,
} from "lucide-react";

// Template categories
const categories = [
  { id: "all", label: "All Templates", count: 24 },
  { id: "chat", label: "Chat & Conversation", count: 8 },
  { id: "analysis", label: "Analysis & Research", count: 5 },
  { id: "code", label: "Code Generation", count: 4 },
  { id: "writing", label: "Content & Writing", count: 4 },
  { id: "data", label: "Data Processing", count: 3 },
];

// Mock templates data
const templates = [
  {
    id: "t1",
    name: "Customer Support Agent",
    description: "Professional customer service chatbot with empathy and problem-solving capabilities",
    category: "chat",
    type: "system",
    model: "gpt-4o",
    author: "PromptSuite",
    usageCount: 1234,
    starred: true,
    tags: ["support", "chat", "professional"],
    createdAt: "2024-01-10",
    variables: ["company_name", "product_info"],
  },
  {
    id: "t2",
    name: "Code Review Assistant",
    description: "Thorough code review with security checks, best practices, and improvement suggestions",
    category: "code",
    type: "system",
    model: "gpt-4-turbo",
    author: "PromptSuite",
    usageCount: 892,
    starred: true,
    tags: ["code", "review", "security"],
    createdAt: "2024-01-08",
    variables: ["language", "code_context"],
  },
  {
    id: "t3",
    name: "Research Summarizer",
    description: "Extract key findings and insights from academic papers and research documents",
    category: "analysis",
    type: "system",
    model: "gpt-4o",
    author: "Community",
    usageCount: 567,
    starred: false,
    tags: ["research", "summary", "academic"],
    createdAt: "2024-01-05",
    variables: ["document_type", "focus_area"],
  },
  {
    id: "t4",
    name: "SQL Query Generator",
    description: "Convert natural language questions to optimized SQL queries with explanations",
    category: "data",
    type: "system",
    model: "gpt-4o-mini",
    author: "PromptSuite",
    usageCount: 445,
    starred: false,
    tags: ["sql", "database", "query"],
    createdAt: "2024-01-03",
    variables: ["schema_info", "database_type"],
  },
  {
    id: "t5",
    name: "Blog Post Writer",
    description: "SEO-optimized blog content with engaging headlines and structured formatting",
    category: "writing",
    type: "system",
    model: "gpt-4o",
    author: "Community",
    usageCount: 789,
    starred: true,
    tags: ["blog", "seo", "content"],
    createdAt: "2024-01-01",
    variables: ["topic", "tone", "target_audience"],
  },
  {
    id: "t6",
    name: "API Documentation",
    description: "Generate comprehensive API documentation from code or specifications",
    category: "code",
    type: "system",
    model: "gpt-4-turbo",
    author: "PromptSuite",
    usageCount: 321,
    starred: false,
    tags: ["api", "docs", "technical"],
    createdAt: "2023-12-28",
    variables: ["api_spec", "format"],
  },
];

const typeConfig: Record<string, { icon: React.ElementType; color: string; bgColor: string }> = {
  system: { icon: Bot, color: "text-blue-500", bgColor: "bg-blue-50" },
  user: { icon: User, color: "text-emerald-500", bgColor: "bg-emerald-50" },
  tool: { icon: Wrench, color: "text-amber-500", bgColor: "bg-amber-50" },
  structured_output: { icon: FileJson, color: "text-rose-500", bgColor: "bg-rose-50" },
};

export default function TemplatesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
          <h1 className="text-sm font-medium text-slate-900">Registry</h1>
          <Badge variant="secondary" className="text-[10px] bg-slate-100 text-slate-500 border-0">
            {templates.length} templates
          </Badge>
        </div>

        <Button size="sm" className="h-8 gap-2 bg-slate-900 text-white hover:bg-slate-800">
          <Plus className="h-3.5 w-3.5" />
          New Template
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 flex">
        {/* Sidebar - Categories */}
        <div className="w-56 border-r border-slate-200 p-4 bg-white">
          <div className="space-y-1">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
                  selectedCategory === category.id
                    ? "bg-slate-100 text-slate-900"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                }`}
              >
                <span>{category.label}</span>
                <span className="text-xs text-slate-400">{category.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Search and Filters */}
          <div className="flex items-center gap-3 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 bg-white border-slate-200 text-slate-800 placeholder:text-slate-400"
              />
            </div>
            <Select defaultValue="popular">
              <SelectTrigger className="h-9 w-36 bg-white border-slate-200 text-slate-700 text-xs">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-white border-slate-200">
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-2 gap-4">
            {filteredTemplates.map((template) => {
              const typeInfo = typeConfig[template.type];
              return (
                <div
                  key={template.id}
                  className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm hover:border-slate-300 hover:shadow-md transition-all group"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className={`p-2 rounded-lg ${typeInfo.bgColor}`}>
                        <typeInfo.icon className={`h-4 w-4 ${typeInfo.color}`} />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-slate-800 group-hover:text-slate-900 transition-colors">
                          {template.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-0.5">
                          <Badge variant="secondary" className="text-[10px] font-mono bg-slate-100 text-slate-500 border-0">
                            {template.model}
                          </Badge>
                          <span className="text-[10px] text-slate-400">by {template.author}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-slate-400 hover:text-amber-500"
                      >
                        <Star className={`h-3.5 w-3.5 ${template.starred ? "fill-amber-400 text-amber-400" : ""}`} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-slate-400 hover:text-slate-700"
                        onClick={() => handleCopy(template.id)}
                      >
                        {copiedId === template.id ? (
                          <Check className="h-3.5 w-3.5 text-emerald-500" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-500 mb-3 line-clamp-2">
                    {template.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {template.tags.slice(0, 3).map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-[10px] border-slate-200 text-slate-500 px-1.5 py-0"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {template.variables.length > 0 && (
                      <Badge
                        variant="outline"
                        className="text-[10px] border-emerald-200 text-emerald-600 px-1.5 py-0"
                      >
                        {template.variables.length} vars
                      </Badge>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-3 text-[10px] text-slate-400">
                      <div className="flex items-center gap-1">
                        <Zap className="h-3 w-3" />
                        <span>{template.usageCount.toLocaleString()} uses</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{template.createdAt}</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs text-slate-500 hover:text-slate-700 gap-1"
                    >
                      Use
                      <ArrowUpRight className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredTemplates.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center mb-4">
                <BookTemplate className="h-5 w-5 text-slate-400" />
              </div>
              <h3 className="text-sm font-medium text-slate-700 mb-1">No templates found</h3>
              <p className="text-sm text-slate-500">
                Try adjusting your search or category filter
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
