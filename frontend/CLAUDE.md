# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

PromptSuite Frontend - Next.js 14 application for managing and testing AI prompts detected from codebases.

## Commands

```bash
pnpm install          # Install dependencies
pnpm dev              # Development server (http://localhost:3000)
pnpm build            # Production build
pnpm start            # Start production server
pnpm lint             # Run ESLint
pnpm lint:fix         # Fix ESLint issues
pnpm format           # Format with Prettier
pnpm test             # Run tests
pnpm test:watch       # Run tests in watch mode
pnpm test:coverage    # Run tests with coverage
```

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: TailwindCSS + shadcn/ui
- **State**: Jotai (atoms per feature)
- **Data Fetching**: TanStack Query
- **Forms**: React Hook Form + Zod
- **HTTP Client**: Axios with interceptors
- **Logging**: Custom logger with structured JSON output

## Project Structure

```
src/
├── app/                          # App Router pages
│   ├── (auth)/
│   │   └── login/
│   │       └── page.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx            # Dashboard shell with sidebar
│   │   ├── dashboard/
│   │   │   └── page.tsx          # Project list
│   │   ├── projects/
│   │   │   ├── new/
│   │   │   │   └── page.tsx
│   │   │   └── [id]/
│   │   │       ├── page.tsx      # Prompt list
│   │   │       ├── analytics/
│   │   │       ├── logs/
│   │   │       ├── review/
│   │   │       ├── rules/
│   │   │       └── prompts/[promptId]/
│   │   │           └── page.tsx  # Prompt editor
│   │   ├── templates/
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   └── settings/
│   │       └── page.tsx
│   ├── playground/
│   │   └── page.tsx              # Quick paste & test
│   ├── layout.tsx
│   └── page.tsx                  # Landing page
│
├── features/                     # Feature-based modules
│   ├── auth/
│   │   ├── components/
│   │   │   ├── LoginForm.tsx
│   │   │   ├── GithubOAuthButton.tsx
│   │   │   └── PatInput.tsx
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   └── useSession.ts
│   │   ├── services/
│   │   │   └── authService.ts
│   │   ├── store/
│   │   │   └── authAtoms.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── utils/
│   │   │   └── tokenStorage.ts
│   │   └── constants/
│   │       └── index.ts
│   │
│   ├── projects/
│   │   ├── components/
│   │   │   ├── ProjectCard.tsx
│   │   │   ├── ProjectList.tsx
│   │   │   ├── CreateProjectForm.tsx
│   │   │   └── GithubRepoSelector.tsx
│   │   ├── hooks/
│   │   │   ├── useProjects.ts
│   │   │   ├── useProject.ts
│   │   │   └── useScanProject.ts
│   │   ├── services/
│   │   │   └── projectService.ts
│   │   ├── store/
│   │   │   └── projectAtoms.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── utils/
│   │   │   └── projectValidation.ts
│   │   └── constants/
│   │       └── index.ts
│   │
│   ├── prompts/
│   │   ├── components/
│   │   │   ├── PromptList.tsx
│   │   │   ├── PromptCard.tsx
│   │   │   ├── PromptEditor.tsx
│   │   │   ├── PromptConfigPanel.tsx
│   │   │   ├── VariablesPanel.tsx
│   │   │   ├── ResponseViewer.tsx
│   │   │   ├── StreamingResponse.tsx
│   │   │   └── VersionHistory.tsx
│   │   ├── hooks/
│   │   │   ├── usePrompts.ts
│   │   │   ├── usePrompt.ts
│   │   │   ├── usePromptVersions.ts
│   │   │   └── useTestPrompt.ts
│   │   ├── services/
│   │   │   └── promptService.ts
│   │   ├── store/
│   │   │   └── promptAtoms.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── utils/
│   │   │   ├── variableParser.ts
│   │   │   └── diffUtils.ts
│   │   └── constants/
│   │       └── index.ts
│   │
│   ├── testing/
│   │   ├── components/
│   │   │   ├── TestRunner.tsx
│   │   │   ├── TestHistory.tsx
│   │   │   ├── TestRunCard.tsx
│   │   │   └── ProviderSelector.tsx
│   │   ├── hooks/
│   │   │   ├── useTestRuns.ts
│   │   │   ├── useExecuteTest.ts
│   │   │   └── useStreamResponse.ts
│   │   ├── services/
│   │   │   └── testService.ts
│   │   ├── store/
│   │   │   └── testAtoms.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── utils/
│   │   │   └── streamParser.ts
│   │   └── constants/
│   │       └── models.ts
│   │
│   ├── analytics/
│   │   ├── components/
│   │   │   ├── AnalyticsDashboard.tsx
│   │   │   ├── UsageChart.tsx
│   │   │   ├── CostBreakdown.tsx
│   │   │   ├── LatencyMetrics.tsx
│   │   │   └── StatsCard.tsx
│   │   ├── hooks/
│   │   │   ├── useAnalytics.ts
│   │   │   └── useCosts.ts
│   │   ├── services/
│   │   │   └── analyticsService.ts
│   │   ├── store/
│   │   │   └── analyticsAtoms.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── utils/
│   │   │   ├── costCalculator.ts
│   │   │   └── chartFormatters.ts
│   │   └── constants/
│   │       └── pricing.ts
│   │
│   ├── review/
│   │   ├── components/
│   │   │   ├── ReviewQueue.tsx
│   │   │   ├── ReviewItem.tsx
│   │   │   ├── FeedbackForm.tsx
│   │   │   ├── AnnotationPanel.tsx
│   │   │   └── ApprovalButtons.tsx
│   │   ├── hooks/
│   │   │   ├── useReviewQueue.ts
│   │   │   ├── useSubmitFeedback.ts
│   │   │   └── useAnnotations.ts
│   │   ├── services/
│   │   │   └── reviewService.ts
│   │   ├── store/
│   │   │   └── reviewAtoms.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── utils/
│   │   │   └── priorityUtils.ts
│   │   └── constants/
│   │       └── index.ts
│   │
│   ├── templates/
│   │   ├── components/
│   │   │   ├── TemplateList.tsx
│   │   │   ├── TemplateCard.tsx
│   │   │   ├── TemplateForm.tsx
│   │   │   └── UseTemplateModal.tsx
│   │   ├── hooks/
│   │   │   ├── useTemplates.ts
│   │   │   └── useTemplate.ts
│   │   ├── services/
│   │   │   └── templateService.ts
│   │   ├── store/
│   │   │   └── templateAtoms.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── utils/
│   │   │   └── templateValidation.ts
│   │   └── constants/
│   │       └── categories.ts
│   │
│   ├── rules/
│   │   ├── components/
│   │   │   ├── RuleList.tsx
│   │   │   ├── RuleForm.tsx
│   │   │   └── ConditionBuilder.tsx
│   │   ├── hooks/
│   │   │   └── useEscalationRules.ts
│   │   ├── services/
│   │   │   └── rulesService.ts
│   │   ├── store/
│   │   │   └── rulesAtoms.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── utils/
│   │   │   └── conditionEvaluator.ts
│   │   └── constants/
│   │       └── operators.ts
│   │
│   ├── logs/
│   │   ├── components/
│   │   │   ├── LogsTable.tsx
│   │   │   ├── LogFilters.tsx
│   │   │   └── LogDetail.tsx
│   │   ├── hooks/
│   │   │   └── useLogs.ts
│   │   ├── services/
│   │   │   └── logsService.ts
│   │   ├── store/
│   │   │   └── logsAtoms.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── utils/
│   │   │   └── logFormatters.ts
│   │   └── constants/
│   │       └── index.ts
│   │
│   ├── settings/
│   │   ├── components/
│   │   │   ├── SettingsForm.tsx
│   │   │   ├── ApiKeyManager.tsx
│   │   │   └── ProviderConfig.tsx
│   │   ├── hooks/
│   │   │   └── useSettings.ts
│   │   ├── services/
│   │   │   └── settingsService.ts
│   │   ├── store/
│   │   │   └── settingsAtoms.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── utils/
│   │   │   └── keyMasking.ts
│   │   └── constants/
│   │       └── providers.ts
│   │
│   └── playground/
│       ├── components/
│       │   ├── CodePasteArea.tsx
│       │   ├── QuickTestPanel.tsx
│       │   └── DetectedPromptsList.tsx
│       ├── hooks/
│       │   ├── useQuickDetect.ts
│       │   └── useQuickTest.ts
│       ├── services/
│       │   └── playgroundService.ts
│       ├── store/
│       │   └── playgroundAtoms.ts
│       ├── types/
│       │   └── index.ts
│       ├── utils/
│       │   └── codeParser.ts
│       └── constants/
│           └── index.ts
│
├── components/
│   └── ui/                       # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── dropdown-menu.tsx
│       ├── form.tsx
│       ├── input.tsx
│       ├── select.tsx
│       ├── table.tsx
│       ├── tabs.tsx
│       ├── toast.tsx
│       └── ...
│
├── lib/                          # Global utilities ONLY
│   ├── api/
│   │   ├── client.ts             # Axios instance with interceptors
│   │   └── types.ts              # API response types
│   ├── logger.ts                 # Structured logging
│   ├── queryClient.ts            # TanStack Query config
│   └── utils.ts                  # cn() and other global helpers
│
└── types/                        # Global types
    ├── api.ts                    # API response shapes
    ├── models.ts                 # Shared model types
    └── index.ts
```

