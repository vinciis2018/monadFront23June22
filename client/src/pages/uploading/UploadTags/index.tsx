import { useCallback, useState, useEffect } from "react";
// hooks
import { useUpload } from "components/contexts";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import { AiOutlineArrowLeft, AiOutlineUpload } from "react-icons/ai"
import { useDropzone } from "react-dropzone";

import { icon_check, icon_back2, icon_close } from "assets/svgs";
import HChip from "components/atoms/HChip";
import { Box, Tooltip, Checkbox, FormControl, Image, FormLabel, Input, Center, Link, Flex, Stack, SimpleGrid, VStack, Text, Button, IconButton, HStack } from "@chakra-ui/react";
import { MessageBox } from "components/helpers";
import { convertToAr, getMediaType } from "services/utils";

export function UploadTags() {
  const navigate = useHistory();
  
  const { imageUrl, setImageUrl, tags, setTags, setDescription, setTitle, setNsfw } = useUpload();
  const [myTitle, setMyTitle] = useState<any>("");
  const [myDescription, setMyDesription] = useState<any>("");
  const [myNsfw, setMyNsfw] = useState<any>("");
  const [tagString, setTagString] = useState<any>("");

  const [err, setErr] = useState<any>("");


  useEffect(() => {
    if (tagString) {
      setTags(
        tagString.split(",").map((_string: any) => _string.split(" ").join(""))
      );
    }
    if(imageUrl) {
      setImageUrl(imageUrl);
    }
  }, [setTags, tagString, imageUrl]);

  const onSubmit = () => {
    let error = "";
    if (!imageUrl) error = "No media found"
    if (myTitle === "") error = "Please input a title";
    if (myDescription === "") error = "Please input a description";
    if (error !== "") {
      setErr(error);
    } else {
      setErr("");
      setTitle(myTitle);
      setDescription(myDescription);
      setNsfw(myNsfw);
      navigate.push("/upload-delay");
    }
  }

  return (
    <Box px="2" pt="20">
      <Center maxW="container.lg" minH="600" mx="auto" pb="8">
        <Stack p="8" rounded="lg" shadow="card">
          <Flex p="4" justify="space-between" align="center">
            <img
              onClick={() => navigate.push("/upload-photos")}
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
          <Stack>
              <Box onClick={() => setImageUrl("")}>
                <ThumbnailContainer fileThumbnail={imageUrl} file={imageUrl} />
              </Box>
            {/* <Image rounded="lg" src={imageUrl} alt="icon" width={"auto"} height={111} onClick/> */}
            <FormControl id="title">
              <FormLabel fontSize="xs">Find the perfect name</FormLabel>
              <Stack direction="row" align="center">
                <Input 
                  id="title"
                  onChange={(e) => {
                    setMyTitle(e.target.value);
                  }} 
                  placeholder={myTitle} 
                  value={myTitle}
                  type="text"  
                />
              </Stack>
            </FormControl>
            <FormControl id="description">
              <FormLabel fontSize="xs">Tell everyone about it</FormLabel>
              <Stack direction="row" align="center">
                <Input 
                  id="description"
                  onChange={(e) => {
                    setMyDesription(e.target.value);
                  }} 
                  placeholder={myDescription} 
                  value={myDescription}
                  type="text"  
                />
              </Stack>
            </FormControl>
            <FormControl id="tags">
              <FormLabel fontSize="xs">Input tags here with a “,” and hit space bar</FormLabel>
              <Stack direction="row" align="center">
                <Input 
                  id="tags"
                  onChange={(e) => {
                    setTagString(e.target.value);
                  }} 
                  placeholder={tagString} 
                  value={tags}
                  type="text"  
                />
              </Stack>
            </FormControl>
            {tags && tags.length > 0 && (
              <SimpleGrid columns={[3, 5, 7]} gap="2">
                {tags.map((_tag, _i) =>
                  _tag ? (
                    <Flex p="1" key={_i}>
                      <HChip title={_tag} />
                    </Flex>
                  ) : (
                    <div key={_i}></div>
                  )
                )}
              </SimpleGrid>
            )}
              <FormControl id="nsfw">
                <FormLabel> This content is{" "}
                  <strong style={{ color: "#FCC78F" }}>Explicit or 18+.</strong></FormLabel>
                <Stack direction="row" align="center">
                  <Checkbox id="nsfw" onChange={(e) => setMyNsfw(e.target.value)} flexShrink="0">
                    NSFW
                  </Checkbox>
                </Stack>
              </FormControl>
              {err && <MessageBox variant="danger">{err}</MessageBox>}
            <Button variant="outline" color="violet.500" onClick={onSubmit}>Submit</Button>
          </Stack>
        </Stack>
      </Center>
    </Box>
  );
}


const ThumbnailContainer = ({ file, fileThumbnail }: { file: any; fileThumbnail: any }) => {
  let mediaType;

  useEffect(() => {
    if(file?.type) {
      mediaType = getMediaType(file?.type);
    } else {
      mediaType = file.split(";")[0]
    }
    console.log(mediaType)
  }, [mediaType])

  return (
    <>
      <Text align="center" fontSize="xs">Click to upload a new one from your storage</Text>
      {mediaType === "image" || "data:image/png" || "data:image/jpeg" ? (
        <Image src={fileThumbnail} alt="click to upload" boxSize="100%" objectFit="cover" width={"auto"} height={111} />
      ) : mediaType === undefined ? (
        <Image src={fileThumbnail} />
      ) : mediaType === "data:video/mp4" ? (
        <Box rounded="md" as="video" height="100%" width="100%" muted autoPlay playsInline>
          <source src={fileThumbnail} />
        </Box>
      ) : (
        <Box rounded="md" as="video" height="100%" width="100%" muted autoPlay playsInline>
          <source src={fileThumbnail} />
        </Box>
      )}
    </>
  );
};
