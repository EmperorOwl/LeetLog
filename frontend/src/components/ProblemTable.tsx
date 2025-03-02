import EditIcon from "@mui/icons-material/Edit";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ExploreIcon from "@mui/icons-material/Explore";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import Problem from "../types/Problem";
import { renderDifficultyChip, renderTimeAgo } from "../utils/helper.tsx";

const SOLUTION_URL = "/problems";
const LEETCODE_URL = "https://leetcode.com/problems";

interface ProblemTableProps {
  problems: Problem[];
  handleEditRequest: (problem: Problem) => void;
  handleDeleteRequest: (problem: Problem) => void;
}

const ProblemTable = ({
  problems,
  handleEditRequest,
  handleDeleteRequest,
}: ProblemTableProps) => {
  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Problem</TableCell>
            <TableCell>Difficulty</TableCell>
            <TableCell>Last Attempted</TableCell>
            <TableCell>Trick</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {problems.map((problem: Problem) => (
            <TableRow key={problem.number}>
              <TableCell component="th" scope="row">
                {problem.number}. {problem.title}
              </TableCell>
              <TableCell>{renderDifficultyChip(problem.difficulty)}</TableCell>
              <TableCell>{renderTimeAgo(problem.lastAttempted)}</TableCell>
              <TableCell>{problem.trick}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleEditRequest(problem)}>
                  <EditIcon />
                </IconButton>
                <IconButton
                  href={`${SOLUTION_URL}/${problem.number}`}
                  target="_blank"
                >
                  <OpenInNewIcon />
                </IconButton>
                <IconButton
                  href={`${LEETCODE_URL}/${problem.number}`}
                  target="_blank"
                >
                  <ExploreIcon />
                </IconButton>
                <IconButton onClick={() => handleDeleteRequest(problem)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProblemTable;
