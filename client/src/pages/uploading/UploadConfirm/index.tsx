import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

// hooks
import { useIpfs, useLogin, useUpload, useWallet } from "components/contexts";
import HLoading from "components/atoms/HLoading";
import HChip from "components/atoms/HChip";
import { icon_check, icon_back2, icon_close } from "assets/svgs";

import { ContentUploadService } from "services";
import { getFormattedDateFromTimestamp } from "utils/util";
import { ERROR_IDS } from "utils/constants";
import { Box, Tooltip, Checkbox, FormControl, Image, FormLabel, Slider, SliderTrack, SliderMark, SliderFilledTrack, SliderThumb, Input, Center, Link, Flex, Stack, SimpleGrid, VStack, Text, Button, IconButton, HStack } from "@chakra-ui/react";
import { Login } from "pages/auth";
import { LoginHelper } from "components/helpers";

export function UploadConfirm() {
  const navigate = useHistory();
  const [loading, setLoading] = useState(false);
  const [enterPin, setEnterPin] = useState(false)
  const { addFile } = useIpfs();
  const {  isUnlocked, getArweavePublicAddress, isConnected, signMessage } = useWallet();


  const { imageUrl, tags, title, description, nsfw, releaseDate } = useUpload();

  useEffect(() => {
    if(!isConnected) {
      // window.alert("Please unlock wallet first")
      setEnterPin(true)
    }
  }, []);

  const onClickUpload = () => {
    setLoading(true);
    addFile(imageUrl).then(({ cid }) => {
      const strCid = cid.toString();
      return signMessage(strCid)
        .then((cidSignature) =>
          ContentUploadService.submitCidWithMetadata({
            name: title,
            description,
            tags,
            nsfw,
            owner: getArweavePublicAddress(),
            cid: strCid,
            cidSignature,
          })
        )
        .catch((error: Error) => {
          setLoading(false);
          if (error.message?.includes(ERROR_IDS.WALLET_LOCKED)) {
            navigate.push("/login");
          }
        })
        .then(() => {
          navigate.push("/upload-success");
        });
    });
  };

  return (
    <Box px="2" pt="20">
      <Center maxW="container.lg" minH="600" mx="auto" pb="8">
        <Stack p="8" rounded="lg" shadow="card">
          <Flex p="4" justify="space-between" align="center">
            <img
              onClick={() => navigate.push("/upload-delay")}
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
          {loading && (
              <HLoading loading={loading} />
          )}
 
          {!enterPin ? (
            <SimpleGrid columns={[1, 2]} gap="2">
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
                <Text py="4" fontSize="" fontWeight="600">
                  Will be published on{" "}
                  {getFormattedDateFromTimestamp(
                    "MMMM D, YYYY",
                    releaseDate as number
                  )}
                </Text>
                <hr />
                <Text py="2" textAlign="center" fontSize="" fontWeight="600">Upload Now</Text>
                <Text py="1" fontSize="xs" >
                  Upload your file now for free. 
                  <br />
                  Once enough people look at your content, 
                  <br />
                  you can add it to a permanent archive using attention rewards.
                  <br />
                  <span className="text-underline mt-10" style={{ color: "#5ED9D1" }}>
                    Learn More
                  </span>
                </Text>
                <Button width="100%" variant="outline" color="violet.500" onClick={onClickUpload} >Upload</Button>
                <Box align="center">
                  <Text p="4" fontSize="sm" fontWeight="600">
                    Already have KOII and AR?
                    <br />
                    <span
                      className="text-underline"
                      style={{ color: "#FCC78F" }}
                      onClick={() => navigate.push("/upload-archive")}
                    >
                      Pay now to archive immediately.
                    </span>
                  </Text>
                </Box>
                <hr />

              </Box>
            </SimpleGrid>
          ) : (
            <LoginHelper />
          )}
          
        </Stack>
      </Center>
    </Box>
    
  );
}

