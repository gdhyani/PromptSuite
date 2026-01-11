"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useAuth } from "@/features/auth/hooks/useAuth";
import {
  Menu,
  X,
  LayoutDashboard,
  Settings,
  BookOpen,
  Moon,
  Sun,
  Monitor,
  User,
  LogOut,
  Palette,
  ExternalLink,
  Github,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const navLinks = [
  { name: "Features", href: "#features" },
  { name: "How it works", href: "#how-it-works" },
  { name: "Docs", href: "/docs" },
  { name: "Blog", href: "/blog" },
];

// Skeleton loader component for auth loading state
function NavbarSkeleton() {
  return (
    <div className="flex items-center gap-3">
      <div className="hidden md:flex items-center gap-3">
        <div className="h-9 w-24 bg-slate-200 rounded-lg animate-pulse" />
        <div className="h-8 w-8 bg-slate-200 rounded-full animate-pulse" />
      </div>
      <div className="md:hidden h-8 w-8 bg-slate-200 rounded-full animate-pulse" />
    </div>
  );
}

// User Avatar Dropdown component
function UserAvatarDropdown({
  user,
  onLogout,
}: {
  user: { name: string; email: string; avatarUrl: string };
  onLogout: () => void;
}) {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (newTheme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative group focus:outline-none">
          <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
          <Avatar className="h-8 w-8 sm:h-9 sm:w-9 ring-2 ring-slate-200 relative cursor-pointer transition-transform group-hover:scale-105">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-xs font-semibold">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-64 p-2"
        sideOffset={8}
      >
        {/* User Info Header */}
        <div className="px-2 py-3 mb-1">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 ring-2 ring-slate-200">
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-sm font-semibold">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">
                {user.name}
              </p>
              <p className="text-xs text-slate-500 truncate">{user.email}</p>
            </div>
          </div>
        </div>

        <DropdownMenuSeparator />

        {/* Navigation Group */}
        <DropdownMenuGroup className="py-1">
          <DropdownMenuItem asChild>
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-2 py-2 cursor-pointer"
            >
              <LayoutDashboard className="h-4 w-4 text-slate-500" />
              <span className="text-sm">Dashboard</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-3 px-2 py-2 cursor-pointer"
            >
              <Settings className="h-4 w-4 text-slate-500" />
              <span className="text-sm">Settings</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-3 px-2 py-2 cursor-pointer"
            >
              <User className="h-4 w-4 text-slate-500" />
              <span className="text-sm">Profile</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {/* Theme Submenu */}
        <DropdownMenuGroup className="py-1">
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="flex items-center gap-3 px-2 py-2 cursor-pointer">
              <Palette className="h-4 w-4 text-slate-500" />
              <span className="text-sm">Theme</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="w-40 p-1">
              <DropdownMenuItem
                onClick={() => handleThemeChange("light")}
                className="flex items-center gap-3 px-2 py-2 cursor-pointer"
              >
                <Sun className="h-4 w-4 text-amber-500" />
                <span className="text-sm">Light</span>
                {theme === "light" && (
                  <span className="ml-auto text-blue-500 text-xs">Active</span>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleThemeChange("dark")}
                className="flex items-center gap-3 px-2 py-2 cursor-pointer"
              >
                <Moon className="h-4 w-4 text-indigo-500" />
                <span className="text-sm">Dark</span>
                {theme === "dark" && (
                  <span className="ml-auto text-blue-500 text-xs">Active</span>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleThemeChange("system")}
                className="flex items-center gap-3 px-2 py-2 cursor-pointer"
              >
                <Monitor className="h-4 w-4 text-slate-500" />
                <span className="text-sm">System</span>
                {theme === "system" && (
                  <span className="ml-auto text-blue-500 text-xs">Active</span>
                )}
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {/* Resources Group */}
        <DropdownMenuGroup className="py-1">
          <DropdownMenuItem asChild>
            <Link
              href="/docs"
              className="flex items-center gap-3 px-2 py-2 cursor-pointer"
            >
              <BookOpen className="h-4 w-4 text-slate-500" />
              <span className="text-sm">Documentation</span>
              <ExternalLink className="h-3 w-3 text-slate-400 ml-auto" />
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {/* Logout */}
        <DropdownMenuItem
          onClick={onLogout}
          className="flex items-center gap-3 px-2 py-2 cursor-pointer text-red-600 focus:text-red-600 mt-1"
        >
          <LogOut className="h-4 w-4" />
          <span className="text-sm font-medium">Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Brand click handler - goes to dashboard if authenticated
  const handleBrandClick = (e: React.MouseEvent) => {
    if (isAuthenticated) {
      e.preventDefault();
      router.push("/dashboard");
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/80 backdrop-blur-lg border-b border-slate-200 shadow-sm"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-18 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          onClick={handleBrandClick}
          className="flex items-center gap-2 sm:gap-2.5 group"
        >
          <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 shadow-lg shadow-blue-500/25 transition-transform group-hover:scale-105">
            <Sparkles className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-white" />
          </div>
          <span className="font-display font-bold text-lg sm:text-xl text-slate-900">
            PromptSuite
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Desktop CTA / Auth State */}
        <div className="hidden md:flex items-center gap-3">
          {/* GitHub star button */}
          <a
            href="https://github.com/promptsuite"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all"
          >
            <Github className="h-4 w-4" />
            <span>Star</span>
          </a>

          {isLoading ? (
            <NavbarSkeleton />
          ) : isAuthenticated && user ? (
            <>
              <Link href="/dashboard">
                <Button
                  variant="ghost"
                  className="text-sm font-medium text-slate-600 hover:text-slate-900 gap-2"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <UserAvatarDropdown user={user} onLogout={logout} />
            </>
          ) : (
            <>
              <Link href="/login">
                <Button
                  variant="ghost"
                  className="text-sm font-medium text-slate-600 hover:text-slate-900"
                >
                  Sign in
                </Button>
              </Link>
              <Link href="/login">
                <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/25 text-sm font-semibold">
                  Get started
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile: Auth state indicator or menu button */}
        <div className="md:hidden flex items-center gap-2">
          {isLoading ? (
            <NavbarSkeleton />
          ) : isAuthenticated && user ? (
            <div className="flex items-center gap-2">
              <UserAvatarDropdown user={user} onLogout={logout} />
            </div>
          ) : (
            <button
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          )}
        </div>
      </nav>

      {/* Mobile menu - only show for non-authenticated users */}
      {mobileMenuOpen && !isAuthenticated && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 sm:px-6 py-4 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <div className="pt-3 mt-2 border-t border-slate-200 space-y-2">
            <a
              href="https://github.com/promptsuite"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-lg border border-slate-200 hover:bg-slate-50 transition-all"
            >
              <Github className="h-4 w-4" />
              Star on GitHub
            </a>
            <Link href="/login" className="block">
              <Button
                variant="ghost"
                className="w-full justify-center text-slate-600 hover:text-slate-900"
              >
                Sign in
              </Button>
            </Link>
            <Link href="/login" className="block">
              <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white">
                Get started
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
