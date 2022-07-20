import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
// hooks
import { useLogin, useUpload } from "components/contexts";
import { styled, useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
import { useLocation } from "react-router-dom";
import CameraHandlers from "components/helpers/CameraHandlers";
import { Camera } from "react-camera-pro";
import {
  CameraType,
  FacingMode,
} from "react-camera-pro/dist/components/Camera/types";

import {
  icon_bag_inactive,
  icon_bag,
  icon_back,
  icon_camera,
  icon_camera_inactive,
  icon_expanded,
  icon_lock,
  icon_back2,
  icon_close,
  icon_photo,
  icon_collapsed,
  arrow_left,
  arrow_right,
  icon_embeded_active,
  icon_embeded_inactive,
  icon_photo_active,
  icon_expanded_dark,
} from "assets/svgs";
import HIconButton from "components/atoms/HIconButton";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Text,
  Tooltip,
  Image,
  Button,
  Flex
} from '@chakra-ui/react'

import { AiOutlineArrowLeft, AiOutlineLock, AiOutlineSetting, AiOutlineCamera, AiOutlineHome } from "react-icons/ai";
import {GrGallery} from "react-icons/gr";

interface Props {
  children: React.ReactNode;
  bgColor?: string;
  paddingTop?: string;
}

const topRoutes = [
  {
    icon_active: icon_embeded_active,
    icon_inactive: icon_embeded_inactive,
    link: "/gallery",
  },
  {
    icon_active: icon_photo_active,
    icon_inactive: icon_photo,
    link: "/gallery",
  },
  {
    icon_active: icon_camera,
    icon_inactive: icon_camera_inactive,
    link: "/upload",
  },
  {
    icon_active: icon_bag,
    icon_inactive: icon_bag_inactive,
    link: "/setting",
  },
];

export default function LayoutUpload(props: Props) {
  const navigate = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { setImageUrl } = useUpload();
  const camera = useRef<CameraType>(null);
  const [facingMode, setFacingMode] = useState<FacingMode>("environment");
  const theme = useTheme();
  const {
    children,
    bgColor = theme.palette.primary.main,
    paddingTop = "90px",
  } = props;
  const { lock } = useLogin();
  // const [openNavDrawer, setOpenNavDrawer] = useState(false);
  const { pathname } = useLocation();
  const curRouteIndex = topRoutes.findIndex((_route) =>
    pathname.includes(_route.link)
  );

  const lockScreen = () => {
    lock();
  };


  return (
    <Layout sx={{ paddingTop: paddingTop }}>
      <Box p="2" onClick={onOpen}>
        <Text p="2" textAlign="center" fontSize="sm" color="green.500">
          Live broadcasting will be here soon...
        </Text>
      </Box>
      
      <Drawer
        isOpen={isOpen}
        placement='top'
        onClose={onClose}
        size= {"full"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton onClick={() => onClose()} />
          {/* <DrawerHeader direction="row" p="4" align="center">
            <Flex pt="10" align="center" justify="space-between">
              <AiOutlineHome onClick={() => navigate.push("/")} size="20px" color="black"/>
              <GrGallery onClick={() => navigate.push("/gallery")} size="20px" color="black" />
              <AiOutlineCamera onClick={() => navigate.push("/upload")} size="20px" color="black" />
              <AiOutlineSetting onClick={() => navigate.push("/setting")} size="20px" color="black" />
              <AiOutlineLock onClick={lockScreen} size="20px" color="black" />
            </Flex>
          </DrawerHeader> */}
          <DrawerBody pt="10">
            {children}
            {pathname !== "/upload" ? (
              <Box>
                <AiOutlineArrowLeft
                  color="black"
                  onClick={() => navigate.goBack()}
                />
              </Box>
            ) : (
              <Box>
                <div style={{ width: "40px" }}>&nbsp;</div>
              </Box>
            )}
            <Box pb="20">
              <img
                src={
                  bgColor === theme.palette.primary.main
                    ? isOpen
                      ? icon_expanded
                      : icon_collapsed
                    : icon_expanded_dark
                }
                alt="icon"
                style={{ marginTop: 30 }}
                onClick={onOpen}
              />
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Layout>
  );
}

const Layout = styled(Box)(({ }) => ({
  width: "100%",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
}));
