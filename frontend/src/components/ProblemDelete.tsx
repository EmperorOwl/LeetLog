import { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";

import Problem from "../types/Problem.ts";
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
    if (!auth.token) {
      setError("Access denied");
      return;
    }

    const response = await fetch("/api/problems/" + problem?.number, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth.token,
      },
    });
    if (!response.ok) {
      setError("Failed to delete problem");
      return;
    }
    handleClose();
  };

  return (
    <Dialog open={isOpen}>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {`This will permanently delete ${problem?.number}. ${problem?.title}`}
        </DialogContentText>
        {error && <DialogContentText color="error">{error}</DialogContentText>}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDelete}>Yes</Button>
        <Button onClick={handleClose}>No</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProblemDelete;
