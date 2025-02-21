import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchIssues } from "../redux/issuesSlice";
import { Input, Button, Box, Text, Link } from "@chakra-ui/react";

const RepoInput: React.FC = () => {
  const dispatch = useDispatch();
  const [repoUrl, setRepoUrl] = useState("");
  const [error, setError] = useState("");

  const handleLoadIssues = () => {
    const regex = /^https:\/\/github\.com\/([^\/]+)\/([^\/]+)$/;
    const match = repoUrl.match(regex);

    if (match) {
      const [, owner, repo] = match;
      dispatch(fetchIssues(repoUrl));
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
      <Button onClick={handleLoadIssues} colorScheme="blue" isFullWidth>
        Load Issues
      </Button>
      {error && <Text color="red.500" mt={2}>{error}</Text>}

      {repoUrl && !error && (
        <Box mt={4}>
          <Text fontSize="sm">
            Repo: <Link href={repoUrl} isExternal color="blue.500">{repoUrl}</Link>
          </Text>
          <Text fontSize="sm">
            Owner:{" "}
            <Link
              href={`https://github.com/${repoUrl.split("/")[3]}`}
              isExternal
              color="blue.500"
            >
              {repoUrl.split("/")[3]}
            </Link>
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default RepoInput;
