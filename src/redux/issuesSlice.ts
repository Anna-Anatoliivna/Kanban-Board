import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchGitHubIssues, GitHubIssue } from "../utils/api"; // Import the API function

// User and Issue Types (including the custom status field for Kanban board)
interface User {
  login: string;
  avatar_url: string;
  html_url: string;
}

interface Issue extends GitHubIssue {
  status: "todo" | "inProgress" | "done"; // Added status for Kanban board
}

interface IssuesState {
  repoUrl: string;
  issues: Issue[];
}

const initialState: IssuesState = {
  repoUrl: "",
  issues: [],
};

// Fetch issues using the API from api.ts
export const fetchIssues = createAsyncThunk(
  "issues/fetchIssues",
  async (repoUrl: string) => {
    const issues = await fetchGitHubIssues(repoUrl); // Use the API function
    return issues; // Return the issues array
  }
);

// Redux slice for issues
const issuesSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {
    setRepoUrl: (state, action: PayloadAction<string>) => {
      state.repoUrl = action.payload;
    },
    updateIssueStatus: (
      state: IssuesState,
      action: PayloadAction<{ id: number; newStatus: "todo" | "inProgress" | "done" }>
    ) => {
      const { id, newStatus } = action.payload;
      const issue = state.issues.find((issue) => issue.id === id);
      if (issue) {
        issue.status = newStatus; // Update the status of the issue
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIssues.fulfilled, (state, action) => {
      // Map through fetched issues and set status to "todo" (explicitly typed)
      const fetchedIssues = action.payload.map((issue: GitHubIssue) => ({
        ...issue,
        status: "todo", // Explicitly set status to "todo" which is valid
      })) as Issue[]; // Explicitly cast the mapped result to Issue[]
      
      state.issues = fetchedIssues;
    });
  },
});

// Export the action creators and the reducer
export const { setRepoUrl, updateIssueStatus } = issuesSlice.actions;
export default issuesSlice.reducer;