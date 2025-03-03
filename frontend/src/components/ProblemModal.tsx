import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Box,
} from "@mui/material";

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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <DialogTitle>
          {problemToEdit
            ? `${problemToEdit.number}. ${problemToEdit.title}`
            : "Add Problem"}
        </DialogTitle>
        <IconButton onClick={handleClose} sx={{ mr: 1.3 }}>
          <CloseIcon />
        </IconButton>
      </Box>
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
