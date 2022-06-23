import { useEffect, useState } from "react";
import query from "query-string";
import { icon_check } from "assets/svgs";
import HButton from "components/atoms/HButton";
import { useLocation } from "react-router-dom";
import { useGallery } from "components/contexts";
import { ImageMetadataWithBase64 } from "models";
import { Box, Tooltip, FormControl, Grid, Image, FormLabel, Input, Center, Link, Flex, Stack, SimpleGrid, VStack, Text, Button, IconButton, HStack } from "@chakra-ui/react";

export function GalleryDetail() {
  const location = useLocation();
  const search = query.parse(location.search);
  const [selectedImage, setSelectedImage] = useState<
    ImageMetadataWithBase64 | undefined
  >(undefined);
  const cid = search.img as string | undefined;

  const { $galleryData, getByCid } = useGallery();

  useEffect(() => {
    if (cid) {
      getByCid(cid).then((image) => {
        if (image) {
          setSelectedImage(image);
        }
      });
    }
  }, [cid, $galleryData, getByCid]);

  return (
    <Box px="2" pt="20">
      <Center maxW="container.lg" minH="600" mx="auto" pb="8">
        <Stack p="8" rounded="lg" shadow="card">
          <Box
            sx={{
              paddingBottom: "40px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "100%",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
              }}
            >
              <img src={selectedImage?.base64 || ""} alt="icon" width="100%" />
            </Box>
            <HButton
              icon={icon_check}
              title="Add Details"
              sx={{ margin: "0 auto", marginTop: "44px" }}
            />
          </Box>
        </Stack>
      </Center>
    </Box>
  );
}
