import { IconButton, InputAdornment, TextField } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

interface ProblemSearchBarProps {
  value: string;
  setter: (searchQuery: string) => void;
}

const ProblemSearchBar = ({ value, setter }: ProblemSearchBarProps) => {
  return (
    <TextField
      label="Search"
      value={value}
      onChange={(event) => setter(event.target.value)}
      size="small"
      sx={{ width: 0.3 }}
      slotProps={{
        input: {
          endAdornment: value && (
            <InputAdornment position="end">
              <IconButton edge="end" onClick={() => setter("")}>
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export default ProblemSearchBar;
