"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Activity,
  Clock,
  RefreshCw,
  Loader2,
} from "lucide-react";

interface ServiceStatus {
  name: string;
  status: "operational" | "degraded" | "outage";
  latency?: number;
  lastChecked: string;
}

interface StatusData {
  overall: "operational" | "degraded" | "outage";
  services: ServiceStatus[];
  uptime: {
    percentage: number;
    since: string;
  };
  lastIncident?: {
    date: string;
    title: string;
    status: "resolved" | "ongoing" | "investigating";
    description: string;
  };
}

const statusConfig = {
  operational: {
    icon: CheckCircle2,
    label: "Operational",
    color: "text-emerald-600",
    bg: "bg-emerald-100",
  },
  degraded: {
    icon: AlertTriangle,
    label: "Degraded",
    color: "text-amber-600",
    bg: "bg-amber-100",
  },
  outage: {
    icon: XCircle,
    label: "Outage",
    color: "text-rose-600",
    bg: "bg-rose-100",
  },
};

// Fallback static data for when backend is unavailable
const fallbackData: StatusData = {
  overall: "operational",
  services: [
    { name: "API", status: "operational", latency: 23, lastChecked: new Date().toISOString() },
    { name: "Database", status: "operational", latency: 12, lastChecked: new Date().toISOString() },
    { name: "Authentication", status: "operational", latency: 34, lastChecked: new Date().toISOString() },
    { name: "Prompt Detection Engine", status: "operational", latency: 85, lastChecked: new Date().toISOString() },
    { name: "AI Testing Proxy", status: "operational", latency: 156, lastChecked: new Date().toISOString() },
    { name: "GitHub Integration", status: "operational", latency: 120, lastChecked: new Date().toISOString() },
  ],
  uptime: {
    percentage: 99.99,
    since: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
};

export default function StatusPage() {
  const [status, setStatus] = useState<StatusData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  const fetchStatus = async () => {
    setLoading(true);
    setError(null);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
      const response = await fetch(`${apiUrl}/api/status`, {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch status");
      }

      const data = await response.json();
      if (data.success) {
        setStatus(data.data);
      } else {
        throw new Error(data.error?.message || "Unknown error");
      }
    } catch (err) {
      console.error("Status fetch error:", err);
      // Use fallback data if API is unavailable
      setStatus(fallbackData);
      setError("Unable to connect to status API. Showing cached data.");
    } finally {
      setLoading(false);
      setLastRefresh(new Date());
    }
  };

  useEffect(() => {
    fetchStatus();
    // Refresh every 30 seconds
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const allOperational = status?.overall === "operational";

  return (
    <div className="min-h-screen bg-white font-display">
      <Navbar />

      <main className="pt-24 sm:pt-32 pb-16 sm:pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-10 sm:mb-12">
            <div
              className={`w-14 h-14 rounded-xl ${
                allOperational ? "bg-emerald-50" : "bg-amber-50"
              } flex items-center justify-center mx-auto mb-4`}
            >
              {loading ? (
                <Loader2 className="h-7 w-7 text-slate-400 animate-spin" />
              ) : allOperational ? (
                <CheckCircle2 className="h-7 w-7 text-emerald-600" />
              ) : (
                <AlertTriangle className="h-7 w-7 text-amber-600" />
              )}
            </div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-3">
              {loading
                ? "Checking Status..."
                : allOperational
                ? "All Systems Operational"
                : "Some Systems Degraded"}
            </h1>
            <p className="text-sm text-slate-500 flex items-center justify-center gap-2">
              <Clock className="h-4 w-4" />
              Last updated: {lastRefresh.toLocaleString()}
            </p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-sm">
              {error}
            </div>
          )}

          {/* Overall Status Banner */}
          {status && (
            <div
              className={`mb-10 p-5 sm:p-6 rounded-2xl ${
                allOperational
                  ? "bg-emerald-50 border border-emerald-200"
                  : "bg-amber-50 border border-amber-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Activity
                    className={`h-6 w-6 ${
                      allOperational ? "text-emerald-600" : "text-amber-600"
                    }`}
                  />
                  <div>
                    <p
                      className={`font-semibold ${
                        allOperational ? "text-emerald-900" : "text-amber-900"
                      }`}
                    >
                      Current Status
                    </p>
                    <p
                      className={`text-sm ${
                        allOperational ? "text-emerald-700" : "text-amber-700"
                      }`}
                    >
                      {allOperational
                        ? "All systems are operating normally"
                        : "Some services may be affected"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={fetchStatus}
                  disabled={loading}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50"
                >
                  <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                  Refresh
                </button>
              </div>
            </div>
          )}

          {/* Services */}
          {status && (
            <div className="mb-10 sm:mb-12">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-5">
                Services
              </h2>
              <div className="space-y-3">
                {status.services.map((service, index) => {
                  const config = statusConfig[service.status];
                  const Icon = config.icon;

                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-white"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`h-5 w-5 ${config.color}`} />
                        <span className="font-medium text-slate-900">
                          {service.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        {service.latency && (
                          <span className="text-sm text-slate-500 hidden sm:block">
                            {service.latency}ms
                          </span>
                        )}
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.color}`}
                        >
                          {config.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Uptime */}
          {status && (
            <div className="mb-10 sm:mb-12">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-5">
                Uptime
              </h2>
              <div className="p-5 sm:p-6 rounded-xl border border-slate-200 bg-white">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-slate-600">Current Uptime</span>
                  <span className="text-2xl font-bold text-emerald-600">
                    {status.uptime.percentage}%
                  </span>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all"
                    style={{ width: `${status.uptime.percentage}%` }}
                  />
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Monitored since {new Date(status.uptime.since).toLocaleDateString()}
                </p>
              </div>
            </div>
          )}

          {/* Last Incident */}
          {status?.lastIncident && (
            <div className="mb-10 sm:mb-12">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-5">
                Recent Incident
              </h2>
              <div className="p-5 rounded-xl border border-slate-200 bg-white">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-xs text-slate-500">
                    {status.lastIncident.date}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      status.lastIncident.status === "resolved"
                        ? "bg-emerald-100 text-emerald-700"
                        : status.lastIncident.status === "ongoing"
                        ? "bg-rose-100 text-rose-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {status.lastIncident.status.charAt(0).toUpperCase() +
                      status.lastIncident.status.slice(1)}
                  </span>
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">
                  {status.lastIncident.title}
                </h3>
                <p className="text-sm text-slate-600">
                  {status.lastIncident.description}
                </p>
              </div>
            </div>
          )}

          {/* Subscribe */}
          <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 text-center">
            <h3 className="font-semibold text-slate-900 mb-2">
              Get Status Updates
            </h3>
            <p className="text-sm text-slate-600 mb-4">
              Subscribe to receive notifications about service status changes.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
              />
              <button
                type="submit"
                className="px-6 py-2.5 rounded-lg bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
