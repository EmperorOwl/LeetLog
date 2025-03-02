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
  let res = formatDistanceToNow(date, { addSuffix: true });
  if (res == "1 day ago") {
    res = "Yesterday";
  } else if (res.includes("hour")) {
    res = "Today";
  }
  return res;
};

export { renderDifficultyChip, renderTimeAgo };
