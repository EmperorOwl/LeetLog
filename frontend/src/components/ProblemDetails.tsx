import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  Alert,
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import MDEditor from "@uiw/react-md-editor";

import Problem from "../types/Problem";
import ProblemModal from "./ProblemModal.tsx";
import { renderDifficultyChip } from "../utils/helper";
import { fetchProblem } from "../services/problem.ts";

const ProblemDetails = () => {
  const { number } = useParams();

  const [problem, setProblem] = useState<Problem | null>(null);
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      if (number) {
        const data = await fetchProblem(number);
        setProblem(data);
        document.title = `${data.number}. ${data.title}`;
      }
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const getSolution = () => {
    if (problem) {
      let solution = problem.solution;
      if (problem.trick) {
        // Add trick to solution if it exists
        solution = `### Trick\n\n${problem.trick}\n\n${solution}`;
      }
      return solution;
    }
    return "";
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClose = () => {
    setShow(false);
    fetchData();
  };

  return (
    <Container sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      {problem ? (
        <Stack spacing={2} sx={{ width: 0.5 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h5">
              {`${problem.number}. ${problem.title}`}
            </Typography>
            <Box>
              <Button
                variant="contained"
                size="small"
                onClick={() => setShow(true)}
              >
                Edit Problem
              </Button>
            </Box>
          </Box>
          <Box>{renderDifficultyChip(problem.difficulty)}</Box>
          <Box data-color-mode="light">
            <MDEditor.Markdown source={getSolution()} />
          </Box>
          <ProblemModal
            problemToEdit={problem}
            isOpen={show}
            handleClose={handleClose}
          />
        </Stack>
      ) : (
        error && <Alert severity="error">{error}</Alert>
      )}
    </Container>
  );
};

export default ProblemDetails;
