import axios from "axios";
import { env } from "../../../config/env.js";
import type { GitHubUser, GitHubTokenResponse } from "../types.js";

const GITHUB_OAUTH_URL = "https://github.com/login/oauth/authorize";
const GITHUB_TOKEN_URL = "https://github.com/login/oauth/access_token";
const GITHUB_API_URL = "https://api.github.com";

export function getGitHubAuthUrl(): string {
  const params = new URLSearchParams({
    client_id: env.GITHUB_CLIENT_ID,
    redirect_uri: env.GITHUB_CALLBACK_URL,
    scope: "read:user user:email repo",
  });
  return `${GITHUB_OAUTH_URL}?${params.toString()}`;
}

export async function exchangeCodeForToken(code: string): Promise<string> {
  const response = await axios.post<GitHubTokenResponse>(
    GITHUB_TOKEN_URL,
    {
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: env.GITHUB_CALLBACK_URL,
    },
    {
      headers: {
        Accept: "application/json",
      },
    }
  );

  return response.data.access_token;
}

export async function getGitHubUser(accessToken: string): Promise<GitHubUser> {
  const response = await axios.get<GitHubUser>(`${GITHUB_API_URL}/user`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  // Get primary email if not public
  if (!response.data.email) {
    const emailsResponse = await axios.get<Array<{ email: string; primary: boolean }>>(
      `${GITHUB_API_URL}/user/emails`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const primaryEmail = emailsResponse.data.find((e) => e.primary);
    if (primaryEmail) {
      response.data.email = primaryEmail.email;
    }
  }

  return response.data;
}

export async function validatePat(token: string): Promise<GitHubUser> {
  return getGitHubUser(token);
}
