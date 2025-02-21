import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  login: string;
  avatar_url: string;
  html_url: string;
}

interface Issue {
  id: number;
  title: string;
  state: "open" | "closed"; // Use explicit types instead of string
  assignee: User | null; // Assignee can be a User object or null if unassigned
}


interface IssuesState {
  repoUrl: string;
  issues: Issue[];
}

const initialState: IssuesState = {
  repoUrl: "",
  issues: [],
};

export const fetchIssues = createAsyncThunk(
  "issues/fetchIssues",
  async (repoUrl: string) => {
    const repoPath = new URL(repoUrl).pathname.slice(1);
    const response = await axios.get(`https://api.github.com/repos/${repoPath}/issues`);
    return response.data;
  }
);

const issuesSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchIssues.fulfilled, (state, action) => {
      state.issues = action.payload;
    });
  },
});

export default issuesSlice.reducer;
