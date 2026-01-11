"use client";

import { useState } from "react";
import { TopNav } from "@/components/layout/TopNav";
import { AuthGuard } from "@/components/auth/AuthGuard";

// Mock projects for demo
const mockProjects = [
  { id: "1", name: "PromptLayer Clone", type: "github" as const },
  { id: "2", name: "AI Chat App", type: "github" as const },
  { id: "3", name: "Code Assistant", type: "snippet" as const },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentProject, setCurrentProject] = useState(mockProjects[0]);

  const handleProjectChange = (projectId: string) => {
    const project = mockProjects.find((p) => p.id === projectId);
    if (project) {
      setCurrentProject(project);
    }
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-slate-50 light">
        <TopNav
          currentProject={currentProject}
          projects={mockProjects}
          onProjectChange={handleProjectChange}
        />
        <main className="min-h-[calc(100vh-52px)]">
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}
