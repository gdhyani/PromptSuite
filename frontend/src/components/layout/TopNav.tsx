"use client";

import Link from "next/link";
import type { Route } from "next";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Home,
  BookTemplate,
  ClipboardCheck,
  BarChart3,
  FlaskConical,
  Settings,
  FolderKanban,
  Plus,
  Check,
  Sparkles,
  Database,
  History,
} from "lucide-react";

interface Project {
  id: string;
  name: string;
  type: "github" | "snippet";
}

interface TopNavProps {
  currentProject?: Project;
  projects?: Project[];
  onProjectChange?: (projectId: string) => void;
}

const navItems = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "Registry", href: "/dashboard/templates", icon: BookTemplate },
  { name: "Evaluate", href: "/dashboard/evals", icon: ClipboardCheck },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Playground", href: "/playground", icon: FlaskConical },
];

const secondaryNavItems = [
  { name: "Fine-Tune", href: "/dashboard/fine-tuning", icon: Sparkles },
  { name: "Datasets", href: "/dashboard/datasets", icon: Database },
];

export function TopNav({ currentProject, projects = [], onProjectChange }: TopNavProps) {
  const pathname = usePathname();

  return (
    <header className="h-[52px] border-b border-slate-200 bg-white flex items-center justify-between px-3 sticky top-0 z-50">
      {/* Left section - Logo and navigation */}
      <div className="flex items-center gap-0.5">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2.5 px-2 py-1.5 rounded-md hover:bg-slate-50 transition-colors">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-400 shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="font-semibold text-[15px] text-slate-900 tracking-tight">PromptSuite</span>
        </Link>

        {/* Separator */}
        <div className="w-px h-5 bg-slate-200 mx-2" />

        {/* Back/Forward */}
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-700 hover:bg-slate-100">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-700 hover:bg-slate-100">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Project Selector */}
        <div className="ml-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-8 gap-2 px-3 text-[13px] font-medium border-slate-200 bg-slate-50/80 hover:bg-slate-100 hover:border-slate-300 text-slate-700 shadow-sm"
              >
                <div className="flex items-center justify-center h-4 w-4 rounded bg-slate-200 text-slate-600">
                  <span className="text-[10px] font-bold">P</span>
                </div>
                <span className="max-w-[140px] truncate">
                  {currentProject?.name || "PromptLa..."}
                </span>
                <ChevronDown className="h-3.5 w-3.5 text-slate-400 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56 border-slate-200 shadow-lg">
              {projects.map((project) => (
                <DropdownMenuItem
                  key={project.id}
                  onClick={() => onProjectChange?.(project.id)}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <span className="truncate text-slate-700">{project.name}</span>
                  {currentProject?.id === project.id && (
                    <Check className="h-4 w-4 text-blue-500" />
                  )}
                </DropdownMenuItem>
              ))}
              {projects.length > 0 && <DropdownMenuSeparator className="bg-slate-100" />}
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href={"/dashboard/projects/new" as Route} className="flex items-center gap-2 text-slate-700">
                  <Plus className="h-4 w-4" />
                  New Project
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Main Navigation Tabs */}
        <nav className="flex items-center ml-3 pl-3 border-l border-slate-200">
          {navItems.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href as Route}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium rounded-md transition-all duration-150",
                  isActive
                    ? "bg-slate-100 text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                )}
              >
                <item.icon className={cn("h-4 w-4", isActive ? "text-blue-500" : "")} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Right section - Secondary nav & Settings */}
      <div className="flex items-center gap-1">
        {secondaryNavItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href as Route}
              className={cn(
                "flex items-center gap-1.5 px-2.5 py-1.5 text-[13px] font-medium rounded-md transition-all duration-150",
                isActive
                  ? "bg-slate-100 text-slate-900"
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          );
        })}

        <div className="w-px h-5 bg-slate-200 mx-1.5" />

        <Link href={"/dashboard/settings" as Route}>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-700 hover:bg-slate-100">
            <Settings className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </header>
  );
}
