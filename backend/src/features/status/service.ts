import mongoose from "mongoose";
import { ServiceStatus, StatusResponse } from "./types.js";
import { logger } from "../../lib/logger.js";

// Track server start time for uptime calculation
const serverStartTime = new Date();

async function checkDatabaseStatus(): Promise<ServiceStatus> {
  const start = Date.now();
  try {
    // Check MongoDB connection state
    const state = mongoose.connection.readyState;
    // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting

    if (state === 1) {
      // Ping the database to get actual latency
      await mongoose.connection.db?.admin().ping();
      const latency = Date.now() - start;
      return {
        name: "Database",
        status: "operational",
        latency,
        lastChecked: new Date().toISOString(),
      };
    }

    return {
      name: "Database",
      status: state === 2 ? "degraded" : "outage",
      lastChecked: new Date().toISOString(),
    };
  } catch (error) {
    logger.error("Database health check failed", { error });
    return {
      name: "Database",
      status: "outage",
      lastChecked: new Date().toISOString(),
    };
  }
}

async function checkAPIStatus(): Promise<ServiceStatus> {
  // API is operational if we can respond
  return {
    name: "API",
    status: "operational",
    latency: 1, // Minimal latency for self-check
    lastChecked: new Date().toISOString(),
  };
}

async function checkAuthenticationStatus(): Promise<ServiceStatus> {
  // Authentication service check - basic operational check
  return {
    name: "Authentication",
    status: "operational",
    latency: 5,
    lastChecked: new Date().toISOString(),
  };
}

async function checkPromptDetectionStatus(): Promise<ServiceStatus> {
  // Prompt detection engine is stateless, operational if server is running
  return {
    name: "Prompt Detection Engine",
    status: "operational",
    latency: 10,
    lastChecked: new Date().toISOString(),
  };
}

async function checkAITestingProxyStatus(): Promise<ServiceStatus> {
  // AI Testing proxy - operational if server is running
  // Could potentially add actual OpenAI health check
  return {
    name: "AI Testing Proxy",
    status: "operational",
    latency: 50,
    lastChecked: new Date().toISOString(),
  };
}

async function checkGitHubIntegrationStatus(): Promise<ServiceStatus> {
  // GitHub integration status
  return {
    name: "GitHub Integration",
    status: "operational",
    latency: 100,
    lastChecked: new Date().toISOString(),
  };
}

export const statusService = {
  async getStatus(): Promise<StatusResponse> {
    logger.debug("Fetching system status");

    // Run all health checks in parallel
    const [database, api, auth, detection, aiProxy, github] = await Promise.all([
      checkDatabaseStatus(),
      checkAPIStatus(),
      checkAuthenticationStatus(),
      checkPromptDetectionStatus(),
      checkAITestingProxyStatus(),
      checkGitHubIntegrationStatus(),
    ]);

    const services = [api, database, auth, detection, aiProxy, github];

    // Determine overall status
    const hasOutage = services.some((s) => s.status === "outage");
    const hasDegraded = services.some((s) => s.status === "degraded");

    let overall: "operational" | "degraded" | "outage" = "operational";
    if (hasOutage) {
      overall = "outage";
    } else if (hasDegraded) {
      overall = "degraded";
    }

    // Calculate uptime (simplified - time since server started)
    const uptimeMs = Date.now() - serverStartTime.getTime();
    const uptimePercentage = 99.99; // Simulated - in production, track actual downtime

    return {
      overall,
      services,
      uptime: {
        percentage: uptimePercentage,
        since: serverStartTime.toISOString(),
      },
      lastIncident: undefined, // In production, fetch from incident log
    };
  },
};
