import { Chip } from "@mui/material";
import { formatDistanceToNow } from "date-fns";

const renderDifficultyChip = (difficulty: string) => {
  let bgcolor: string;
  let color: string = "white";

  if (difficulty === "easy") {
    bgcolor = "success";
  } else if (difficulty === "medium") {
    bgcolor = "warning";
    color = "black";
  } else {
    bgcolor = "error";
  }
  return <Chip label={difficulty} sx={{ bgcolor: bgcolor, color: color }} />;
};

const renderTimeAgo = (date: string) => {
  return formatDistanceToNow(date, {
    addSuffix: true,
  });
};

export { renderDifficultyChip, renderTimeAgo };
