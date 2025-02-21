import axios from 'axios';

// Define the User and Issue Types for GitHub API response
export interface User {
  login: string;
  avatar_url: string;
  html_url: string;
}

export interface GitHubIssue {
  id: number;
  title: string;
  state: "open" | "closed";
  assignee: User | null;
}

// Function to fetch issues from GitHub repository
export const fetchGitHubIssues = async (repoUrl: string): Promise<GitHubIssue[]> => {
  const repoPath = new URL(repoUrl).pathname.slice(1); // Extract the repo path from the URL
  const response = await axios.get(`https://api.github.com/repos/${repoPath}/issues`);
  return response.data; // Return the issues array
};
