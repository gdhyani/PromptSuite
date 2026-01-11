"use client";

import { useState } from "react";
import Link from "next/link";
import type { Route } from "next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronRight,
  Key,
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
  Save,
  Trash2,
  ExternalLink,
  Sparkles,
  Bot,
  Server,
  Settings,
  User,
  Shield,
  Bell,
  Palette,
  Code2,
  Github,
  Globe,
  Zap,
  Lock,
  Unlock,
} from "lucide-react";
import { toast } from "sonner";

// AI Providers configuration
const providers = [
  {
    id: "openai",
    name: "OpenAI",
    description: "GPT-4o, GPT-4-Turbo, GPT-3.5-Turbo models",
    icon: Sparkles,
    color: "text-emerald-500",
    bgColor: "bg-emerald-50",
    docsUrl: "https://platform.openai.com/api-keys",
    placeholder: "sk-...",
    configured: true,
    maskedKey: "sk-****************************1234",
    models: ["gpt-4o", "gpt-4-turbo", "gpt-4", "gpt-3.5-turbo"],
  },
  {
    id: "anthropic",
    name: "Anthropic",
    description: "Claude 3.5 Sonnet, Claude 3 Opus, Haiku models",
    icon: Bot,
    color: "text-amber-500",
    bgColor: "bg-amber-50",
    docsUrl: "https://console.anthropic.com/settings/keys",
    placeholder: "sk-ant-...",
    configured: false,
    maskedKey: "",
    models: ["claude-3.5-sonnet", "claude-3-opus", "claude-3-haiku"],
  },
  {
    id: "custom",
    name: "Custom Endpoint",
    description: "Self-hosted LLMs, Ollama, or proxy endpoints",
    icon: Server,
    color: "text-violet-500",
    bgColor: "bg-violet-50",
    docsUrl: "",
    placeholder: "Your API key",
    configured: false,
    maskedKey: "",
    models: [],
  },
];

