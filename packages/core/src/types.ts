/**
 * Core domain types
 */

export interface Issue {
  id: string;
  number: number;
  title: string;
  state: 'open' | 'closed';
  assignees: string[];
  labels: string[];
  storyPoints?: number;
  status?: string; // From GitHub Projects
  createdAt: string;
  updatedAt: string;
  closedAt?: string;
  url: string;
}

export interface Iteration {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  issues: Issue[];
}

export interface BurndownData {
  iteration: Iteration;
  dailyData: DailyBurndownPoint[];
  totalPoints: number;
  remainingPoints: number;
  completionRate: number;
}

export interface DailyBurndownPoint {
  date: string;
  remainingPoints: number;
  idealPoints: number;
  completedPoints: number;
}

export interface UserMapping {
  slackUserId: string;
  slackUserName: string;
  githubUsername: string;
}

export interface ChannelMapping {
  channelId: string;
  channelName: string;
  repositoryOwner: string;
  repositoryName: string;
  projectNumber?: number;
}
