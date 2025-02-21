import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { updateIssueStatus } from "../../redux/issuesSlice";
import { Box, Flex, Heading } from "@chakra-ui/react";
import Column from "../Column/Column";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Board: React.FC = () => {
  const issues = useSelector((state: RootState) => state.issues.issues);
  const dispatch = useDispatch();

  const handleMoveIssue = (id: number, newStatus: "todo" | "inProgress" | "done") => {
    dispatch(updateIssueStatus({ id, newStatus }));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Flex justify="space-between" p={5} gap={4}>
        <Column
          title="To Do"
          issues={issues.filter(issue => issue.status === "todo")}
          status="todo"
          onMoveIssue={handleMoveIssue}
        />
        <Column
          title="In Progress"
          issues={issues.filter(issue => issue.status === "inProgress")}
          status="inProgress"
          onMoveIssue={handleMoveIssue}
        />
        <Column
          title="Done"
          issues={issues.filter(issue => issue.status === "done")}
          status="done"
          onMoveIssue={handleMoveIssue}
        />
      </Flex>
    </DndProvider>
  );
};

export default Board;