// Settings sections
const settingsSections = [
  { id: "providers", label: "AI Providers", icon: Zap },
  { id: "defaults", label: "Default Settings", icon: Settings },
  { id: "account", label: "Account", icon: User },
  { id: "security", label: "Security", icon: Shield },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("providers");
  const [editingProvider, setEditingProvider] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [customEndpoint, setCustomEndpoint] = useState("");

  const handleSave = (providerId: string) => {
    if (!apiKey.trim()) {
      toast.error("Please enter an API key");
      return;
    }
    toast.success(`${providerId} API key saved successfully`);
    setEditingProvider(null);
    setApiKey("");
    setShowKey(false);
  };

  const handleDelete = (providerId: string) => {
    toast.success(`${providerId} API key removed`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Header */}
      <div className="h-14 border-b border-slate-200 flex items-center justify-between px-6 bg-white">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-sm text-slate-500">
            <Link href="/dashboard" as={"/dashboard" as Route} className="hover:text-slate-900 transition-colors">
              Dashboard
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
          </div>
          <h1 className="text-sm font-medium text-slate-900">Settings</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex">
        {/* Sidebar */}
        <div className="w-56 border-r border-slate-200 p-4 bg-white">
          <div className="space-y-1">
            {settingsSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                  activeSection === section.id
                    ? "bg-slate-100 text-slate-900"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                }`}
              >
                <section.icon className="h-4 w-4" />
                <span>{section.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 max-w-3xl">
          {/* AI Providers Section */}
          {activeSection === "providers" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 mb-1">AI Providers</h2>
                <p className="text-sm text-slate-500">
                  Configure API keys for AI providers. Keys are encrypted and securely stored.
                </p>
              </div>

              <div className="space-y-3">
                {providers.map((provider) => (
                  <div
                    key={provider.id}
                    className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-lg ${provider.bgColor}`}>
                          <provider.icon className={`h-5 w-5 ${provider.color}`} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-medium text-slate-800">{provider.name}</h3>
                            {provider.configured ? (
                              <Badge className="text-[10px] bg-emerald-50 text-emerald-600 border-0">
                                <CheckCircle2 className="h-2.5 w-2.5 mr-1" />
                                Connected
                              </Badge>
                            ) : (
                              <Badge variant="secondary" className="text-[10px] bg-slate-100 text-slate-500 border-0">
                                Not configured
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">{provider.description}</p>
                        </div>
                      </div>
                      {provider.docsUrl && (
                        <a
                          href={provider.docsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-slate-500 hover:text-slate-700 transition-colors flex items-center gap-1"
                        >
                          Get API Key
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>

                    {editingProvider === provider.id ? (
                      <div className="space-y-4 pt-3 border-t border-slate-100">
                        <div className="space-y-2">
                          <Label className="text-xs text-slate-600">API Key</Label>
                          <div className="relative">
                            <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input
                              type={showKey ? "text" : "password"}
                              placeholder={provider.placeholder}
                              value={apiKey}
                              onChange={(e) => setApiKey(e.target.value)}
                              className="pl-10 pr-10 h-9 font-mono text-xs bg-slate-50 border-slate-200 text-slate-800"
                            />
                            <button
                              type="button"
                              onClick={() => setShowKey(!showKey)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                            >
                              {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>

                        {provider.id === "custom" && (
                          <div className="space-y-2">
                            <Label className="text-xs text-slate-600">Endpoint URL</Label>
                            <Input
                              type="url"
                              placeholder="https://your-api.example.com/v1"
                              value={customEndpoint}
                              onChange={(e) => setCustomEndpoint(e.target.value)}
                              className="h-9 font-mono text-xs bg-slate-50 border-slate-200 text-slate-800"
                            />
                          </div>
                        )}

                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleSave(provider.id)}
                            className="h-8 gap-2 bg-slate-900 text-white hover:bg-slate-800"
                          >
                            <Save className="h-3.5 w-3.5" />
                            Save Key
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 text-slate-500 hover:text-slate-700"
                            onClick={() => {
                              setEditingProvider(null);
                              setApiKey("");
                              setShowKey(false);
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                        {provider.configured ? (
                          <>
                            <div className="flex items-center gap-2">
                              <Lock className="h-3.5 w-3.5 text-slate-400" />
                              <code className="text-xs font-mono text-slate-500">
                                {provider.maskedKey}
                              </code>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 text-xs text-slate-500 hover:text-slate-700"
                                onClick={() => {
                                  setEditingProvider(provider.id);
                                  setApiKey("");
                                }}
                              >
                                Update
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 text-xs text-rose-500 hover:text-rose-600 hover:bg-rose-50"
                                onClick={() => handleDelete(provider.id)}
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 text-xs gap-2 text-slate-500 hover:text-slate-700"
                            onClick={() => setEditingProvider(provider.id)}
                          >
                            <Key className="h-3.5 w-3.5" />
                            Add API Key
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Default Settings Section */}
          {activeSection === "defaults" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 mb-1">Default Settings</h2>
                <p className="text-sm text-slate-500">
                  Configure default values for prompt testing and execution.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm space-y-4">
                <h3 className="text-sm font-medium text-slate-800">Model Configuration</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs text-slate-600">Default Model</Label>
                    <Select defaultValue="gpt-4o">
                      <SelectTrigger className="h-9 bg-slate-50 border-slate-200 text-slate-700 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-slate-200">
                        <SelectItem value="gpt-4o">gpt-4o</SelectItem>
                        <SelectItem value="gpt-4-turbo">gpt-4-turbo</SelectItem>
                        <SelectItem value="gpt-4">gpt-4</SelectItem>
                        <SelectItem value="gpt-3.5-turbo">gpt-3.5-turbo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-slate-600">Temperature</Label>
                    <Input
                      type="number"
                      defaultValue="0.7"
                      step="0.1"
                      min="0"
                      max="2"
                      className="h-9 font-mono text-xs bg-slate-50 border-slate-200 text-slate-800"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-slate-600">Max Tokens</Label>
                    <Input
                      type="number"
                      defaultValue="2048"
                      className="h-9 font-mono text-xs bg-slate-50 border-slate-200 text-slate-800"
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm space-y-4">
                <h3 className="text-sm font-medium text-slate-800">Playground Defaults</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs text-slate-600">Response Format</Label>
                    <Select defaultValue="text">
                      <SelectTrigger className="h-9 bg-slate-50 border-slate-200 text-slate-700 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-slate-200">
                        <SelectItem value="text">Text</SelectItem>
                        <SelectItem value="json">JSON Object</SelectItem>
                        <SelectItem value="markdown">Markdown</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-slate-600">Streaming</Label>
                    <Select defaultValue="enabled">
                      <SelectTrigger className="h-9 bg-slate-50 border-slate-200 text-slate-700 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-slate-200">
                        <SelectItem value="enabled">Enabled</SelectItem>
                        <SelectItem value="disabled">Disabled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button size="sm" className="h-8 gap-2 bg-slate-900 text-white hover:bg-slate-800">
                  <Save className="h-3.5 w-3.5" />
                  Save Changes
                </Button>
              </div>
            </div>
          )}

          {/* Account Section */}
          {activeSection === "account" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 mb-1">Account</h2>
                <p className="text-sm text-slate-500">
                  Manage your account information and preferences.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white text-lg font-semibold">
                    JD
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-slate-800">John Doe</h3>
                    <p className="text-xs text-slate-500 mt-0.5">john@example.com</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className="text-[10px] bg-slate-100 text-slate-600 border-0 gap-1">
                        <Github className="h-2.5 w-2.5" />
                        GitHub Connected
                      </Badge>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="h-8 text-xs text-slate-600 border-slate-200">
                    Edit Profile
                  </Button>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm space-y-4">
                <h3 className="text-sm font-medium text-slate-800">Connected Accounts</h3>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-slate-100">
                      <Github className="h-4 w-4 text-slate-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-700">GitHub</p>
                      <p className="text-xs text-slate-500">johndoe</p>
                    </div>
                  </div>
                  <Badge className="text-[10px] bg-emerald-50 text-emerald-600 border-0">
                    Connected
                  </Badge>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-rose-200 bg-rose-50">
                <h3 className="text-sm font-medium text-rose-700 mb-2">Danger Zone</h3>
                <p className="text-xs text-slate-600 mb-4">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <Button variant="ghost" size="sm" className="h-8 text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-100">
                  Delete Account
                </Button>
              </div>
            </div>
          )}

          {/* Security Section */}
          {activeSection === "security" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 mb-1">Security</h2>
                <p className="text-sm text-slate-500">
                  Manage security settings and access controls.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm space-y-4">
                <h3 className="text-sm font-medium text-slate-800">API Key Storage</h3>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm text-slate-700">Local Storage Only</p>
                    <p className="text-xs text-slate-500">API keys are stored in your browser only</p>
                  </div>
                  <Badge className="text-[10px] bg-emerald-50 text-emerald-600 border-0">
                    <Lock className="h-2.5 w-2.5 mr-1" />
                    Enabled
                  </Badge>
                </div>
                <div className="flex items-center justify-between py-2 border-t border-slate-100">
                  <div>
                    <p className="text-sm text-slate-700">Server-side Encryption</p>
                    <p className="text-xs text-slate-500">Optional: Sync encrypted keys across devices</p>
                  </div>
                  <Badge variant="secondary" className="text-[10px] bg-slate-100 text-slate-500 border-0">
                    Disabled
                  </Badge>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm space-y-4">
                <h3 className="text-sm font-medium text-slate-800">Session</h3>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm text-slate-700">Active Sessions</p>
                    <p className="text-xs text-slate-500">You're logged in on 1 device</p>
                  </div>
                  <Button variant="ghost" size="sm" className="h-7 text-xs text-slate-500 hover:text-slate-700">
                    Manage Sessions
                  </Button>
                </div>
                <div className="flex items-center justify-between py-2 border-t border-slate-100">
                  <div>
                    <p className="text-sm text-slate-700">Session Timeout</p>
                    <p className="text-xs text-slate-500">Auto-logout after inactivity</p>
                  </div>
                  <Select defaultValue="7d">
                    <SelectTrigger className="h-8 w-32 bg-slate-50 border-slate-200 text-slate-700 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-slate-200">
                      <SelectItem value="1d">1 day</SelectItem>
                      <SelectItem value="7d">7 days</SelectItem>
                      <SelectItem value="30d">30 days</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
