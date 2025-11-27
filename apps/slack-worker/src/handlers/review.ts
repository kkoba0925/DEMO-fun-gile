import { Context } from 'hono';
import type { Env, SlackContext } from '../types';

/**
 * Handle /review slash command
 * Interactive sprint review with Markdown report generation
 */
export async function handleReviewCommand(
  c: Context<{ Bindings: Env; Variables: SlackContext }>
) {
  const payload = c.get('payload');

  // TODO: Implement interactive review flow
  // - Show burndown chart
  // - Ask review type (mid-sprint or sprint review)
  // - Interactive questions
  // - Generate Markdown report

  return c.json({
    response_type: 'in_channel',
    text: `📝 Review Command (Under Development)`,
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*📝 Sprint Review*\n\nHello <@${payload.user_id}>! The \`/review\` command is under development.`,
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
            text: '🚧 Coming soon: Interactive sprint review with Markdown report',
          },
        ],
      },
    ],
  });
}
