import { useEffect, useState } from "react";
// hooks
import { styled } from "@mui/material/styles";
import { isPWA } from "utils/util";
import { Box, Tooltip, FormControl, Image, FormLabel, Input, Center, Link, Flex, Stack, SimpleGrid, VStack, Text, Button, IconButton, HStack } from "@chakra-ui/react";
import { MdOutlineFlipCameraAndroid, MdOutlineCamera } from "react-icons/md"
import { RiGalleryLine } from "react-icons/ri";

export default function CameraHandlers({
  onShut,
  onSwitch,
}: {
  onShut?: () => void;
  onSwitch?: () => void;
}) {
  const [pwaMode, setPwaMode] = useState(false);

  useEffect(() => {
    if (isPWA()) {
      setPwaMode(true);
    }
  }, []);

  return (
      <Flex p="4" align="center" justify="space-between">
        <MdOutlineFlipCameraAndroid  onClick={onSwitch} size="40px" color="gray" />
        <MdOutlineCamera onClick={onShut} size="40px" color="gray" />
        <RiGalleryLine size="40px" color="gray" />
      </Flex>
  );
}
