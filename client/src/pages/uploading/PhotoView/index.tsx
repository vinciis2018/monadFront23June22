import { useState, useEffect } from "react";
// hooks
import { useUpload } from "components/contexts";
import { useHistory } from "react-router-dom";
import { icon_back2, icon_close } from "assets/svgs";
import { Box, Tooltip, FormControl, Image, FormLabel, Input, Center, Link, Flex, Stack, SimpleGrid, VStack, Text, Button, IconButton, HStack } from "@chakra-ui/react";
import { DragAndDropUploader } from "components/widgets";

export function PhotoView() {
  // hooks
  const navigate = useHistory();
  const { imageUrl } = useUpload();
  const [usingCam, setUsingCam] = useState<Boolean>(true);

  useEffect(() => {
    if(imageUrl) {
      setUsingCam(true);
    } else {
      setUsingCam(false);
    }
  }, [imageUrl, usingCam])
  return (
    <Box px="2" pt="20">
      <Center maxW="container.lg" minH="600" mx="auto" pb="8">
        <Stack p="8" rounded="lg" shadow="card">
          <Flex p="4" justify="space-between" align="center">
            <img
              onClick={() => navigate.push("/upload")}
              src={icon_back2}
              alt="back"
            />
            <Text fontSize="lg" fontWeight="600" >
              NFT Creation
            </Text>
            <img
              onClick={() => navigate.push("/")}
              src={icon_close}
              alt="close"
            />
          </Flex>
          <hr />
          {usingCam ? (
            <Box rounded="lg" align="center" >
              <Image rounded="lg" src={imageUrl} alt="icon" width="360px" />
              <Button width="100%" variant="outline" color="violet.500" mt="4" onClick={() => navigate.push("/upload-tags")} >Add Details</Button>
            </Box>
          ) : (
            <Box rounded="lg" align="center">
              <Text p="2" fontSize="xs" fontWeight="600">Upload any image, video or any other media file and store them forever as your own NFT. </Text>
              <DragAndDropUploader />
              <Tooltip rounded="lg" shadow="card" bgColor="violet.500" p="4" label="NFT matlab koii bhi media jiska ownership fix ho" aria-label='A tooltip'>
                <Box align="center" >
                  <Image  width="" alt="NFT matlab koii bhi media jiska ownership fix ho" p="4" src={`https://cdn3d.iconscout.com/3d/premium/thumb/searching-with-telescope-3025710-2526908.png`}/>
                </Box>
              </Tooltip>
            </Box>
          )}
        </Stack>
      </Center>
    </Box>
    
  );
}
