import { KeyboardEvent, ChangeEvent } from "react";
import { TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  Box
} from '@chakra-ui/react'
interface Props {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onPressSpace?: () => void;
  label?: string;
  rows: number;
  placeholder?: string;
  name?: string;
  value?: string;
}

export default function HTextarea({
  onChange,
  onPressSpace = () => {},
  label = "",
  rows = 2,
  placeholder = "",
  name = "",
  value = "",
}: Props) {
  const onKeyDown = (e: KeyboardEvent<HTMLImageElement>) => {
    if (e.key === " ") {
      onPressSpace();
    }
  };
  return (
    <TextareaWrapper>
      <Typography
        variant="body2"
        color="secondary"
        sx={{ textTransform: "uppercase" }}
      >
        {label}
      </Typography>
      <TextField
        hiddenLabel
        name={name}
        value={value}
        multiline
        variant="filled"
        rows={rows}
        placeholder={placeholder}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </TextareaWrapper>
  );
}

const TextareaWrapper = styled(Box)(({ }) => ({
  width: "100%",
}));
