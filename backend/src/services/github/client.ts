import axios from "axios";
import { logger } from "../../lib/logger.js";

const GITHUB_API = "https://api.github.com";

interface RepoFile {
  path: string;
  type: "file" | "dir";
  sha: string;
}

function parseGitHubUrl(url: string): { owner: string; repo: string } {
  // Handle: https://github.com/owner/repo or github.com/owner/repo
  const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
  if (!match) {
    throw new Error("Invalid GitHub URL");
  }
  return { owner: match[1], repo: match[2].replace(/\.git$/, "") };
}

export const githubService = {
  async getRepoFiles(
    repoUrl: string,
    branch: string,
    accessToken: string
  ): Promise<RepoFile[]> {
    const { owner, repo } = parseGitHubUrl(repoUrl);
    logger.debug("Fetching repo tree", { owner, repo, branch });

    try {
      const response = await axios.get(
        `${GITHUB_API}/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/vnd.github.v3+json",
          },
        }
      );

      return response.data.tree
        .filter((item: any) => item.type === "blob")
        .map((item: any) => ({
          path: item.path,
          type: "file",
          sha: item.sha,
        }));
    } catch (error: any) {
      logger.error("Failed to fetch repo tree", { error: error.message });
      throw error;
    }
  },

  async getFileContent(
    repoUrl: string,
    filePath: string,
    branch: string,
    accessToken: string
  ): Promise<string> {
    const { owner, repo } = parseGitHubUrl(repoUrl);

    const response = await axios.get(
      `${GITHUB_API}/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    // Content is base64 encoded
    return Buffer.from(response.data.content, "base64").toString("utf-8");
  },

  async listUserRepos(accessToken: string) {
    const response = await axios.get(`${GITHUB_API}/user/repos?sort=updated&per_page=100`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    return response.data.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      fullName: repo.full_name,
      description: repo.description,
      url: repo.html_url,
      defaultBranch: repo.default_branch,
      private: repo.private,
      updatedAt: repo.updated_at,
    }));
  },

  async getLatestCommitSha(
    repoUrl: string,
    branch: string,
    accessToken: string
  ): Promise<string> {
    const { owner, repo } = parseGitHubUrl(repoUrl);

    try {
      const response = await axios.get(
        `${GITHUB_API}/repos/${owner}/${repo}/commits/${branch}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/vnd.github.v3+json",
          },
        }
      );

      return response.data.sha;
    } catch (error: any) {
      logger.error("Failed to fetch latest commit", { error: error.message });
      throw error;
    }
  },
};
