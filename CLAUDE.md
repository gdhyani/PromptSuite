# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**PromptSuite** is an open-source prompt management and testing platform that auto-detects AI prompts from codebases and provides a UI to edit, test, and optimize them without touching code.

## Repository Structure

```
promptshop/
├── frontend/           # Next.js 14 frontend (separate deployment)
├── backend/            # Node.js Express API (separate deployment)
├── packages/
│   └── prompt-detector/  # Shared prompt detection library
└── CLAUDE.md           # This file
```

## Separate Deployments

- **Frontend**: Deployed independently (Vercel, Netlify, etc.)
- **Backend**: Deployed independently (Railway, Render, AWS, etc.)
- Communication via REST API with CORS configuration

## Quick Start (Development)

```bash
# Terminal 1 - Backend
cd backend
pnpm install
pnpm dev  # Runs on http://localhost:4000

# Terminal 2 - Frontend
cd frontend
pnpm install
pnpm dev  # Runs on http://localhost:3000
```

## Architecture Overview

### Data Flow
1. User connects GitHub repo → Backend fetches files via GitHub API
2. `prompt-detector` parses TS/JS files using TypeScript Compiler API
3. Detected OpenAI SDK calls stored in MongoDB (DetectedPrompt)
4. User edits prompts in frontend UI
5. Test execution proxied through backend → OpenAI API
6. Results logged with latency, cost, tokens, HITL feedback

### Detection Patterns (OpenAI SDK)
```typescript
openai.chat.completions.create({
  model: "gpt-4",
  messages: [{ role: "system", content: "..." }],
  tools: [...],
  response_format: { type: "json_schema", ... },
  temperature: 0.7
})
```

### MongoDB Collections
- User, Project, DetectedPrompt, PromptVersion
- TestRun (with observability: latency, cost, tokens)
- PromptTemplate, ReviewQueue, EscalationRule, Analytics

## Cross-Repo Concerns

### API Contract
Backend exposes REST API at `/api/*`. Frontend consumes via TanStack Query.
See `backend/CLAUDE.md` for endpoint documentation.

### Shared Types
Type definitions should be kept in sync between repos. Consider extracting to a shared package if drift becomes an issue.

### Environment Variables
Each repo has its own `.env` file. See individual CLAUDE.md files for details.

## Logging Standards

Both repos use structured JSON logging:
- **Request ID**: Trace requests across frontend → backend
- **User ID**: Associate logs with authenticated user
- **Timestamps**: ISO 8601 format
- **Log Levels**: error, warn, info, debug

## See Also

- `frontend/CLAUDE.md` - Frontend-specific guidance
- `backend/CLAUDE.md` - Backend-specific guidance
