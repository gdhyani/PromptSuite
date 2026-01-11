"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Route } from "next";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  LayoutDashboard,
  FolderKanban,
  FileCode2,
  FlaskConical,
  BarChart3,
  ScrollText,
  Settings,
  LogOut,
  BookTemplate,
  Command,
  ChevronLeft,
  ChevronRight,
  History,
  ClipboardCheck,
  Database,
  GitCompare,
  Sparkles,
  FileBarChart,
  Bell,
  HelpCircle,
  MessageSquare,
  Lightbulb,
  Wand2,
  Brain,
  Target,
  TestTube,
  Layers,
  type LucideIcon,
} from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
  badgeColor?: string;
}

interface NavSection {
  title?: string;
  items: NavItem[];
}

const navigation: NavSection[] = [
  {
    items: [
      { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { name: "Projects", href: "/dashboard/projects", icon: FolderKanban },
      { name: "Prompts", href: "/dashboard/prompts", icon: FileCode2 },
    ],
  },
  {
    title: "Evaluation",
    items: [
      { name: "Evals", href: "/dashboard/evals", icon: ClipboardCheck, badge: "New", badgeColor: "emerald" },
      { name: "Datasets", href: "/dashboard/datasets", icon: Database },
      { name: "Comparisons", href: "/dashboard/comparisons", icon: GitCompare },
      { name: "Test Suites", href: "/dashboard/test-suites", icon: TestTube },
    ],
  },
  {
    title: "AI Tools",
    items: [
      { name: "Playground", href: "/playground", icon: FlaskConical },
      { name: "AI Improve", href: "/dashboard/ai-improve", icon: Wand2, badge: "Beta", badgeColor: "violet" },
      { name: "Registry", href: "/dashboard/templates", icon: BookTemplate },
      { name: "Fine-tuning", href: "/dashboard/fine-tuning", icon: Brain },
    ],
  },
  {
    title: "Insights",
    items: [
      { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
      { name: "Logs", href: "/dashboard/logs", icon: ScrollText },
      { name: "Reports", href: "/dashboard/reports", icon: FileBarChart },
      { name: "History", href: "/dashboard/history", icon: History },
    ],
  },
];

const bottomNavItems: NavItem[] = [
  { name: "Notifications", href: "/dashboard/notifications", icon: Bell },
  { name: "Feedback", href: "/dashboard/feedback", icon: MessageSquare },
  { name: "Help & Docs", href: "/dashboard/help", icon: HelpCircle },
];

interface SidebarProps {
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
}

export function Sidebar({ collapsed: controlledCollapsed, onCollapsedChange }: SidebarProps) {
  const pathname = usePathname();
  const [internalCollapsed, setInternalCollapsed] = useState(false);

  const collapsed = controlledCollapsed ?? internalCollapsed;
  const setCollapsed = onCollapsedChange ?? setInternalCollapsed;

  // Keyboard shortcut to toggle sidebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "[" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCollapsed(!collapsed);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [collapsed, setCollapsed]);

  const NavItemComponent = ({ item, isActive }: { item: NavItem; isActive: boolean }) => {
    const content = (
      <Link
        href={item.href as Route}
        className={cn(
          "group flex items-center gap-2.5 rounded-md px-3 py-2 text-[13px] font-medium transition-all duration-200",
          collapsed && "justify-center px-2",
          isActive
            ? "bg-zinc-800 text-zinc-100"
            : "text-zinc-500 hover:bg-zinc-800/50 hover:text-zinc-300"
        )}
      >
        <item.icon
          className={cn(
            "h-4 w-4 flex-shrink-0 transition-colors",
            isActive ? "text-zinc-100" : "text-zinc-600 group-hover:text-zinc-400"
          )}
        />
        {!collapsed && (
          <>
            <span className="flex-1 truncate">{item.name}</span>
            {item.badge && (
              <span className={cn(
                "text-[9px] font-semibold px-1.5 py-0.5 rounded-full",
                item.badgeColor === "emerald" && "bg-emerald-500/10 text-emerald-400",
                item.badgeColor === "violet" && "bg-violet-500/10 text-violet-400",
                !item.badgeColor && "bg-blue-500/10 text-blue-400"
              )}>
                {item.badge}
              </span>
            )}
          </>
        )}
      </Link>
    );

    if (collapsed) {
      return (
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>{content}</TooltipTrigger>
          <TooltipContent side="right" className="bg-zinc-800 border-zinc-700 text-zinc-200">
            <p className="flex items-center gap-2">
              {item.name}
              {item.badge && (
                <span className={cn(
                  "text-[9px] font-semibold px-1.5 py-0.5 rounded-full",
                  item.badgeColor === "emerald" && "bg-emerald-500/10 text-emerald-400",
                  item.badgeColor === "violet" && "bg-violet-500/10 text-violet-400",
                )}>
                  {item.badge}
                </span>
              )}
            </p>
          </TooltipContent>
        </Tooltip>
      );
    }

    return content;
  };

  return (
    <TooltipProvider>
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-zinc-800/60 bg-[#09090b] transition-all duration-300",
          collapsed ? "w-[60px]" : "w-[240px]"
        )}
      >
        {/* Logo */}
        <div className={cn(
          "flex h-14 items-center border-b border-zinc-800/60 transition-all duration-300",
          collapsed ? "justify-center px-2" : "gap-2.5 px-4"
        )}>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/20">
            <Command className="h-4 w-4 text-white" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-sm text-zinc-100">PromptSuite</span>
              <span className="text-[10px] text-zinc-600">AI Prompt Management</span>
            </div>
          )}
        </div>

        {/* Collapse Toggle */}
        <div className={cn(
          "flex items-center px-2 py-2 border-b border-zinc-800/40",
          collapsed ? "justify-center" : "justify-end"
        )}>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-zinc-600 hover:text-zinc-300 hover:bg-zinc-800/50"
                onClick={() => setCollapsed(!collapsed)}
              >
                {collapsed ? (
                  <ChevronRight className="h-4 w-4" />
                ) : (
                  <ChevronLeft className="h-4 w-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-zinc-800 border-zinc-700 text-zinc-200">
              <p className="flex items-center gap-2">
                {collapsed ? "Expand" : "Collapse"}
                <kbd className="px-1.5 py-0.5 text-[10px] rounded bg-zinc-700 text-zinc-400">⌘[</kbd>
              </p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 px-2 py-3 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
          {navigation.map((section, sectionIndex) => (
            <div key={sectionIndex} className={cn(sectionIndex > 0 && "mt-5")}>
              {section.title && !collapsed && (
                <div className="mb-2 px-3">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-600">
                    {section.title}
                  </span>
                </div>
              )}
              {section.title && collapsed && (
                <div className="mb-2 flex justify-center">
                  <div className="w-4 h-px bg-zinc-800" />
                </div>
              )}
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive = pathname === item.href ||
                    (item.href !== "/dashboard" && pathname.startsWith(item.href));
                  return (
                    <NavItemComponent key={item.name} item={item} isActive={isActive} />
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom Navigation */}
        <div className="border-t border-zinc-800/60 px-2 py-2">
          <div className="space-y-0.5">
            {bottomNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <NavItemComponent key={item.name} item={item} isActive={isActive} />
              );
            })}
          </div>
        </div>

        {/* Settings */}
        <div className="border-t border-zinc-800/60 px-2 py-2">
          <NavItemComponent
            item={{ name: "Settings", href: "/dashboard/settings", icon: Settings }}
            isActive={pathname === "/dashboard/settings"}
          />
        </div>

        {/* User Profile */}
        <div className={cn(
          "border-t border-zinc-800/60 p-2",
          collapsed && "flex justify-center"
        )}>
          {collapsed ? (
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <div className="cursor-pointer">
                  <Avatar className="h-8 w-8 border-2 border-zinc-700 hover:border-zinc-600 transition-colors">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-violet-600 text-white text-[10px] font-semibold">
                      JD
                    </AvatarFallback>
                  </Avatar>
                </div>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-zinc-800 border-zinc-700">
                <div className="flex flex-col gap-1">
                  <p className="text-zinc-200 font-medium">John Doe</p>
                  <p className="text-zinc-500 text-xs">john@example.com</p>
                </div>
              </TooltipContent>
            </Tooltip>
          ) : (
            <div className="flex items-center gap-2.5 rounded-lg px-2 py-2 hover:bg-zinc-800/50 transition-colors cursor-pointer group">
              <Avatar className="h-8 w-8 border-2 border-zinc-700 group-hover:border-zinc-600 transition-colors">
                <AvatarImage src="" />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-violet-600 text-white text-[10px] font-semibold">
                  JD
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-zinc-200 truncate">John Doe</p>
                <p className="text-[10px] text-zinc-600 truncate">john@example.com</p>
              </div>
              <LogOut className="h-3.5 w-3.5 text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          )}
        </div>

        {/* Version */}
        {!collapsed && (
          <div className="px-4 py-2 border-t border-zinc-800/40">
            <p className="text-[10px] text-zinc-700">v1.0.0-beta</p>
          </div>
        )}
      </aside>
    </TooltipProvider>
  );
}
