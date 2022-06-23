import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useGallery } from "components/contexts";
import HLoading from "components/atoms/HLoading";
import { ImageMetadataWithBase64 } from "models";
import { Box, Tooltip, FormControl, Grid, Image, FormLabel, Input, Center, Link, Flex, Stack, SimpleGrid, VStack, Text, Button, IconButton, HStack } from "@chakra-ui/react";

export function GalleryView() {
  const navigate = useHistory();
  const [imageList, setImageList] = useState<ImageMetadataWithBase64[]>([]);

  const { $galleryData, loading, startLoadLoop, stopLoadLoop } = useGallery();

  useEffect(() => {
    startLoadLoop();
    return () => stopLoadLoop();
    //TODO: addition of startLoadLoop and stopLoadLoop in deps causes infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if ($galleryData) {
      $galleryData.then(setImageList);
    }
  }, [$galleryData]);

  return (
    <Box px="2" pt="20">
      <Center maxW="container.lg" minH="600" mx="auto" pb="8">
        <Stack p="8" rounded="lg" shadow="card">
          <Box sx={{ padding: "5px" }}>
            <ImageList sx={{ width: "100%" }} cols={3} rowHeight={126}>
              {imageList.map((image) => (
                <ImageListItem key={image.cid}>
                  <img
                    src={image.base64}
                    alt="icon"
                    loading="lazy"
                    style={{ overflow: "overlay" }}
                    onClick={() => {
                      navigate.push(`/gallery-detail?img=${image.cid}`);
                    }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
          <HLoading loading={loading} />
        </Stack>
      </Center>
    </Box>
  );
}
