import { useEffect, useState } from "react";
import { Button, Container, Stack, Typography } from "@mui/material";

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
    setProblemToEdit(null);
    setShowFormModal(false);
    fetchProblems();
  };

  const handleDeleteModalClose = () => {
    setProblemToDelete(null);
    setShowDeleteModal(false);
    fetchProblems();
  };

  return (
    <Container>
      <Stack spacing={2}>
        <Typography variant="h2">LeetLog</Typography>
        <Button
          variant="contained"
          size="small"
          onClick={() => setShowFormModal(true)}
          sx={{ width: 0.1 }}
        >
          Add Problem
        </Button>
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
