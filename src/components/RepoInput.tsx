import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store"; // Import AppDispatch type
import { fetchIssues } from "../redux/issuesSlice";
import { Input, Button, Box, Text } from "@chakra-ui/react";

const RepoInput: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>(); // Use AppDispatch instead of default dispatch
  const [repoUrl, setRepoUrl] = useState("");
  const [error, setError] = useState("");

  const handleLoadIssues = () => {
    const regex = /^https:\/\/github\.com\/([^/]+)\/([^/]+)$/;
    const match = repoUrl.match(regex);

    if (match) {
      dispatch(fetchIssues(repoUrl)); // This will now work
      setError("");
    } else {
      setError("Invalid GitHub repository URL. Use format: https://github.com/owner/repo");
    }
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg">
      <Input
        placeholder="Enter GitHub repo URL (e.g., https://github.com/facebook/react)"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
        mb={2}
      />
      <Button onClick={handleLoadIssues} colorScheme="blue" width="100%">
  Load Issues
</Button>

      {error && <Text color="red.500" mt={2}>{error}</Text>}
    </Box>
  );
};

export default RepoInput;
