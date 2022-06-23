import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Lottie from "lottie-react";
import animationData from "assets/json/animation.json";

interface Props {
  handleClose?: () => void;
  loading: boolean;
}

export default function HLoading({
  loading = false,
  handleClose = () => {},
}: Props) {
  return (
    <Backdrop
      sx={{
        width: "100%",
        color: "#fff",
        zIndex: 100,
      }}
      open={loading}
      // onClick={handleClose}
    >
      <Lottie
        animationData={animationData}
        style={{ width: "200px", height: "200px" }}
      />
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
