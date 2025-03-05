import { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Alert,
} from "@mui/material";

import Problem from "../types/Problem.ts";
import { deleteProblem } from "../services/problem.ts";
import { useAuth } from "../contexts/Auth.tsx";

interface ProblemDeleteProps {
  problem: Problem | null;
  isOpen: boolean;
  handleClose: () => void;
}

const ProblemDelete = ({
  problem,
  isOpen,
  handleClose,
}: ProblemDeleteProps) => {
  const [error, setError] = useState("");
  const auth = useAuth();

  const handleDelete = async () => {
    try {
      if (problem) {
        await deleteProblem(problem, auth.token);
        handleClose();
      }
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const handleCancel = () => {
    setError("");
    handleClose();
  };

  return (
    <Dialog open={isOpen}>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {`This will permanently delete ${problem?.number}. ${problem?.title}`}
        </DialogContentText>
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDelete}>Yes</Button>
        <Button onClick={handleCancel}>No</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProblemDelete;
