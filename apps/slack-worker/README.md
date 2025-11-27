# slack-worker

Cloudflare Workers application for handling Slack slash commands.

## Architecture

- **Framework**: Hono (lightweight web framework for Workers)
- **Runtime**: Cloudflare Workers
- **Language**: TypeScript

## Endpoints

### Health Check
- `GET /` - Service status
- `GET /health` - Health check

### Slack Commands
- `POST /slack/commands/task` - `/task` command handler
- `POST /slack/commands/burndown` - `/burndown` command handler
- `POST /slack/commands/review` - `/review` command handler
- `POST /slack/commands/plan` - `/plan` command handler

## Local Development

```bash
# Install dependencies (from root)
pnpm install

# Start development server
pnpm dev

# This will start wrangler dev on http://localhost:8787
```

## Slack App Configuration

Configure your Slack app slash commands to point to:

```
/task → https://your-worker.workers.dev/slack/commands/task
/burndown → https://your-worker.workers.dev/slack/commands/burndown
/review → https://your-worker.workers.dev/slack/commands/review
/plan → https://your-worker.workers.dev/slack/commands/plan
```

### Required Slack App Scopes

- `commands` - Slash commands
- `chat:write` - Send messages
- `files:write` - Upload files (for charts)

## Environment Variables

Set via `wrangler secret put <KEY>`:

```bash
wrangler secret put GITHUB_TOKEN
wrangler secret put SLACK_BOT_TOKEN
wrangler secret put SLACK_SIGNING_SECRET
wrangler secret put DEFAULT_GITHUB_ORG
```

## Deployment

```bash
# Deploy to production
pnpm deploy

# Or with wrangler directly
wrangler deploy
```

## Testing

For local testing without Slack, you can use the test endpoint:

```bash
curl -X POST http://localhost:8787/slack/test \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "x-slack-signature: your-signature" \
  -H "x-slack-request-timestamp: $(date +%s)" \
  -d "command=/test&text=hello&user_id=U123&user_name=testuser&channel_id=C123&channel_name=general"
```

Note: You'll need to generate a valid Slack signature for testing.
