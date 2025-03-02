import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import ProblemForm from "./ProblemForm";
import Problem from "../types/Problem.ts";

interface ProblemModalProps {
  isOpen: boolean;
  handleClose: () => void;
  problem: Problem | null;
}

const ProblemModal = ({ isOpen, handleClose, problem }: ProblemModalProps) => {
  return (
    <Dialog open={isOpen} maxWidth="md" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        {problem ? `${problem.number}. ${problem.title}` : "Add Problem"}
      </DialogTitle>
      <IconButton
        onClick={handleClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <ProblemForm initialProblem={problem} />
      </DialogContent>
      <DialogActions>
        <Button type="submit" form="problem-form">
          {problem ? "Save" : "Add"}
        </Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProblemModal;
