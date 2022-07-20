import { useCallback, useState, useEffect } from "react";
// hooks
import { useUpload } from "components/contexts";
import { useHistory } from "react-router-dom";
import { icon_back2, icon_close } from "assets/svgs";
import { Box, Tooltip, FormControl, Image, FormLabel, Input, Center, Link, Flex, Stack, SimpleGrid, VStack, Text, Button, IconButton, HStack } from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import { AiOutlineArrowLeft, AiOutlineUpload } from "react-icons/ai"
import { convertToAr, getMediaType } from "services/utils";

export function PhotoView() {
  // hooks
  const navigate = useHistory();
  const { imageUrl, setImageUrl } = useUpload();
  const [usingCam, setUsingCam] = useState<Boolean>(true);

  const [{ step, status, data }, setState] = useState<{ step: number; status: string; data: any }>({ step: 1, status: "idle", data: null });
  const onDropAccepted = useCallback(async acceptedFiles => {
    setState(prevState => ({ ...prevState, step: 2, data: { ...data?.prevState, file: acceptedFiles[0], fileThumbnail: URL.createObjectURL(acceptedFiles[0]) } }));
    // setImageUrl(acceptedFiles[0]);
    const file = acceptedFiles[0];
    new Promise((resolve,reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
   }).then((res) => {
      setImageUrl(JSON.stringify(res).replace(/^"(.*)"$/, '$1'))
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDropAccepted, accept: "image/*, video/*, .json", multiple: false, maxSize: 15728640 });

  useEffect(() => {
    if(imageUrl) {
      setUsingCam(true);
      setImageUrl(imageUrl);
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
              {/* <Image onClick={() => setImageUrl("")} rounded="lg" src={imageUrl} alt="icon" width="360px" /> */}
              <Box onClick={() => setImageUrl("")}>
                <ThumbnailContainer fileThumbnail={imageUrl} file={imageUrl} />
              </Box>
              <Button width="100%" variant="outline" color="violet.500" mt="4" onClick={() => navigate.push("/upload-tags")} >Add Details</Button>
            </Box>
           ) : (
             <Center flexDir="column" w="100%" bg="gray.100" border="1px dashed" p="2" borderColor="blue.500" rounded="md" cursor="pointer" {...getRootProps()}>
                <input {...getInputProps()} />
                <Box align="center" direction="column" maxW="500px" mx="auto" mt="2">
                  <AiOutlineUpload fontWeight="600" fontSize="2xl" />
                  <Text p="2" fontSize="sm">Click or drag n' drop here to upload. </Text>
                </Box>
              </Center>
           )}
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
