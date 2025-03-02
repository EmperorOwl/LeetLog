import { useState } from "react";
import { Button, Container, Typography } from "@mui/material";

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
      <Typography variant="h2">LeetLog</Typography>
      <Button variant="contained" onClick={() => setShowModal(true)}>
        Add Problem
      </Button>
      <ProblemTable handleEditRequest={handleEditRequest} />
      <ProblemModal
        isOpen={showModal}
        problem={selectedProblem}
        handleClose={handleModalClose}
      />
    </Container>
  );
};

export default Home;
