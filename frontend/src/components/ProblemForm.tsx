import { useState, useEffect, FormEvent } from "react";
import MDEditor from "@uiw/react-md-editor";
import {
  Alert,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";

import Problem from "../types/Problem";
import { updateProblem, createProblem } from "../services/problem.ts";
import { useAuth } from "../contexts/Auth.tsx";
import { renderDifficultyChip } from "../utils/helper.tsx";
import { TEMPLATE } from "../utils/constants.ts";

interface ProblemFormProps {
  initialProblem: Problem | null;
  handleModalClose: () => void;
}

const ProblemForm = ({
  initialProblem,
  handleModalClose,
}: ProblemFormProps) => {
  const TODAY = new Date().toISOString().split("T")[0];
  const [error, setError] = useState("");
  // Form fields
  const [number, setNumber] = useState("");
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [lastAttempted, setLastAttempted] = useState(TODAY);
  const [trick, setTrick] = useState("");
  const [solution, setSolution] = useState<string | undefined>(TEMPLATE);
  const [comments, setComments] = useState("");

  const auth = useAuth();

  useEffect(() => {
    if (initialProblem) {
      setTitle(initialProblem.title);
      setNumber(initialProblem.number.toString());
      setDifficulty(initialProblem.difficulty);
      if (initialProblem.lastAttempted) {
        setLastAttempted(initialProblem.lastAttempted.split("T")[0]);
      }
      setTrick(initialProblem.trick);
      setSolution(initialProblem.solution);
      setComments(initialProblem.comments);
    }
  }, [initialProblem]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent automatic reload on form submit

    const problem: Problem = {
      number: parseInt(number, 10),
      title,
      difficulty,
      lastAttempted,
      trick,
      solution: solution || "",
      comments,
    };

    try {
      if (initialProblem) {
        await updateProblem(problem, auth.token);
      } else {
        await createProblem(problem, auth.token);
      }
      handleModalClose();
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <Stack
      component="form"
      spacing={2}
      onSubmit={(event) => handleSubmit(event)}
      id="problem-form"
    >
      {/* Row 1: Problem Details */}
      <Stack direction="row" spacing={2}>
        <TextField
          type="number"
          label="Number"
          value={number}
          onChange={(event) => setNumber(event.target.value)}
          slotProps={{ htmlInput: { min: 1, max: 5000 } }}
          sx={{ width: 0.15 }}
          required
        />
        <TextField
          type="text"
          label="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          sx={{ width: 0.45 }}
          required
        />
        <FormControl sx={{ width: 0.15 }}>
          <InputLabel required>Difficulty</InputLabel>
          <Select
            label="Difficulty"
            value={difficulty}
            onChange={(event) => setDifficulty(event.target.value)}
            renderValue={(value) => renderDifficultyChip(value)}
            required
          >
            <MenuItem value="easy">Easy</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="hard">Hard</MenuItem>
          </Select>
        </FormControl>
        <TextField
          type="date"
          label="Last Attempted"
          value={lastAttempted}
          onChange={(event) => setLastAttempted(event.target.value)}
          sx={{ width: 0.2 }}
          required
        />
      </Stack>

      {/* Row 2: Trick */}
      <TextField
        type="text"
        label="Trick"
        value={trick}
        onChange={(event) => setTrick(event.target.value)}
      />

      {/* Row 3: Solution Markdown */}
      <Box data-color-mode="light">
        <MDEditor
          value={solution}
          onChange={setSolution}
          height={500}
          visibleDragbar={false}
          style={{ marginLeft: 1, marginRight: 1 }}
        />
      </Box>

      {/* Row 4: Comments */}
      <TextField
        label="Comments"
        value={comments}
        onChange={(event) => setComments(event.target.value)}
        multiline
        rows={2}
      />

      {/* Row 5: Error Message */}
      {error && <Alert severity="error">{error}</Alert>}
    </Stack>
  );
};

export default ProblemForm;
