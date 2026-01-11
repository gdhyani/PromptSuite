import { User } from "../../models/User.js";
import { logger } from "../../lib/logger.js";
import { UnauthorizedError } from "../../lib/errors.js";
import { generateToken } from "./utils/jwt.js";
import { exchangeCodeForToken, getGitHubUser, validatePat } from "./utils/oauth.js";
import type { AuthResponse } from "./types.js";

export const authService = {
  async handleGitHubCallback(code: string): Promise<AuthResponse> {
    logger.debug("authService.handleGitHubCallback", { code: code.substring(0, 8) + "..." });

    // Exchange code for access token
    const accessToken = await exchangeCodeForToken(code);

    // Get GitHub user info
    const githubUser = await getGitHubUser(accessToken);

    // Find or create user
    let user = await User.findOne({ githubId: String(githubUser.id) });

    if (user) {
      // Update existing user
      user.email = githubUser.email;
      user.name = githubUser.name || githubUser.login;
      user.avatarUrl = githubUser.avatar_url;
      user.accessToken = accessToken;
      await user.save();
      logger.info("User logged in", { userId: user._id, githubId: user.githubId });
    } else {
      // Create new user
      user = await User.create({
        githubId: String(githubUser.id),
        email: githubUser.email,
        name: githubUser.name || githubUser.login,
        avatarUrl: githubUser.avatar_url,
        accessToken,
      });
      logger.info("User created", { userId: user._id, githubId: user.githubId });
    }

    const token = generateToken(user._id.toString());

    return {
      token,
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
    };
  },

  async handlePatAuth(pat: string): Promise<AuthResponse> {
    logger.debug("authService.handlePatAuth");

    try {
      // Validate PAT by fetching user info
      const githubUser = await validatePat(pat);

      // Find or create user
      let user = await User.findOne({ githubId: String(githubUser.id) });

      if (user) {
        user.accessToken = pat;
        await user.save();
        logger.info("User logged in with PAT", { userId: user._id });
      } else {
        user = await User.create({
          githubId: String(githubUser.id),
          email: githubUser.email,
          name: githubUser.name || githubUser.login,
          avatarUrl: githubUser.avatar_url,
          accessToken: pat,
        });
        logger.info("User created with PAT", { userId: user._id });
      }

      const token = generateToken(user._id.toString());

      return {
        token,
        user: {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          avatarUrl: user.avatarUrl,
        },
      };
    } catch (error) {
      logger.warn("Invalid PAT provided", { error });
      throw new UnauthorizedError("Invalid personal access token");
    }
  },

  async getCurrentUser(userId: string) {
    const user = await User.findById(userId).select("-accessToken");
    if (!user) {
      throw new UnauthorizedError("User not found");
    }

    return {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      avatarUrl: user.avatarUrl,
    };
  },
};
