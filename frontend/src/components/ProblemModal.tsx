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
  problemToEdit: Problem | null;
  isOpen: boolean;
  handleClose: () => void;
}

const ProblemModal = ({
  problemToEdit,
  isOpen,
  handleClose,
}: ProblemModalProps) => {
  return (
    <Dialog open={isOpen} maxWidth="md" fullWidth>
      <DialogTitle>
        {problemToEdit
          ? `${problemToEdit.number}. ${problemToEdit.title}`
          : "Add Problem"}
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
        <ProblemForm
          initialProblem={problemToEdit}
          handleModalClose={handleClose}
        />
      </DialogContent>
      <DialogActions>
        <Button type="submit" form="problem-form">
          {problemToEdit ? "Save" : "Add"}
        </Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProblemModal;
