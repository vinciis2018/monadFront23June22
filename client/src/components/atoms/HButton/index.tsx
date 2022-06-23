import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

interface Props {
  type?: "button" | "submit";
  title: string;
  onClick?: () => void;
  icon?: any;
  sx?: any;
}

export default function HButton({
  title,
  onClick,
  icon,
  type = "button",
  sx,
}: Props) {
  return (
    <StyledButton
      sx={sx}
      type={type}
      onClick={onClick}
      startIcon={icon && <img src={icon} alt="icon" />}
    >
      <Typography variant="body2" color="primary">
        {title}
      </Typography>
    </StyledButton>
  );
}

const StyledButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(90deg, #EEEEEE 0%, #FFFFFF 100%)",
  borderRadius: 2,
  width: 200,
  height: 46,
}));
