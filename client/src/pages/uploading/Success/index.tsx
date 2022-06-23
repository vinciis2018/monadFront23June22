import { useState } from "react";
import { dots, icon_check, upload_success } from "assets/svgs";
import {
  icon_share_active,
  icon_embeded_inactive,
  icon_copy_inactive,
  icon_back2, icon_close,
  icon_embeded_active,
  icon_share_inactive,
} from "assets/svgs";
import { Box, Tooltip, Checkbox, FormControl, Image, FormLabel, Slider, SliderTrack, SliderMark, SliderFilledTrack, SliderThumb, Input, Center, Link, Flex, Stack, SimpleGrid, VStack, Text, Button, IconButton, HStack } from "@chakra-ui/react";
import { AiOutlineCopy, AiOutlineShareAlt, AiOutlineCheck } from "react-icons/ai";
import { useHistory } from "react-router-dom";

export function Success() {
  const navigate = useHistory();
  const [linkType, setLinkType] = useState("share");
  const [copied, setCopied] = useState(false);
  return (
    <Box px="2" pt="20">
      <Center maxW="container.lg" minH="600" mx="auto" pb="8">
        <Stack p="8" rounded="lg" shadow="card">
          <Flex p="4" justify="space-between" align="center">
            <img
              onClick={() => navigate.push("/upload-confirm")}
              src={icon_back2}
              alt="back"
            />
            <Text fontSize="lg" fontWeight="600" >
              NFT Creation
            </Text>
            <img
              onClick={() => navigate.push("/upload")}
              src={icon_close}
              alt="close"
            />
          </Flex>
          <hr />
          <Box align="center">
            <Tooltip rounded="lg" shadow="card" bgColor="violet.500" p="4" label="paisa hi paisa hoga" aria-label='A tooltip'>
              <Image  alt="paisa hi paisa hoga" p="4" src={`https://cdn3d.iconscout.com/3d/premium/thumb/funny-activity-3027486-2526705.png`}/>
            </Tooltip>
            <Text textAlign="center" fontSize="sm"> Your media is being archived </Text>
            <Text p="2" align="center" fontSize="xs" fontWeight="600">
              When your content gets enough traffic, you will be able to store it permanently using attention rewards.
            </Text>
            <Box display="flex" justifyContent="center" sx={{ marginY: "24px" }}>
              <Stack spacing="34px" direction="row">
                <AiOutlineShareAlt fontSize="40px" color="teal" onClick={() => setLinkType("share")}/>
                <AiOutlineCopy fontSize="40px" color="indigo" onClick={() => setLinkType("embed")} />
              </Stack>
            </Box>
            <Box p="2">
              <Text fontSize="sm" fontWeight="600">
                {linkType === "share" ? "Share" : "Embed"}
              </Text>
              <Text fontSize="xs">
                {linkType === "share"
                  ? `https://permalinkgoeshere.com/whatever123456123`
                  : `<iframe width="100%" src="https://koi.rocks/embed/6mdPEHLLIyZgEKZT9ijGMsDOGL82M0RQfz4yj_vkEs8" title="Koii  NFT image" frameborder="0" allowfullscreen></iframe>`}
              </Text>
            </Box>
            
            <Button
              m="2"
              variant="outline"
              color="violet.500"
              width="100%"
              rightIcon={"copied" ? <AiOutlineCheck /> : <AiOutlineCopy />}
              onClick={() => {
                setCopied(true);
                navigator.clipboard.writeText("");
              }}
            >{copied ? "Copied!" : "Copy Link"}</Button>
          </Box>
        </Stack>
      </Center>
    </Box>
    
  );
}
