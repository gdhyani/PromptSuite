"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Route } from "next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ChevronRight,
  Github,
  Code2,
  ArrowLeft,
  Loader2,
  FolderKanban,
  GitBranch,
  FileCode,
  Link as LinkIcon,
  Sparkles,
  Search,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { useCreateProject } from "@/features/projects/hooks/useProjects";
import { toast } from "sonner";

export default function NewProjectPage() {
  const router = useRouter();
  const createProject = useCreateProject();

  const [projectType, setProjectType] = useState<"github" | "snippet">("github");

  // GitHub form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [branch, setBranch] = useState("main");

  // Snippet form state
  const [snippetName, setSnippetName] = useState("");
  const [snippetDescription, setSnippetDescription] = useState("");
  const [code, setCode] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (projectType === "github") {
      if (!name.trim() || !githubUrl.trim()) {
        toast.error("Please fill in all required fields");
        return;
      }
    } else {
      if (!snippetName.trim() || !code.trim()) {
        toast.error("Please fill in all required fields");
        return;
      }
    }

    try {
      const project = await createProject.mutateAsync({
        type: projectType,
        name: projectType === "github" ? name : snippetName,
        description: projectType === "github" ? description : snippetDescription,
        githubUrl: projectType === "github" ? githubUrl : undefined,
        branch: projectType === "github" ? branch : undefined,
        code: projectType === "snippet" ? code : undefined,
      });

      toast.success("Project created successfully!");
      router.push(`/dashboard/projects/${project.id}` as Route);
    } catch (error) {
      toast.error("Failed to create project. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0b]">
      {/* Header */}
      <div className="h-14 border-b border-zinc-800/60 flex items-center justify-between px-6 bg-[#0f0f10]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-sm text-zinc-500">
            <Link href="/dashboard" as={"/dashboard" as Route} className="hover:text-zinc-300 transition-colors">
              Dashboard
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/dashboard/projects" as={"/dashboard/projects" as Route} className="hover:text-zinc-300 transition-colors">
              Projects
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
          </div>
          <h1 className="text-sm font-medium text-zinc-100">New Project</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        <div className="max-w-2xl mx-auto">
          {/* Back Link */}
          <Link
            href={"/dashboard/projects" as Route}
            className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to projects
          </Link>

          {/* Header Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-zinc-100 mb-2">Create New Project</h2>
            <p className="text-sm text-zinc-500">
              Connect a GitHub repository or paste code directly to detect AI prompts.
            </p>
          </div>

          {/* Project Type Selection */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            <button
              type="button"
              onClick={() => setProjectType("github")}
              className={`p-4 rounded-lg border text-left transition-all ${
                projectType === "github"
                  ? "border-blue-500/50 bg-blue-500/10"
                  : "border-zinc-800/60 bg-zinc-900/30 hover:border-zinc-700"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-lg ${projectType === "github" ? "bg-blue-500/20" : "bg-zinc-800"}`}>
                  <Github className={`h-5 w-5 ${projectType === "github" ? "text-blue-400" : "text-zinc-400"}`} />
                </div>
                <div>
                  <h3 className={`text-sm font-medium ${projectType === "github" ? "text-zinc-100" : "text-zinc-300"}`}>
                    GitHub Repository
                  </h3>
                </div>
              </div>
              <p className="text-xs text-zinc-500">
                Connect a repo to scan for AI prompts
              </p>
            </button>

            <button
              type="button"
              onClick={() => setProjectType("snippet")}
              className={`p-4 rounded-lg border text-left transition-all ${
                projectType === "snippet"
                  ? "border-emerald-500/50 bg-emerald-500/10"
                  : "border-zinc-800/60 bg-zinc-900/30 hover:border-zinc-700"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-lg ${projectType === "snippet" ? "bg-emerald-500/20" : "bg-zinc-800"}`}>
                  <Code2 className={`h-5 w-5 ${projectType === "snippet" ? "text-emerald-400" : "text-zinc-400"}`} />
                </div>
                <div>
                  <h3 className={`text-sm font-medium ${projectType === "snippet" ? "text-zinc-100" : "text-zinc-300"}`}>
                    Code Snippet
                  </h3>
                </div>
              </div>
              <p className="text-xs text-zinc-500">
                Paste code directly for quick testing
              </p>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="p-6 rounded-lg border border-zinc-800/60 bg-zinc-900/30 space-y-5">
              {projectType === "github" ? (
                <>
                  {/* GitHub Form */}
                  <div className="space-y-2">
                    <Label className="text-xs text-zinc-400">
                      Project Name <span className="text-rose-400">*</span>
                    </Label>
                    <div className="relative">
                      <FolderKanban className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
                      <Input
                        placeholder="My AI Project"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="pl-10 h-10 bg-zinc-900/50 border-zinc-800 text-zinc-200 placeholder:text-zinc-600"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs text-zinc-400">Description</Label>
                    <Textarea
                      placeholder="Brief description of your project..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="min-h-[80px] bg-zinc-900/50 border-zinc-800 text-zinc-200 placeholder:text-zinc-600 resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs text-zinc-400">
                      GitHub Repository URL <span className="text-rose-400">*</span>
                    </Label>
                    <div className="relative">
                      <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
                      <Input
                        placeholder="https://github.com/username/repo"
                        value={githubUrl}
                        onChange={(e) => setGithubUrl(e.target.value)}
                        className="pl-10 h-10 font-mono text-sm bg-zinc-900/50 border-zinc-800 text-zinc-200 placeholder:text-zinc-600"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs text-zinc-400">Branch</Label>
                    <div className="relative">
                      <GitBranch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
                      <Input
                        placeholder="main"
                        value={branch}
                        onChange={(e) => setBranch(e.target.value)}
                        className="pl-10 h-10 font-mono text-sm bg-zinc-900/50 border-zinc-800 text-zinc-200 placeholder:text-zinc-600"
                      />
                    </div>
                    <p className="text-[11px] text-zinc-600">
                      Default: main. Change to scan a different branch.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  {/* Snippet Form */}
                  <div className="space-y-2">
                    <Label className="text-xs text-zinc-400">
                      Snippet Name <span className="text-rose-400">*</span>
                    </Label>
                    <div className="relative">
                      <FileCode className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
                      <Input
                        placeholder="Chat Completion Code"
                        value={snippetName}
                        onChange={(e) => setSnippetName(e.target.value)}
                        className="pl-10 h-10 bg-zinc-900/50 border-zinc-800 text-zinc-200 placeholder:text-zinc-600"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs text-zinc-400">Description</Label>
                    <Textarea
                      placeholder="Brief description of your code..."
                      value={snippetDescription}
                      onChange={(e) => setSnippetDescription(e.target.value)}
                      className="min-h-[80px] bg-zinc-900/50 border-zinc-800 text-zinc-200 placeholder:text-zinc-600 resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs text-zinc-400">
                      Code <span className="text-rose-400">*</span>
                    </Label>
                    <Textarea
                      placeholder={`// Paste your TypeScript/JavaScript code here
const response = await openai.chat.completions.create({
  model: "gpt-4",
  messages: [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: userMessage }
  ],
  temperature: 0.7
});`}
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="min-h-[200px] font-mono text-xs bg-zinc-900/50 border-zinc-800 text-zinc-200 placeholder:text-zinc-600 resize-none"
                    />
                    <p className="text-[11px] text-zinc-600">
                      Paste TypeScript/JavaScript code containing OpenAI SDK calls.
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* What happens next */}
            <div className="mt-6 p-4 rounded-lg border border-zinc-800/40 bg-zinc-900/20">
              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-md bg-violet-500/10">
                  <Sparkles className="h-4 w-4 text-violet-400" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-zinc-300 mb-1">What happens next</h4>
                  <ul className="space-y-1">
                    <li className="flex items-center gap-2 text-xs text-zinc-500">
                      <Search className="h-3 w-3" />
                      We'll scan your code for AI prompt patterns
                    </li>
                    <li className="flex items-center gap-2 text-xs text-zinc-500">
                      <FileCode className="h-3 w-3" />
                      Detected prompts will be extracted with file locations
                    </li>
                    <li className="flex items-center gap-2 text-xs text-zinc-500">
                      <CheckCircle2 className="h-3 w-3" />
                      You can then edit, test, and optimize each prompt
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-zinc-800/60">
              <Link href={"/dashboard/projects" as Route}>
                <Button type="button" variant="ghost" className="h-9 text-zinc-500 hover:text-zinc-300">
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                disabled={createProject.isPending}
                className="h-9 gap-2 bg-white text-black hover:bg-zinc-200"
              >
                {createProject.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    Create Project
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
