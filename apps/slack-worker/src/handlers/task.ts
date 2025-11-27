import { Context } from 'hono';
import type { Env, SlackContext } from '../types';

/**
 * Handle /task slash command
 * Lists assigned GitHub Issues for the current iteration
 */
export async function handleTaskCommand(c: Context<{ Bindings: Env; Variables: SlackContext }>) {
  const payload = c.get('payload');

  // TODO: Implement full task listing logic
  // - Get current iteration
  // - Filter by assignee (based on Slack user -> GitHub user mapping)
  // - Filter by status (Todo, In Progress)
  // - Format as Slack blocks

  return c.json({
    response_type: 'in_channel',
    text: `📋 Task Command (Under Development)`,
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*📋 Your Tasks*\n\nHello <@${payload.user_id}>! The \`/task\` command is under development.`,
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Command Text:* ${payload.text || '(none)'}\n*Channel:* ${payload.channel_name}`,
        },
      },
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: '🚧 Coming soon: GitHub Issue listing with filters',
          },
        ],
      },
    ],
  });
}
