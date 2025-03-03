import { Chip } from "@mui/material";
import { formatDistanceToNow } from "date-fns";

const title = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const renderDifficultyChip = (difficulty: string) => {
  let color: string;
  if (difficulty === "easy") {
    color = "green";
  } else if (difficulty === "medium") {
    color = "orange";
  } else {
    color = "Red";
  }
  return <Chip size="small" label={title(difficulty)} sx={{ color: color }} />;
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

export { title, renderDifficultyChip, renderTimeAgo };
