# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

PromptSuite Backend - Node.js Express API for prompt detection, management, testing, and analytics.

## Commands

```bash
pnpm install          # Install dependencies
pnpm dev              # Development with hot reload (http://localhost:4000)
pnpm build            # Compile TypeScript
pnpm start            # Start production server
pnpm lint             # Run ESLint
pnpm lint:fix         # Fix ESLint issues
pnpm format           # Format with Prettier
pnpm test             # Run tests
pnpm test:watch       # Run tests in watch mode
pnpm test:coverage    # Run tests with coverage
pnpm db:seed          # Seed development database
pnpm jobs:analytics   # Run analytics aggregation job manually
```

## Tech Stack

- **Framework**: Express.js with TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Auth**: JWT + GitHub OAuth
- **Validation**: Zod
- **Logging**: Pino (structured JSON)
- **AI SDKs**: OpenAI (expandable to others)
- **Code Parsing**: TypeScript Compiler API

## Project Structure

```
src/
├── app.ts                        # Express app setup
├── server.ts                     # Server entry point
├── config/
│   ├── index.ts                  # Config loader
│   ├── database.ts               # MongoDB connection
│   ├── cors.ts                   # CORS config
│   └── env.ts                    # Environment validation (Zod)
│
├── middleware/
│   ├── auth.ts                   # JWT verification
│   ├── requestId.ts              # Request ID injection
│   ├── logger.ts                 # Request/response logging
│   ├── errorHandler.ts           # Global error handler
│   ├── validate.ts               # Zod validation middleware
│   └── rateLimit.ts              # Rate limiting
│
├── features/                     # Feature-based modules
│   ├── auth/
│   │   ├── routes.ts
│   │   ├── controller.ts
│   │   ├── service.ts
│   │   ├── types.ts
│   │   ├── utils/
│   │   │   ├── jwt.ts
│   │   │   └── oauth.ts
│   │   ├── constants/
│   │   │   └── index.ts
│   │   └── validation.ts         # Zod schemas
│   │
│   ├── projects/
│   │   ├── routes.ts
│   │   ├── controller.ts
│   │   ├── service.ts
│   │   ├── types.ts
│   │   ├── utils/
│   │   │   └── urlParser.ts
│   │   ├── constants/
│   │   │   └── index.ts
│   │   └── validation.ts
│   │
│   ├── prompts/
│   │   ├── routes.ts
│   │   ├── controller.ts
│   │   ├── service.ts
│   │   ├── types.ts
│   │   ├── utils/
│   │   │   └── variableExtractor.ts
│   │   ├── constants/
│   │   │   └── index.ts
│   │   └── validation.ts
│   │
│   ├── testing/
│   │   ├── routes.ts
│   │   ├── controller.ts
│   │   ├── service.ts
│   │   ├── types.ts
│   │   ├── utils/
│   │   │   ├── streamHandler.ts
│   │   │   └── responseParser.ts
│   │   ├── constants/
│   │   │   └── index.ts
│   │   └── validation.ts
│   │
│   ├── analytics/
│   │   ├── routes.ts
│   │   ├── controller.ts
│   │   ├── service.ts
│   │   ├── types.ts
│   │   ├── utils/
│   │   │   ├── aggregator.ts
│   │   │   └── percentileCalc.ts
│   │   ├── constants/
│   │   │   └── index.ts
│   │   └── validation.ts
│   │
│   ├── templates/
│   │   ├── routes.ts
│   │   ├── controller.ts
│   │   ├── service.ts
│   │   ├── types.ts
│   │   ├── utils/
│   │   │   └── templateMerger.ts
│   │   ├── constants/
│   │   │   └── categories.ts
│   │   └── validation.ts
│   │
│   ├── review/
│   │   ├── routes.ts
│   │   ├── controller.ts
│   │   ├── service.ts
│   │   ├── types.ts
│   │   ├── utils/
│   │   │   └── priorityCalculator.ts
│   │   ├── constants/
│   │   │   └── index.ts
│   │   └── validation.ts
│   │
│   ├── rules/
│   │   ├── routes.ts
│   │   ├── controller.ts
│   │   ├── service.ts
│   │   ├── types.ts
│   │   ├── utils/
│   │   │   └── conditionMatcher.ts
│   │   ├── constants/
│   │   │   └── operators.ts
│   │   └── validation.ts
│   │
│   ├── logs/
│   │   ├── routes.ts
│   │   ├── controller.ts
│   │   ├── service.ts
│   │   ├── types.ts
│   │   ├── utils/
│   │   │   └── queryBuilder.ts
│   │   ├── constants/
│   │   │   └── index.ts
│   │   └── validation.ts
│   │
│   └── settings/
│       ├── routes.ts
│       ├── controller.ts
│       ├── service.ts
│       ├── types.ts
│       ├── utils/
│       │   └── encryption.ts
│       ├── constants/
│       │   └── providers.ts
│       └── validation.ts
│
├── models/                       # Mongoose models
│   ├── User.ts
│   ├── Project.ts
│   ├── DetectedPrompt.ts
│   ├── PromptVersion.ts
│   ├── TestRun.ts
│   ├── PromptTemplate.ts
│   ├── ReviewQueue.ts
│   ├── EscalationRule.ts
│   ├── Analytics.ts
│   └── index.ts
│
├── services/                     # Shared/cross-cutting services
│   ├── github/
│   │   ├── client.ts             # GitHub API client
│   │   ├── filesFetcher.ts       # Fetch repo files
│   │   └── types.ts
│   │
│   ├── scanner/
│   │   ├── index.ts              # Main scanner orchestrator
│   │   ├── fileProcessor.ts      # Process individual files
│   │   └── types.ts
│   │
│   ├── detector/
│   │   ├── index.ts              # Prompt detection engine
│   │   ├── openaiParser.ts       # OpenAI SDK pattern matching
│   │   ├── astUtils.ts           # TypeScript AST helpers
│   │   └── types.ts
│   │
│   ├── ai/
│   │   ├── proxy.ts              # AI request proxy
│   │   ├── openai.ts             # OpenAI client wrapper
│   │   ├── streamHandler.ts      # SSE streaming
│   │   └── types.ts
│   │
│   ├── cost/
│   │   ├── calculator.ts         # Token cost calculation
│   │   └── pricing.ts            # Model pricing data
│   │
│   └── ruleEngine/
│       ├── evaluator.ts          # Escalation rule evaluation
│       └── actions.ts            # Rule action handlers
│
├── jobs/                         # Background jobs
│   ├── aggregateAnalytics.ts     # Daily analytics rollup
│   └── cleanupOldLogs.ts         # Log retention cleanup
│
├── lib/                          # Global utilities
│   ├── logger.ts                 # Pino logger setup
│   ├── errors.ts                 # Custom error classes
│   ├── response.ts               # Standardized API responses
│   └── utils.ts                  # General helpers
│
└── types/                        # Global types
    ├── express.d.ts              # Express type extensions
    ├── api.ts                    # API request/response types
    └── index.ts
```

