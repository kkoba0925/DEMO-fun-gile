import { Hono } from 'hono';
import type { Env, SlackContext } from '../types';
import { verifySlackSignature } from '../middleware/slack-verify';
import { handleTaskCommand } from '../handlers/task';
import { handleBurndownCommand } from '../handlers/burndown';
import { handleReviewCommand } from '../handlers/review';
import { handlePlanCommand } from '../handlers/plan';

export const slackRoutes = new Hono<{ Bindings: Env; Variables: SlackContext }>();

// Apply Slack signature verification to all routes
slackRoutes.use('*', verifySlackSignature);

// Slash command endpoints
slackRoutes.post('/commands/task', handleTaskCommand);
slackRoutes.post('/commands/burndown', handleBurndownCommand);
slackRoutes.post('/commands/review', handleReviewCommand);
slackRoutes.post('/commands/plan', handlePlanCommand);

// Test endpoint (for debugging)
slackRoutes.post('/test', (c) => {
  const payload = c.get('payload');
  return c.json({
    message: 'Slack webhook received and verified',
    command: payload.command,
    text: payload.text,
    user: payload.user_name,
  });
});
