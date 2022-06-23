import CameraHandlers from "components/helpers/CameraHandlers";
import { useHistory } from "react-router-dom";
import { Text, Box, Stack, Center, Tooltip, Image } from "@chakra-ui/react";

export function CameraHome() {
  const navigate = useHistory();
  const onClick = () => {
    navigate.push("/upload");
  };
  return (
    <Box px="2" pt="20" onClick={onClick}>
      <Center maxW="container.lg" minH="600" mx="auto" pb="8">
        <Stack p="8" rounded="lg" shadow="card">
          <Tooltip rounded="lg" shadow="card" bgColor="violet.500" p="4" label="paisa hi paisa hoga" aria-label='A tooltip'>
            <Image  alt="paisa hi paisa hoga" p="4" src={`https://cdn3d.iconscout.com/3d/premium/thumb/investor-3025716-2526914.png`} />
          </Tooltip>
          <Text variant="h5" color="white.main" align="center">
            Take a photo or video and add
            <br /> it to the historical archive.
            <br /> Your content can’t be
            <br /> removed or deleted.
          </Text>
          <CameraHandlers />
        </Stack>
      </Center>
    </Box>
  );
}
