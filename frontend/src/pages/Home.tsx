import { useEffect, useState } from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";

import Problem from "../types/Problem";
import ProblemTable from "../components/ProblemTable.tsx";
import ProblemModal from "../components/ProblemModal.tsx";
import ProblemDelete from "../components/ProblemDelete.tsx";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/problems`;

const Home = () => {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [problemToEdit, setProblemToEdit] = useState<Problem | null>(null);
  const [problemToDelete, setProblemToDelete] = useState<Problem | null>(null);

  const fetchProblems = async () => {
    const response = await fetch(API_URL);
    const json = await response.json();
    if (response.ok) {
      setProblems(json);
    }
  };

  useEffect(() => {
    fetchProblems();
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
      fetchProblems();
    }, 100); // Add some delay before re-fetching
  };

  const handleDeleteModalClose = () => {
    setShowDeleteModal(false);
    setTimeout(() => {
      setProblemToDelete(null);
      fetchProblems();
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
