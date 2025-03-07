import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import { TOPICS } from "../utils/constants";
import { pretty } from "../utils/helper.tsx";

interface ProblemTopicFilterProps {
  value: string;
  setter: (newValue: string) => void;
}

const ProblemTopicFilter = ({ value, setter }: ProblemTopicFilterProps) => {
  return (
    <FormControl sx={{ width: 0.15 }}>
      <InputLabel>Topic</InputLabel>
      <Select
        label="Topic"
        value={value}
        onChange={(event) => setter(event.target.value)}
        size="small"
      >
        <MenuItem value="all">All</MenuItem>
        {TOPICS.map((topic: string) => (
          <MenuItem value={topic}>{pretty(topic)} </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ProblemTopicFilter;
