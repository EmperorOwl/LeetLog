import { useEffect, useState } from "react";
import { Button, Container, Stack, Typography } from "@mui/material";

import Problem from "../types/Problem";
import ProblemSearchBar from "../components/ProblemSearchBar.tsx";
import ProblemListFilter from "../components/ProblemListFilter.tsx";
import ProblemTable from "../components/ProblemTable.tsx";
import ProblemModal from "../components/ProblemModal.tsx";
import ProblemDelete from "../components/ProblemDelete.tsx";
import { fetchProblems } from "../services/problem.ts";

const Home = () => {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [listFilter, setListFilter] = useState("all");
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [problemToEdit, setProblemToEdit] = useState<Problem | null>(null);
  const [problemToDelete, setProblemToDelete] = useState<Problem | null>(null);

  useEffect(() => {
    // Refresh when the list filter changes or when a modal is closed
    // Don't refresh when a modal is opened
    if (!showFormModal && !showDeleteModal) {
      fetchProblems(listFilter).then(setProblems, console.error);
    }
  }, [listFilter, showFormModal, showDeleteModal]);

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
    }, 100); // Add some delay before re-fetching
  };

  const handleDeleteModalClose = () => {
    setShowDeleteModal(false);
    setTimeout(() => {
      setProblemToDelete(null);
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
          <ProblemSearchBar value={searchQuery} setter={setSearchQuery} />
          <ProblemListFilter value={listFilter} setter={setListFilter} />
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
