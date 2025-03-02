import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import MDEditor from "@uiw/react-md-editor";

import ProblemModal from "./ProblemModal";
import { renderDifficultyChip } from "../utils/helper";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/problems`;

const ProblemDetails = () => {
  const { number } = useParams();

  const [problem, setProblem] = useState(null);
  const [show, setShow] = useState(false);

  const fetchProblem = async () => {
    const response = await fetch(`${API_URL}/${number}`);
    const json = await response.json();
    if (response.ok) {
      setProblem(json);
      document.title = `${json.number}. ${json.title}`;
    }
  };

  useEffect(() => {
    fetchProblem();
  }, []);

  const handleClose = () => {
    setShow(false);
    fetchProblem();
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
            <Typography variant="h4">
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
          <MDEditor.Markdown source={problem.solution} />
          <ProblemModal
            problemToEdit={problem}
            isOpen={show}
            handleClose={handleClose}
          />
        </Stack>
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
};

export default ProblemDetails;
