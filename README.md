# demo-fun-gile

Slack bot for GitHub Issue/Project management with burndown charts and sprint operations support.

## Project Structure

```
demo-fun-gile/
├── apps/
│   └── slack-worker/       # Cloudflare Workers + Hono (Slack endpoints)
├── packages/
│   ├── core/               # GitHub API integration & domain logic
│   └── charts/             # Chart.js burndown chart generation
├── scripts/                # Utility scripts
└── CLAUDE.md               # Project specifications (Japanese)
```

## Features (Planned)

- **`/task`** - List assigned GitHub Issues for current iteration
- **`/burndown`** - Generate burndown chart for sprint progress
- **`/review`** - Interactive sprint review with Markdown report generation
- **`/plan`** - Sprint planning assistance with task selection

## Tech Stack

- **Backend**: Cloudflare Workers + Hono (TypeScript)
- **GitHub Integration**: Octokit (REST/GraphQL API)
- **Slack Integration**: Slack Web API
- **Chart Generation**: Chart.js (via external service)
- **Package Manager**: pnpm (monorepo)

## Setup

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0
- Cloudflare account (for deployment)
- GitHub account with organization access
- Slack workspace with admin permissions

### Installation

```bash
# Install dependencies
pnpm install

# Copy environment variables template
cp .env.local.example .env.local

# Edit .env.local with your credentials
# - GITHUB_TOKEN
# - SLACK_BOT_TOKEN
# - SLACK_SIGNING_SECRET
# - DEFAULT_GITHUB_ORG
```

### Development

```bash
# Start development server (Cloudflare Workers local)
pnpm dev

# Type check
pnpm typecheck

# Lint
pnpm lint

# Format code
pnpm format
```

### Deployment

```bash
# Deploy to Cloudflare Workers
cd apps/slack-worker
pnpm deploy
```

## Configuration

### Environment Variables

See `.env.local.example` for required environment variables.

### Channel-Repository Mapping

Channel to repository mapping will be configured via:
- Configuration file: `config/channel-map.json` (future)
- Or Cloudflare KV storage (future)

## Development Status

- [x] Monorepo structure setup
- [x] Cloudflare Workers + Hono basic setup
- [x] Slack signature verification middleware
- [x] Basic route handlers (stub implementation)
- [ ] `/task` command implementation
- [ ] `/burndown` command implementation
- [ ] `/review` command implementation
- [ ] `/plan` command implementation

## Documentation

For detailed specifications and architecture, see [CLAUDE.md](./CLAUDE.md) (Japanese).

## License

Private project
