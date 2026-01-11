# PromptSuite

An open-source prompt management and testing platform that auto-detects AI prompts from codebases and provides a UI to edit, test, and optimize them without touching code.

## Features

- **Auto-Detection** - Automatically scan GitHub repositories for OpenAI SDK calls
- **Visual Editor** - Edit prompts with variable substitution and syntax highlighting
- **Testing** - Execute prompts against OpenAI API with real-time streaming
- **Version Control** - Track prompt changes with full version history
- **Analytics** - Monitor costs, latency, and token usage per project
- **Human-in-the-Loop** - Review system for quality gates and approvals
- **Secure Storage** - AES-256 encrypted API key management

## Architecture

```
promptshop/
├── frontend/              # Next.js 14 application
├── backend/               # Express.js API server
├── packages/
│   └── prompt-detector/   # Shared detection library
└── CLAUDE.md              # AI assistant instructions
```

Frontend and backend are deployed independently and communicate via REST API.

## Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **State**: Jotai + TanStack Query
- **Forms**: React Hook Form + Zod

### Backend
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB (Mongoose)
- **Auth**: JWT + GitHub OAuth
- **AI**: OpenAI SDK v4
- **Docs**: Swagger/OpenAPI

## Quick Start

### Prerequisites

- Node.js 18+
- pnpm
- MongoDB instance
- GitHub OAuth App (for authentication)

### Development

```bash
# Clone the repository
git clone https://github.com/your-org/promptshop.git
cd promptshop

# Terminal 1 - Backend
cd backend
pnpm install
cp .env.example .env  # Configure environment variables
pnpm dev              # Runs on http://localhost:4000

# Terminal 2 - Frontend
cd frontend
pnpm install
cp .env.example .env.local  # Configure environment variables
pnpm dev                    # Runs on http://localhost:3000
```

## Environment Variables

### Backend

```env
NODE_ENV=development
PORT=4000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret-key-min-32-chars
JWT_EXPIRES_IN=7d
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
GITHUB_CALLBACK_URL=http://localhost:4000/api/auth/github/callback
FRONTEND_URL=http://localhost:3000
ENCRYPTION_KEY=64-hex-character-key-for-api-key-encryption
OPENAI_API_KEY=sk-...  # Optional: fallback key
```

### Frontend

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_GITHUB_CLIENT_ID=your-github-client-id
NEXT_PUBLIC_APP_ENV=development
```

## Data Flow

```
1. User connects GitHub repo
   ↓
2. Backend fetches files via GitHub API
   ↓
3. Prompt detector analyzes TS/JS files
   ↓
4. Detected OpenAI SDK calls stored in MongoDB
   ↓
5. User edits prompts in frontend UI
   ↓
6. Test execution proxied through backend → OpenAI API
   ↓
7. Results logged with latency, cost, tokens, and feedback
```

## Detection Patterns

The scanner detects OpenAI SDK calls like:

```typescript
openai.chat.completions.create({
  model: "gpt-4",
  messages: [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "Hello, ${name}!" }
  ],
  temperature: 0.7,
  tools: [...],
  response_format: { type: "json_schema", ... }
})
```

Supports variable extraction with `${variable}` and `{variable}` syntax.

## API Endpoints

| Feature | Method | Endpoint |
|---------|--------|----------|
| Health | GET | `/health` |
| Auth | GET | `/api/auth/github` |
| Auth | POST | `/api/auth/pat` |
| Auth | GET | `/api/auth/me` |
| Projects | GET, POST | `/api/projects` |
| Projects | GET, DELETE | `/api/projects/:id` |
| Scan | POST | `/api/projects/:id/scan` |
| Prompts | GET | `/api/prompts/:id` |
| Versions | GET, POST | `/api/prompts/:id/versions` |
| Test | POST | `/api/test` |
| Test Runs | GET | `/api/prompts/:id/runs` |
| Analytics | GET | `/api/projects/:id/analytics` |
| Costs | GET | `/api/projects/:id/costs` |
| Logs | GET | `/api/projects/:id/logs` |
| Settings | GET, POST | `/api/settings/providers` |

API documentation available at `/api/docs` when running the backend.

## Project Structure

### Frontend Routes

- `/login` - GitHub OAuth authentication
- `/dashboard/projects` - Project list and management
- `/dashboard/projects/[id]` - Project details with detected prompts
- `/dashboard/prompts/[promptId]` - Prompt editor and testing
- `/playground` - Quick code paste for detection testing
- `/analytics` - Usage metrics and cost breakdown
- `/logs` - Searchable test run history
- `/settings` - API key and provider configuration

### Backend Modules

- **auth** - GitHub OAuth, PAT, JWT management
- **projects** - Repository connection and scanning
- **prompts** - Detection results and versioning
- **testing** - OpenAI API proxy with streaming
- **analytics** - Metrics aggregation and reporting
- **settings** - Encrypted credential storage

## Database Models

| Collection | Description |
|------------|-------------|
| User | GitHub profile and authentication |
| Project | Connected repositories and scan status |
| DetectedPrompt | Parsed OpenAI SDK calls |
| PromptVersion | Version history for prompts |
| TestRun | Execution results with metrics |
| UserSettings | Encrypted API keys |

## Scripts

### Backend

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Run production build
pnpm lint         # Run ESLint
pnpm format       # Run Prettier
pnpm test         # Run tests
pnpm db:seed      # Seed database
pnpm jobs:analytics  # Run analytics aggregation
```

### Frontend

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Run production build
pnpm lint         # Run ESLint
pnpm format       # Run Prettier
pnpm test         # Run tests
```

## Deployment

### Frontend

Deploy to Vercel, Netlify, or any static hosting:

```bash
cd frontend
pnpm build
# Deploy .next folder
```

### Backend

Deploy to Railway, Render, AWS, or any Node.js host:

```bash
cd backend
pnpm build
pnpm start
```

Ensure environment variables are configured and MongoDB is accessible.

## Security

- JWT-based authentication with configurable expiry
- GitHub OAuth 2.0 for user authentication
- API keys encrypted with AES-256 at rest
- Helmet.js for HTTP security headers
- Rate limiting on all endpoints
- CORS configuration per environment
- Zod validation at API boundaries

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source. See the LICENSE file for details.

## Support

- [GitHub Issues](https://github.com/your-org/promptshop/issues) - Bug reports and feature requests
- [Documentation](./docs) - Additional guides and references

---

Built with TypeScript, Next.js, Express, and MongoDB.
