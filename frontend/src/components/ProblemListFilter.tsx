import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface ProblemListFilterProps {
  value: string;
  setter: (newValue: string) => void;
}

const ProblemListFilter = ({ value, setter }: ProblemListFilterProps) => {
  return (
    <FormControl sx={{ width: 0.15 }}>
      <InputLabel>List</InputLabel>
      <Select
        label="List"
        value={value}
        onChange={(event) => setter(event.target.value)}
        size="small"
      >
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="neetcode150">Neetcode 150</MenuItem>
        <MenuItem value="notinlist">Not in List</MenuItem>
      </Select>
    </FormControl>
  );
};

export default ProblemListFilter;
