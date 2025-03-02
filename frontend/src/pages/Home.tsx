import { useState } from "react";
import { Button, Container, Stack, Typography } from "@mui/material";

import Problem from "../types/Problem";
import ProblemTable from "../components/ProblemTable.tsx";
import ProblemModal from "../components/ProblemModal.tsx";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);

  const handleEditRequest = (problem: Problem) => {
    setSelectedProblem(problem);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setSelectedProblem(null);
    setShowModal(false);
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
        <ProblemTable handleEditRequest={handleEditRequest} />
        <ProblemModal
          isOpen={showModal}
          problem={selectedProblem}
          handleClose={handleModalClose}
        />
      </Stack>
    </Container>
  );
};

export default Home;
