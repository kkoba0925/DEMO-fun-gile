// Cloudflare Workers environment bindings
export interface Env {
  // GitHub Configuration
  GITHUB_TOKEN: string;
  DEFAULT_GITHUB_ORG: string;

  // Slack Configuration
  SLACK_BOT_TOKEN: string;
  SLACK_SIGNING_SECRET: string;

  // Environment
  ENVIRONMENT?: string;

  // Future: KV/D1 bindings
  // CHANNEL_MAP: KVNamespace;
}

// Slack slash command request payload
export interface SlackSlashCommandPayload {
  token: string;
  team_id: string;
  team_domain: string;
  channel_id: string;
  channel_name: string;
  user_id: string;
  user_name: string;
  command: string;
  text: string;
  api_app_id: string;
  is_enterprise_install: string;
  response_url: string;
  trigger_id: string;
}

// Context passed through middleware
export interface SlackContext {
  payload: SlackSlashCommandPayload;
  verified: boolean;
}
