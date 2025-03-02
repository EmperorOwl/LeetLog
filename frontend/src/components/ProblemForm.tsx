import { useState, useEffect, FormEvent } from "react";
import MDEditor from "@uiw/react-md-editor";
import {
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";

import Problem from "../types/Problem";
import { useAuth } from "../contexts/Auth.tsx";
import { renderDifficultyChip } from "../utils/helper.tsx";

const INITIAL_MARKDOWN = `### Clarifying Questions
- 


### 
1. 
- \`O(n)\` time to iterate over
- \`O(n)\` space to store

\`\`\`python

\`\`\`


### 
1. 
- \`O(n)\` time to iterate over
- \`O(n)\` space to store

\`\`\`python

\`\`\`
`;

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/problems`;

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
  const [solution, setSolution] = useState<string | undefined>(
    INITIAL_MARKDOWN,
  );
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

    const url = initialProblem
      ? `${API_URL}/${initialProblem.number}`
      : API_URL;
    const method = initialProblem ? "PUT" : "POST";

    const problem = {
      number,
      title,
      difficulty,
      lastAttempted,
      trick,
      solution,
      comments,
    };

    if (!auth.token) {
      setError("Access denied");
      return;
    }

    const response = await fetch(url, {
      method: method,
      body: JSON.stringify(problem),
      headers: {
        "Content-Type": "application/json",
        Authorization: auth.token,
      },
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      return;
    }
    handleModalClose();
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
      <MDEditor
        value={solution}
        onChange={setSolution}
        height={500}
        visibleDragbar={false}
        style={{ marginLeft: 1.1, marginRight: 1.1 }}
      />

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
