import { useEffect, useState } from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";

import Problem from "../types/Problem";
import ProblemTable from "../components/ProblemTable.tsx";
import ProblemModal from "../components/ProblemModal.tsx";
import ProblemDelete from "../components/ProblemDelete.tsx";
import { fetchProblems } from "../services/problem.ts";

const Home = () => {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [problemToEdit, setProblemToEdit] = useState<Problem | null>(null);
  const [problemToDelete, setProblemToDelete] = useState<Problem | null>(null);

  const fetchData = async () => {
    try {
      const data = await fetchProblems();
      setProblems(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditRequest = (problem: Problem) => {
    setProblemToEdit(problem);
    setShowFormModal(true);
  };

  const handleDeleteRequest = async (problem: Problem) => {
    setProblemToDelete(problem);
    setShowDeleteModal(true);
  };

  const handleFormModalClose = () => {
    setShowFormModal(false);
    setTimeout(() => {
      setProblemToEdit(null);
      fetchData();
    }, 100); // Add some delay before re-fetching
  };

  const handleDeleteModalClose = () => {
    setShowDeleteModal(false);
    setTimeout(() => {
      setProblemToDelete(null);
      fetchData();
    }, 100); // Add some delay before re-fetching
  };

  return (
    <Container>
      <Stack spacing={2}>
        <Typography variant="h2">LeetLog</Typography>
        <Box>
          <Button
            variant="contained"
            size="small"
            onClick={() => setShowFormModal(true)}
          >
            Add Problem
          </Button>
        </Box>
        <ProblemTable
          problems={problems}
          handleEditRequest={handleEditRequest}
          handleDeleteRequest={handleDeleteRequest}
        />
      </Stack>
      <ProblemModal
        problemToEdit={problemToEdit}
        isOpen={showFormModal}
        handleClose={handleFormModalClose}
      />
      <ProblemDelete
        problem={problemToDelete}
        isOpen={showDeleteModal}
        handleClose={handleDeleteModalClose}
      />
    </Container>
  );
};
export default Home;
