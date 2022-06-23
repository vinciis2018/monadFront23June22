/* eslint-disable no-console */
import { useState } from "react";
import {useHistory} from "react-router-dom";
// hooks
import { useUpload } from "components/contexts";
import { icon_check, icon_back2, icon_close } from "assets/svgs";
import LayoutUpload from "components/helpers/LayoutUpload";
import HChip from "components/atoms/HChip";
import { getFormattedDateFromTimestamp } from "utils/util";
import { Box, Tooltip, FormControl, Image, FormLabel, Input, Center, Link, Flex, Stack, SimpleGrid, VStack, Text, Button, IconButton, HStack } from "@chakra-ui/react";
import { MessageBox } from "components/helpers";

export function UploadArchive() {

  const navigate = useHistory();
  // hooks
  const [err, setErr] = useState("");

  const { imageUrl, tags, title, description, releaseDate } = useUpload();

  const onClickArchive = () => {
    setErr("coming soon");
    setTimeout(() => {
      setErr("");
    }, 3000);
    navigate.push("/upload-success");
  };

  return (
    <Box px="2" pt="20">
      <Center maxW="container.lg" minH="600" mx="auto" pb="8">
        <Stack p="8" rounded="lg" shadow="card">
          <Flex p="4" justify="space-between" align="center">
            <img
              onClick={() => navigate.push("/upload-success")}
              src={icon_back2}
              alt="back"
            />
            <Text fontSize="lg" fontWeight="600" >
              Wallet & Security
            </Text>
            <img
              onClick={() => navigate.push("/upload")}
              src={icon_close}
              alt="close"
            />
          </Flex>
          <hr />
          <SimpleGrid columns={[1, 2]} gap="4">
            <Box>
              <Stack p="4" align="center">
                <Image rounded="lg" src={imageUrl} alt="icon" height="360px" />
              </Stack>
              < hr />
            </Box>
            <Box p="4">
              <Text fontSize="" fontWeight="600">Title: {title} </Text>
              <Text py="1" fontSize="sm">Description: {description} </Text>
              {tags && tags.length > 0 ? (
                <Flex
                  py="2"
                  align="center"
                  justify="space-between"
                >
                  {tags
                    .filter((_tag, _i) => _i < 3)
                    .map((_tag, _i) =>
                      _tag ? (
                        <SimpleGrid key={_i}>
                          <HChip title={_tag} />
                        </SimpleGrid>
                      ) : (
                        <div key={_i}></div>
                      )
                    )}
                  {tags.length > 3 && (
                    <SimpleGrid>
                      <HChip title={`${tags.length - 3}+`} closable={false} />
                    </SimpleGrid>
                  )}
                </Flex>
              ) : (
                <></>
              )}
              <hr />
              <Text py="4" fontSize="xs" fontWeight="600">
                Will be published on{" "}
                {getFormattedDateFromTimestamp(
                  "MMMM D, YYYY",
                  releaseDate as number
                )}
              </Text>
              <hr />
              <Text pt="4" textAlign="center" fontWeight="600" fontSize="sm">
                Archive Content. Permanently
              </Text>
              <Text pb="2" fontSize="xs" fontWeight="600">
                Any files registered to Arweave using can never be removed or censored.
              </Text>
              <hr />
              <Stack>
                <Text
                  pt="4"
                  sx={{ color: "#5ED9D1", fontWeight: 600 }}
                >
                  Estimated Costs:
                </Text>
                <Flex align="center" justify="space-between">
                  <Text fontSize="xs">1 KOII</Text>
                  <Text fontSize="xs">0.0005 AR</Text>
                </Flex>
                
                <Text textAlign="center" fontWeight="600" fontSize="xs" sx={{ color: "#5ED9D1" }}>
                  (Storage Fee)
                </Text>
                <hr />
                {err && <MessageBox>{err}</MessageBox>}
                <Button variant="outline" color="violet.500" onClick={onClickArchive}>Archive</Button>

              </Stack>
            </Box>
          </SimpleGrid>
        </Stack>
      </Center>
    </Box>
  );
}

