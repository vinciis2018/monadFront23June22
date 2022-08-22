import { useCallback, useEffect, useRef, useState } from "react";
import { isSeedPhraseSaved } from "services";
import { Camera } from "react-camera-pro";
import { useHistory } from "react-router-dom";
import { Box, Tooltip, FormControl, Image, FormLabel, Input, Center, Link, Flex, Stack, SimpleGrid, VStack, Text, Button, IconButton, HStack } from "@chakra-ui/react";
import { useLogin, useWallet } from "components/contexts";

import { KeyPhraseSaveModal } from "components/modals/KeyPhraseSaveModal";
import { useUpload } from "components/contexts";
import CameraHandlers from "components/helpers/CameraHandlers";
import LayoutUpload from "components/helpers/LayoutUpload";
import {
  CameraType,
  FacingMode,
} from "react-camera-pro/dist/components/Camera/types";
import { AiOutlineArrowLeft, AiOutlineUpload } from "react-icons/ai"


export function Active() {
  const navigate = useHistory();

  const { setImageUrl } = useUpload();
  const camera = useRef<CameraType>(null);
  const [facingMode, setFacingMode] = useState<FacingMode>("environment");
  const [showKeyPhraseSaveModal, setShowKeyPhraseSaveModal] = useState<boolean>(true);
  const { logoutUser } = useLogin();
  const { getArweavePublicAddress } = useWallet();
  

  const handleCloseModal = () => {
    setShowKeyPhraseSaveModal(false);
  };

  useEffect(() => {
    isSeedPhraseSaved().then((visited) => {
      setShowKeyPhraseSaveModal(!visited);
    });
  }, [getArweavePublicAddress()]);

  const handleSecureMyAccountClick = useCallback(() => {
    setShowKeyPhraseSaveModal(false);
    // navigate.push("/key-phrase-save");
    navigate.push("/key-phrase-save");
  }, [
    navigate
  ]);

  const takePhoto = async () => {
    if (camera.current) {
      const photo = camera.current.takePhoto();
      setImageUrl(photo);
      // navigate.push("/upload-photos");
      navigate.push("/upload-photos");
    }
  };

  const onSwitch = () => {
    facingMode === "user"
      ? setFacingMode("environment")
      : setFacingMode("user");
    if (camera.current) camera.current.switchCamera();
  };

  const lockScreen = () => {
    logoutUser();
  };

  return (
    <Box px="2" pt="20">
      <Center maxW="container.lg" minH="600" mx="auto" pb="8">
        <Stack p="8" rounded="lg" shadow="card">
          <Flex p="4" justify="space-between" align="center">
            <AiOutlineArrowLeft size="20px" color="black" onClick={() => navigate.push(`/`)} />
            <Text fontSize="xl" fontWeight="600" >
              Welcome to Finnie
            </Text>
            <AiOutlineUpload onClick={() => navigate.push("/upload-photos")} size="20px" color="black" />
          </Flex>
          <hr />

          <LayoutUpload paddingTop="0px">
            <Camera
              ref={camera}
              facingMode={facingMode}
              aspectRatio={1/2}
              errorMessages={{
                noCameraAccessible:
                  "No camera device accessible. Please connect your camera or try a different browser.",
                permissionDenied:
                  "Permission denied. Please refresh and give camera permission.",
                switchCamera:
                  "It is not possible to switch camera to different one because there is only one video device accessible.",
                canvas: "Canvas is not supported.",
              }}
            />
            <CameraHandlers onShut={takePhoto} onSwitch={onSwitch} />
  
          </LayoutUpload>
          <Tooltip rounded="lg" shadow="card" bgColor="violet.500" p="4" label="click karo, paisa hi paisa hoga" aria-label='A tooltip'>
            <Image  alt="click karo, paisa hi paisa hoga" p="4" src={`https://cdn3d.iconscout.com/3d/premium/thumb/startup-3025714-2526912.png`}/>
          </Tooltip>
          
          <KeyPhraseSaveModal
            onClose={handleCloseModal}
            open={showKeyPhraseSaveModal}
            onSecureMyAccountClick={handleSecureMyAccountClick}
          />
        </Stack>
      </Center>
    </Box>
  );
}
