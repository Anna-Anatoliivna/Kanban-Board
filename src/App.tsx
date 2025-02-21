import './App.css'
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { Box, Heading, Flex } from "@chakra-ui/react";
import RepoInput from "./components/RepoInput/RepoInput";
import Board from "./components/Board/Board";

const App: React.FC = () => {
  const issues = useSelector((state: RootState) => state.issues.issues);

  return (
    <Box p={5}>
      <Heading mb={4} textAlign="center">Kanban Board</Heading>
      <RepoInput />
      {issues.length > 0 && (
        <Flex mt={5} justify="space-around">
          <Board />
        </Flex>
      )}
    </Box>
  );
};

export default App;

