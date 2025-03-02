import { useEffect, useState } from "react";
import { Button, Container, Stack, Typography } from "@mui/material";

import Problem from "../types/Problem";
import ProblemTable from "../components/ProblemTable.tsx";
import ProblemModal from "../components/ProblemModal.tsx";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/problems`;

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [problemToEdit, setProblemToEdit] = useState<Problem | null>(null);
  const [problems, setProblems] = useState<Problem[]>([]);

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
    setShowModal(true);
  };

  const handleModalClose = () => {
    setProblemToEdit(null);
    setShowModal(false);
    fetchProblems();
  };

  return (
    <Container>
      <Stack spacing={2}>
        <Typography variant="h2">LeetLog</Typography>
        <Button
          variant="contained"
          size="small"
          onClick={() => setShowModal(true)}
          sx={{ width: 0.1 }}
        >
          Add Problem
        </Button>
        <ProblemTable
          problems={problems}
          handleEditRequest={handleEditRequest}
        />
        <ProblemModal
          problemToEdit={problemToEdit}
          isOpen={showModal}
          handleClose={handleModalClose}
        />
      </Stack>
    </Container>
  );
};

export default Home;
