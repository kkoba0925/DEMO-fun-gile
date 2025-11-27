import { Context } from 'hono';
import type { Env, SlackContext } from '../types';

/**
 * Handle /plan slash command
 * Sprint planning assistance with task selection
 */
export async function handlePlanCommand(c: Context<{ Bindings: Env; Variables: SlackContext }>) {
  const payload = c.get('payload');

  // TODO: Implement sprint planning flow
  // - Show previous sprint results
  // - Get backlog issues
  // - Interactive task selection
  // - Generate Markdown planning document

  return c.json({
    response_type: 'in_channel',
    text: `📅 Plan Command (Under Development)`,
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*📅 Sprint Planning*\n\nHello <@${payload.user_id}>! The \`/plan\` command is under development.`,
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Options:* ${payload.text || '(default: next iteration)'}\n*Channel:* ${payload.channel_name}`,
        },
      },
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: '🚧 Coming soon: Interactive sprint planning with Markdown document',
          },
        ],
      },
    ],
  });
}