## Feature Module Guidelines

Each feature follows this structure:
- **routes.ts**: Express router with endpoint definitions
- **controller.ts**: Request handlers (thin, delegates to service)
- **service.ts**: Business logic
- **types.ts**: TypeScript interfaces for the feature
- **utils/**: Helper functions specific to the feature
- **constants/**: Magic values, enums, config for the feature
- **validation.ts**: Zod schemas for request validation

### Controller Pattern
```typescript
// features/prompts/controller.ts
import { Request, Response, NextFunction } from 'express';
import { promptService } from './service';
import { logger } from '@/lib/logger';

export const promptController = {
  async getPrompts(req: Request, res: Response, next: NextFunction) {
    try {
      const { projectId } = req.params;
      logger.info('Fetching prompts', { projectId, userId: req.user?.id });

      const prompts = await promptService.getByProject(projectId);

      logger.info('Prompts fetched', { projectId, count: prompts.length });
      res.json({ success: true, data: prompts });
    } catch (error) {
      next(error);
    }
  },
};
```

### Service Pattern
```typescript
// features/prompts/service.ts
import { DetectedPrompt } from '@/models';
import { logger } from '@/lib/logger';

export const promptService = {
  async getByProject(projectId: string) {
    logger.debug('promptService.getByProject', { projectId });
    return DetectedPrompt.find({ projectId }).sort({ filePath: 1 });
  },
};
```

## Logging

Structured JSON logging with Pino:

```typescript
import { logger } from '@/lib/logger';

// All logs automatically include: timestamp, requestId, level
logger.info('Operation completed', { userId, action: 'scan', projectId });
logger.error('Operation failed', { error: err.message, stack: err.stack });
logger.debug('Debug info', { payload });
logger.warn('Warning condition', { threshold, actual });

// Child loggers for context
const reqLogger = logger.child({ requestId: req.id, userId: req.user?.id });
reqLogger.info('Processing request');
```

### Log Output Format
```json
{
  "level": "info",
  "time": "2024-01-15T10:30:00.000Z",
  "requestId": "abc-123",
  "userId": "user_456",
  "msg": "Test executed",
  "promptId": "prompt_789",
  "latencyMs": 1523
}
```

## API Endpoints

### Auth
```
GET  /api/auth/github           # Initiate GitHub OAuth
GET  /api/auth/github/callback  # OAuth callback
POST /api/auth/pat              # Authenticate with PAT
GET  /api/auth/me               # Get current user
POST /api/auth/logout           # Logout
```

### Projects
```
GET    /api/projects            # List user's projects
POST   /api/projects            # Create project
GET    /api/projects/:id        # Get project details
POST   /api/projects/:id/scan   # Trigger prompt scan
DELETE /api/projects/:id        # Delete project
```

### Prompts
```
GET  /api/projects/:id/prompts      # List detected prompts
GET  /api/prompts/:id               # Get prompt with versions
POST /api/prompts/:id/versions      # Save new version
GET  /api/prompts/:id/versions      # List versions
```

### Testing
```
POST /api/test                  # Execute prompt test
GET  /api/prompts/:id/runs      # Get test history
POST /api/runs/:id/star         # Star/unstar run
```

### Analytics
```
GET /api/projects/:id/analytics       # Project analytics
GET /api/projects/:id/analytics/daily # Daily breakdown
GET /api/prompts/:id/analytics        # Prompt analytics
GET /api/projects/:id/costs           # Cost breakdown
```

### Logs
```
GET  /api/projects/:id/logs     # Search/filter logs
POST /api/runs/:id/tags         # Add tags
PUT  /api/runs/:id/metadata     # Update metadata
```

### Templates
```
GET    /api/templates           # List templates
POST   /api/templates           # Create template
GET    /api/templates/:id       # Get template
PUT    /api/templates/:id       # Update template
DELETE /api/templates/:id       # Delete template
POST   /api/templates/:id/use   # Use template
```

### Review (HITL)
```
GET  /api/projects/:id/review-queue  # Review queue
GET  /api/review/:id                 # Review item
POST /api/runs/:id/feedback          # Submit feedback
POST /api/runs/:id/annotate          # Add annotation
POST /api/runs/:id/approve           # Approve
POST /api/runs/:id/reject            # Reject
```

### Escalation Rules
```
GET    /api/projects/:id/escalation-rules  # List rules
POST   /api/projects/:id/escalation-rules  # Create rule
PUT    /api/escalation-rules/:id           # Update rule
DELETE /api/escalation-rules/:id           # Delete rule
```

### Settings
```
GET  /api/settings/providers    # Get saved API keys (masked)
POST /api/settings/providers    # Save API key
```

## Error Handling

Custom error classes in `lib/errors.ts`:

```typescript
import { AppError, NotFoundError, ValidationError } from '@/lib/errors';

// In service
throw new NotFoundError('Prompt not found', { promptId });
throw new ValidationError('Invalid configuration', { field: 'model' });

// Caught by errorHandler middleware, logged, and returned as:
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Prompt not found",
    "details": { "promptId": "..." }
  }
}
```

## Environment Variables

```bash
# .env
NODE_ENV=development
PORT=4000

# Database
MONGODB_URI=mongodb://localhost:27017/promptsuite

# Auth
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=7d
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
GITHUB_CALLBACK_URL=http://localhost:4000/api/auth/github/callback

# Frontend
FRONTEND_URL=http://localhost:3000

# AI (optional, users can provide their own)
OPENAI_API_KEY=sk-...

# Encryption
ENCRYPTION_KEY=32-byte-hex-key-for-api-key-encryption
```

## Database Models

All models in `models/` directory. Key relationships:
- User → Projects (one-to-many)
- Project → DetectedPrompts (one-to-many)
- DetectedPrompt → PromptVersions (one-to-many)
- DetectedPrompt → TestRuns (one-to-many)
- Project → EscalationRules (one-to-many)
- TestRun → ReviewQueue (one-to-one)

## Request/Response Logging

All requests logged by `middleware/logger.ts`:

```typescript
// Request log
{ level: "info", msg: "Request", method: "POST", path: "/api/test", requestId: "..." }

// Response log
{ level: "info", msg: "Response", method: "POST", path: "/api/test", status: 200, duration: 1523, requestId: "..." }

// Errors logged with full stack
{ level: "error", msg: "Request failed", error: "...", stack: "...", requestId: "..." }
```

## Frontend URL

- Development: `http://localhost:3000`
- Production: Set via `FRONTEND_URL`

See `../frontend/CLAUDE.md` for frontend documentation.
