import { KeyboardEvent, ChangeEvent } from "react";
import { Typography } from "@mui/material";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";

interface Props {
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onPressSpace?: () => void;
  label?: string;
  placeholder?: string;
  name?: string;
  value?: string;
}

export default function HTextareaResize({
  onChange,
  onPressSpace = () => {},
  label = "",
  placeholder = "",
  name = "",
  value = "",
}: Props) {
  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
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
      <TextareaAutosize
        name={name}
        value={value}
        minRows={1}
        placeholder={placeholder}
        onChange={onChange}
        onKeyDown={onKeyDown}
        style={{
          letterSpacing: "0.00938em",
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
          backgroundColor: "rgb(45, 45, 99)",
          transition: "border-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          fontSize: "14px",
          fontFamily: "Sora",
          color: "rgb(245, 245, 245)",
          width: "calc(100% - 14px)",
          padding: "7px",
          borderWidth: "0px",
          borderBottom: "2px solid white",
          outline: "none",
        }}
        className="textarea-resize"
      />
    </TextareaWrapper>
  );
}

const TextareaWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
}));
