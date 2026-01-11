"use client";

import Link from "next/link";
import type { Route } from "next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  ArrowUpRight,
  Zap,
  DollarSign,
  Clock,
  FileCode2,
  FolderKanban,
  TrendingUp,
  TrendingDown,
  ChevronRight,
  Timer,
  CheckCircle2,
  XCircle,
  GitBranch,
  Target,
  FlaskConical,
  BarChart3,
  Settings,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useProjects } from "@/features/projects/hooks/useProjects";
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

export default function DashboardPage() {
  const { data: projects = [], isLoading, error } = useProjects();

  const totalPrompts = projects.reduce((a, b) => a + b.promptCount, 0);
  const recentProjects = projects.slice(0, 4);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-[calc(100vh-52px)] bg-slate-50 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
        <p className="text-sm text-slate-500 mt-3">Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-[calc(100vh-52px)] bg-slate-50 items-center justify-center">
        <AlertCircle className="h-8 w-8 text-red-400" />
        <p className="text-sm text-slate-700 mt-3">Failed to load dashboard</p>
        <p className="text-xs text-slate-500 mt-1">{(error as Error).message}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-52px)] bg-slate-50">
      {/* Content */}
      <div className="flex-1 p-6 space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-slate-900">Dashboard</h1>
            <p className="text-sm text-slate-500 mt-0.5">Welcome back. Here&apos;s an overview of your prompts.</p>
          </div>
          <Link href={"/dashboard/projects/new" as Route}>
            <Button size="sm" className="h-9 gap-2 bg-slate-900 text-white hover:bg-slate-800 shadow-sm">
              <Plus className="h-3.5 w-3.5" />
              New Project
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-lg bg-blue-50">
                <FolderKanban className="h-4 w-4 text-blue-500" />
              </div>
            </div>
            <p className="text-2xl font-semibold text-slate-900">{projects.length}</p>
            <p className="text-xs text-slate-500 mt-1">Total Projects</p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-lg bg-violet-50">
                <FileCode2 className="h-4 w-4 text-violet-500" />
              </div>
            </div>
            <p className="text-2xl font-semibold text-slate-900">{totalPrompts}</p>
            <p className="text-xs text-slate-500 mt-1">Total Prompts</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-6">
          {/* Recent Projects */}
          <div className="col-span-1">
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                <h3 className="text-sm font-semibold text-slate-800">Projects</h3>
                <Link href={"/dashboard/projects" as Route}>
                  <Button variant="ghost" size="sm" className="h-7 text-[13px] text-slate-500 hover:text-slate-800 gap-1">
                    View all
                    <ArrowUpRight className="h-3 w-3" />
                  </Button>
                </Link>
              </div>
              {recentProjects.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mb-3">
                    <FolderKanban className="h-5 w-5 text-slate-400" />
                  </div>
                  <h3 className="text-sm font-medium text-slate-700 mb-1">No projects yet</h3>
                  <p className="text-xs text-slate-500 mb-4">Create your first project to get started</p>
                  <Link href={"/dashboard/projects/new" as Route}>
                    <Button size="sm" className="h-8 gap-2 bg-slate-900 text-white hover:bg-slate-800">
                      <Plus className="h-3.5 w-3.5" />
                      New Project
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {recentProjects.map((project) => (
                    <Link
                      key={project.id}
                      href={`/dashboard/projects/${project.id}` as Route}
                      className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 group-hover:bg-slate-200 transition-colors">
                          <FolderKanban className="h-5 w-5 text-slate-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-800 group-hover:text-slate-900 transition-colors">
                            {project.name}
                          </p>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {project.description || "No description"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-1.5 text-xs text-slate-400">
                          <GitBranch className="h-3 w-3" />
                          <span className="font-mono">{project.branch}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-medium text-slate-700">{project.promptCount} prompts</p>
                          <p className="text-[11px] text-slate-400">Scanned {formatDate(project.lastScanned)}</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Access */}
        <div className="grid grid-cols-4 gap-4">
          <Link
            href={"/playground" as Route}
            className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-slate-300 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-emerald-50 group-hover:bg-emerald-100 transition-colors">
                <FlaskConical className="h-4 w-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-800 group-hover:text-slate-900">Playground</p>
                <p className="text-xs text-slate-500">Quick prompt testing</p>
              </div>
            </div>
          </Link>
          <Link
            href={"/dashboard/templates" as Route}
            className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-slate-300 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors">
                <FileCode2 className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-800 group-hover:text-slate-900">Registry</p>
                <p className="text-xs text-slate-500">Prompt templates</p>
              </div>
            </div>
          </Link>
          <Link
            href={"/dashboard/analytics" as Route}
            className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-slate-300 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-violet-50 group-hover:bg-violet-100 transition-colors">
                <BarChart3 className="h-4 w-4 text-violet-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-800 group-hover:text-slate-900">Analytics</p>
                <p className="text-xs text-slate-500">Usage & costs</p>
              </div>
            </div>
          </Link>
          <Link
            href={"/dashboard/settings" as Route}
            className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-slate-300 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-slate-100 group-hover:bg-slate-200 transition-colors">
                <Settings className="h-4 w-4 text-slate-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-800 group-hover:text-slate-900">Settings</p>
                <p className="text-xs text-slate-500">API keys & config</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
