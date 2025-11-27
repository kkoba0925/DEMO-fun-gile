import { Context, Next } from 'hono';
import type { Env, SlackContext } from '../types';

/**
 * Verify Slack request signature
 * https://api.slack.com/authentication/verifying-requests-from-slack
 */
export async function verifySlackSignature(
  c: Context<{ Bindings: Env; Variables: SlackContext }>,
  next: Next
) {
  const signature = c.req.header('x-slack-signature');
  const timestamp = c.req.header('x-slack-request-timestamp');

  if (!signature || !timestamp) {
    return c.json({ error: 'Missing Slack signature headers' }, 401);
  }

  // Prevent replay attacks (request must be within 5 minutes)
  const currentTime = Math.floor(Date.now() / 1000);
  if (Math.abs(currentTime - parseInt(timestamp)) > 60 * 5) {
    return c.json({ error: 'Request timestamp too old' }, 401);
  }

  const signingSecret = c.env.SLACK_SIGNING_SECRET;
  if (!signingSecret) {
    console.error('SLACK_SIGNING_SECRET not configured');
    return c.json({ error: 'Server configuration error' }, 500);
  }

  // Get request body as text
  const body = await c.req.text();

  // Create signature base string
  const sigBaseString = `v0:${timestamp}:${body}`;

  // Compute HMAC SHA256
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(signingSecret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signatureBuffer = await crypto.subtle.sign('HMAC', key, encoder.encode(sigBaseString));
  const computedSignature =
    'v0=' +
    Array.from(new Uint8Array(signatureBuffer))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');

  // Compare signatures (timing-safe comparison)
  if (computedSignature !== signature) {
    console.error('Invalid Slack signature');
    return c.json({ error: 'Invalid signature' }, 401);
  }

  // Parse the body and store in context
  const params = new URLSearchParams(body);
  const payload: Record<string, string> = {};
  params.forEach((value, key) => {
    payload[key] = value;
  });

  c.set('payload', payload as any);
  c.set('verified', true);

  await next();
}
