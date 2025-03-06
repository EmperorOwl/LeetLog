import { useEffect, useState } from "react";
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import Problem from "../types/Problem";
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
    // Refresh when the modal is closed, not when it is opened
    // or whenever the list filter changes
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
          <TextField
            label="Search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            size="small"
            sx={{ width: 0.3 }}
          />
          <FormControl sx={{ width: 0.15 }}>
            <InputLabel>List</InputLabel>
            <Select
              label="List"
              value={listFilter}
              onChange={(event) => setListFilter(event.target.value)}
              size="small"
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="neetcode150">Neetcode 150</MenuItem>
              <MenuItem value="notinlist">Not in List</MenuItem>
            </Select>
          </FormControl>
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
