import { Octokit } from '@octokit/rest';

/**
 * GitHub API client wrapper
 */
export class GitHubClient {
  private octokit: Octokit;
  private defaultOrg: string;

  constructor(token: string, defaultOrg: string) {
    this.octokit = new Octokit({ auth: token });
    this.defaultOrg = defaultOrg;
  }

  /**
   * Get issues for a repository
   */
  async getIssues(owner: string, repo: string, options?: { state?: 'open' | 'closed' | 'all' }) {
    const response = await this.octokit.issues.listForRepo({
      owner,
      repo,
      state: options?.state || 'open',
      per_page: 100,
    });

    return response.data;
  }

  /**
   * Get a specific issue
   */
  async getIssue(owner: string, repo: string, issueNumber: number) {
    const response = await this.octokit.issues.get({
      owner,
      repo,
      issue_number: issueNumber,
    });

    return response.data;
  }

  /**
   * Get repository information
   */
  async getRepository(owner: string, repo: string) {
    const response = await this.octokit.repos.get({
      owner,
      repo,
    });

    return response.data;
  }

  // TODO: Add GraphQL queries for GitHub Projects v2
  // - Get project items
  // - Get iteration field values
  // - Get custom field values (story points, status, etc.)
}
