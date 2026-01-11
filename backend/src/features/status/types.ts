export interface ServiceStatus {
  name: string;
  status: "operational" | "degraded" | "outage";
  latency?: number;
  lastChecked: string;
}

export interface StatusResponse {
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
