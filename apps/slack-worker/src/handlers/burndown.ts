import { Context } from 'hono';
import type { Env, SlackContext } from '../types';

/**
 * Handle /burndown slash command
 * Generates burndown chart for sprint progress
 */
export async function handleBurndownCommand(
  c: Context<{ Bindings: Env; Variables: SlackContext }>
) {
  const payload = c.get('payload');

  // TODO: Implement burndown chart generation
  // - Get current iteration data
  // - Calculate daily remaining points
  // - Generate Chart.js config
  // - Call external chart service to get PNG
  // - Upload to Slack

  return c.json({
    response_type: 'in_channel',
    text: `📊 Burndown Command (Under Development)`,
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*📊 Burndown Chart*\n\nHello <@${payload.user_id}>! The \`/burndown\` command is under development.`,
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Options:* ${payload.text || '(default: current iteration)'}\n*Channel:* ${payload.channel_name}`,
        },
      },
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: '🚧 Coming soon: Burndown chart image generation with Chart.js',
          },
        ],
      },
    ],
  });
}
