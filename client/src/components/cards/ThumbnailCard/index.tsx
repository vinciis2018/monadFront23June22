import { Link as RouterLink } from "react-router-dom";
import { useState, memo } from "react";
import { motion } from "framer-motion";
// api
import { useNft } from "api/hooks";
// ui
import { Flex, Link, Box, Heading, Text, Center, Spinner, Stack, ButtonGroup, Button, Skeleton, useDisclosure } from "@chakra-ui/react";
// assets
import fallbackImage from "assets/fallback.png";
import { ThumbnailContainer } from "../NftFeaturedCard";

interface Props {
  nft: Record<string, any>;
}

export const ThumbnailCard = memo<Props>(
  ({ nft }) => {
    const MotionFlex = motion(Flex);
    const { data: item, isLoading } = useNft({ id: nft?.id });
    console.log(item)

    return (
      <>
        {isLoading && (
          <Stack w="100%" spacing="4">
            <Skeleton h="200px" w="100%" />
            <div>
              <Skeleton h="50px" w="100%" mb="2" />
              <Skeleton h="50px" w="100%" />
            </div>
          </Stack>
        )}
        <MotionFlex
          flexDir="column"
          w="100%"
          role="group"
          rounded="md"
          shadow="card"
          whileHover={{
            translateY: -3
          }}
          pos="relative"
          zIndex="1"
        >
          {/* Link wrapper */}
          <Link as={RouterLink} to={`/nft/${nft?.id}`} pos="absolute" w="100%" h="100%" top="0" left="0" zIndex="2" rounded="md" />
          {/* Thumbnail */}
          <Box justify="center" align="center">
            <ThumbnailContainer nft={item} />
          </Box>
        </MotionFlex>
      </>
    );
  },
  (prev, next) => {
    return prev.nft?.id === next.nft?.id;
  }
);
