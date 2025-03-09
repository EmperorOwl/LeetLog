import { Chip } from "@mui/material";
import { formatDistanceToNow } from "date-fns";

const pretty = (str: string) => {
  let res;
  if (str == "1 dp") {
    res = "1 DP";
  } else if (str == "2 dp") {
    res = "2 DP";
  } else {
    res = str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  return res;
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
  return <Chip size="small" label={pretty(difficulty)} sx={{ color: color }} />;
};

const renderTopicChip = (topic: string) => {
  return <Chip size="small" label={pretty(topic)} />;
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

const getProblemSlug = (title: string) => {
  let slug = title.toLowerCase();
  slug = slug.replace(/ -/g, ""); // replaceAll(' -', '')
  slug = slug.replace(/ /g, "-"); // replaceAll(' ', '-')
  return slug;
};

export {
  pretty,
  renderDifficultyChip,
  renderTopicChip,
  renderTimeAgo,
  getProblemSlug,
};
