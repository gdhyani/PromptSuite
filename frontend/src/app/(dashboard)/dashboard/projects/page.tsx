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
  FolderKanban,
  FileCode2,
  Clock,
  MoreHorizontal,
  GitBranch,
  RefreshCw,
  ExternalLink,
  Zap,
  DollarSign,
  Timer,
  ArrowUpDown,
  LayoutGrid,
  List,
  CheckCircle2,
  AlertCircle,
  Code2,
  Loader2,
} from "lucide-react";
import { useProjects, useScanProject } from "@/features/projects/hooks/useProjects";
import type { Project } from "@/features/projects/types";

function formatDate(dateString: string | null) {
  if (!dateString) return "Never";
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

function getProjectStatus(project: Project): "active" | "idle" | "never" {
  if (!project.lastScanned) return "never";
  const lastScanned = new Date(project.lastScanned);
  const now = new Date();
  const diff = now.getTime() - lastScanned.getTime();
  const hours = diff / (1000 * 60 * 60);
  return hours < 24 ? "active" : "idle";
}

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [scanningProjectId, setScanningProjectId] = useState<string | null>(null);

  const { data: projects = [], isLoading, error } = useProjects();
  const scanProject = useScanProject();

  const handleScan = async (e: React.MouseEvent, projectId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setScanningProjectId(projectId);
    try {
      await scanProject.mutateAsync(projectId);
    } finally {
      setScanningProjectId(null);
    }
  };

  const filteredProjects = projects.filter((project) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (!project.name.toLowerCase().includes(query) &&
          !(project.description || "").toLowerCase().includes(query)) {
        return false;
      }
    }
    if (typeFilter !== "all" && project.type !== typeFilter) {
      return false;
    }
    if (statusFilter !== "all") {
      const status = getProjectStatus(project);
      if (status !== statusFilter) {
        return false;
      }
    }
    return true;
  });

  const totalPrompts = projects.reduce((a, b) => a + b.promptCount, 0);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-50 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
        <p className="text-sm text-slate-500 mt-3">Loading projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-50 items-center justify-center">
        <AlertCircle className="h-8 w-8 text-red-400" />
        <p className="text-sm text-slate-700 mt-3">Failed to load projects</p>
        <p className="text-xs text-slate-500 mt-1">{(error as Error).message}</p>
      </div>
    );
  }

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
          <h1 className="text-sm font-medium text-slate-900">Projects</h1>
          <Badge variant="secondary" className="text-[10px] bg-slate-100 text-slate-500 border-0">
            {projects.length} projects
          </Badge>
        </div>

        <Link href={"/dashboard/projects/new" as Route}>
          <Button size="sm" className="h-8 gap-2 bg-slate-900 text-white hover:bg-slate-800">
            <Plus className="h-3.5 w-3.5" />
            New Project
          </Button>
        </Link>
      </div>

      {/* Summary Stats */}
      <div className="border-b border-slate-200 bg-white">
        <div className="px-6 py-4">
          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-50">
                <FolderKanban className="h-4 w-4 text-blue-500" />
              </div>
              <div>
                <p className="text-lg font-semibold text-slate-900">{projects.length}</p>
                <p className="text-xs text-slate-500">Total Projects</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-violet-50">
                <FileCode2 className="h-4 w-4 text-violet-500" />
              </div>
              <div>
                <p className="text-lg font-semibold text-slate-900">{totalPrompts}</p>
                <p className="text-xs text-slate-500">Total Prompts</p>
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
                placeholder="Search projects..."
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
                <SelectItem value="github">GitHub</SelectItem>
                <SelectItem value="snippet">Snippet</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-9 w-36 bg-white border-slate-200 text-slate-700 text-xs">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-white border-slate-200">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="idle">Idle</SelectItem>
                <SelectItem value="error">Error</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-1 p-1 rounded-md bg-white border border-slate-200">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded transition-colors ${viewMode === "grid" ? "bg-slate-100 text-slate-800" : "text-slate-400 hover:text-slate-600"}`}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded transition-colors ${viewMode === "list" ? "bg-slate-100 text-slate-800" : "text-slate-400 hover:text-slate-600"}`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Projects Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredProjects.map((project) => (
              <Link
                key={project.id}
                href={`/dashboard/projects/${project.id}` as Route}
                className="group"
              >
                <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm hover:border-slate-300 hover:shadow-md transition-all">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-slate-100">
                        <FolderKanban className="h-5 w-5 text-slate-500" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-slate-800 group-hover:text-slate-900 transition-colors">
                          {project.name}
                        </h3>
                        <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                          {project.description}
                        </p>
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

                  {/* Badges */}
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="secondary" className="text-[10px] bg-slate-100 text-slate-500 border-0 gap-1">
                      {project.type === "github" ? (
                        <GitBranch className="h-2.5 w-2.5" />
                      ) : (
                        <Code2 className="h-2.5 w-2.5" />
                      )}
                      {project.type === "github" ? project.branch : "Snippet"}
                    </Badge>
                    {(() => {
                      const status = getProjectStatus(project);
                      return (
                        <Badge
                          className={`text-[10px] border-0 gap-1 ${
                            status === "active" ? "bg-emerald-50 text-emerald-600" :
                            status === "never" ? "bg-amber-50 text-amber-600" :
                            "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {status === "active" && <CheckCircle2 className="h-2.5 w-2.5" />}
                          {status === "never" && <AlertCircle className="h-2.5 w-2.5" />}
                          {status === "never" ? "Not scanned" : status.charAt(0).toUpperCase() + status.slice(1)}
                        </Badge>
                      );
                    })()}
                  </div>

                  {/* Stats */}
                  <div className="py-3 border-t border-slate-100">
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{project.promptCount}</p>
                      <p className="text-[10px] text-slate-400">Prompts detected</p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                      <Clock className="h-3 w-3" />
                      <span>Scanned {formatDate(project.lastScanned)}</span>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-slate-400 hover:text-slate-600"
                        onClick={(e) => handleScan(e, project.id)}
                        disabled={scanningProjectId === project.id}
                      >
                        {scanningProjectId === project.id ? (
                          <Loader2 className="h-3 w-3 animate-spin" />
                        ) : (
                          <RefreshCw className="h-3 w-3" />
                        )}
                      </Button>
                      {project.githubUrl && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-slate-400 hover:text-slate-600"
                          onClick={(e) => {
                            e.preventDefault();
                            window.open(project.githubUrl!, "_blank");
                          }}
                        >
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-[1fr_120px_100px_100px_120px] gap-4 px-4 py-3 border-b border-slate-100 bg-slate-50">
              <div className="text-xs font-medium text-slate-500 uppercase tracking-wide">Project</div>
              <div className="text-xs font-medium text-slate-500 uppercase tracking-wide">Type</div>
              <div className="text-xs font-medium text-slate-500 uppercase tracking-wide">Status</div>
              <div className="text-xs font-medium text-slate-500 uppercase tracking-wide text-right">Prompts</div>
              <div className="text-xs font-medium text-slate-500 uppercase tracking-wide">Scanned</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-slate-100">
              {filteredProjects.map((project) => {
                const status = getProjectStatus(project);
                return (
                  <Link
                    key={project.id}
                    href={`/dashboard/projects/${project.id}` as Route}
                    className="grid grid-cols-[1fr_120px_100px_100px_120px] gap-4 px-4 py-3 hover:bg-slate-50 transition-colors group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="p-1.5 rounded-md bg-slate-100">
                        <FolderKanban className="h-4 w-4 text-slate-500" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-800 truncate group-hover:text-slate-900">
                          {project.name}
                        </p>
                        <p className="text-[10px] text-slate-400 truncate">{project.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Badge variant="secondary" className="text-[10px] bg-slate-100 text-slate-500 border-0 gap-1">
                        {project.type === "github" ? <GitBranch className="h-2.5 w-2.5" /> : <Code2 className="h-2.5 w-2.5" />}
                        {project.type === "github" ? "GitHub" : "Snippet"}
                      </Badge>
                    </div>
                    <div className="flex items-center">
                      <Badge
                        className={`text-[10px] border-0 ${
                          status === "active" ? "bg-emerald-50 text-emerald-600" :
                          status === "never" ? "bg-amber-50 text-amber-600" :
                          "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {status === "never" ? "Not scanned" : status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-end">
                      <span className="text-sm font-medium text-slate-700">{project.promptCount}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-[10px] text-slate-400">{formatDate(project.lastScanned)}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center mb-4">
              <FolderKanban className="h-5 w-5 text-slate-400" />
            </div>
            <h3 className="text-sm font-medium text-slate-700 mb-1">No projects found</h3>
            <p className="text-sm text-slate-500 mb-4">
              Try adjusting your search or filters
            </p>
            <Link href={"/dashboard/projects/new" as Route}>
              <Button size="sm" className="h-8 gap-2 bg-slate-900 text-white hover:bg-slate-800">
                <Plus className="h-3.5 w-3.5" />
                Create Project
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
