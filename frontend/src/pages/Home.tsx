import { useEffect, useState } from "react";
import { Button, Container, Stack, TextField, Typography } from "@mui/material";

import Problem from "../types/Problem";
import ProblemTable from "../components/ProblemTable.tsx";
import ProblemModal from "../components/ProblemModal.tsx";
import ProblemDelete from "../components/ProblemDelete.tsx";
import { fetchProblems } from "../services/problem.ts";

const Home = () => {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
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

  const filteredProblems = problems.filter((problem) =>
    `${problem.number}. ${problem.title}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase()),
  );

  return (
    <Container>
      <Stack spacing={2}>
        <Typography variant="h2">LeetLog</Typography>
        <Stack direction="row" spacing={3} alignItems="center">
          <TextField
            label="Search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            size="small"
            sx={{ width: 0.3 }}
          />
          <Button variant="contained" onClick={() => setShowFormModal(true)}>
            Add Problem
          </Button>
        </Stack>
        <ProblemTable
          problems={filteredProblems}
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
