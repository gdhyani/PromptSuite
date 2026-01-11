export interface CreateProjectInput {
  type: "github" | "snippet";
  name: string;
  description?: string;
  githubUrl?: string;
  branch?: string;
  code?: string;
}

export interface ProjectResponse {
  id: string;
  type: "github" | "snippet";
  name: string;
  description: string;
  githubUrl: string | null;
  branch: string;
  lastScanned: string | null;
  lastCommitSha: string | null;
  promptCount: number;
  createdAt: string;
  updatedAt: string;
}