## Feature Module Guidelines

Each feature follows this structure:
- **components/**: React components scoped to the feature
- **hooks/**: Custom hooks (data fetching, state, effects)
- **services/**: API calls using the global axios client
- **store/**: Jotai atoms for feature state
- **types/**: TypeScript types/interfaces for the feature
- **utils/**: Helper functions specific to the feature
- **constants/**: Magic values, enums, config for the feature

### Import Rules
- Features can import from `lib/` and `components/ui/`
- Features should NOT import from other features directly
- Shared logic goes in `lib/`, shared types in `types/`

## Logging

Use the structured logger from `lib/logger.ts`:

```typescript
import { logger } from '@/lib/logger';

// In components/hooks
logger.info('Prompt loaded', { promptId, projectId });
logger.error('Failed to execute test', { error, testRunId });

// Log levels: error, warn, info, debug
// All logs include: timestamp, requestId (from header), userId
```

## API Communication

All API calls go through `lib/api/client.ts`:

```typescript
import { apiClient } from '@/lib/api/client';

// Automatically handles:
// - Base URL from env
// - Auth token injection
// - Request ID generation
// - Error transformation
// - Response logging

const projects = await apiClient.get('/projects');
```

## Environment Variables

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_GITHUB_CLIENT_ID=your_client_id
NEXT_PUBLIC_APP_ENV=development
```

## State Management Pattern

Jotai atoms per feature, composed at the app level:

```typescript
// features/prompts/store/promptAtoms.ts
import { atom } from 'jotai';

export const selectedPromptIdAtom = atom<string | null>(null);
export const promptFiltersAtom = atom({ type: 'all', search: '' });
```

## Data Fetching Pattern

TanStack Query hooks in feature services:

```typescript
// features/prompts/hooks/usePrompts.ts
import { useQuery } from '@tanstack/react-query';
import { promptService } from '../services/promptService';

export function usePrompts(projectId: string) {
  return useQuery({
    queryKey: ['prompts', projectId],
    queryFn: () => promptService.getPrompts(projectId),
  });
}
```

## Backend API Base URL

- Development: `http://localhost:4000`
- Production: Set via `NEXT_PUBLIC_API_URL`

See `../backend/CLAUDE.md` for API endpoint documentation.
