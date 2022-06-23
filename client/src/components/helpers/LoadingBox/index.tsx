import { Box, Image, Spinner, SliderTrack, SliderMark, SliderFilledTrack, SliderThumb, FormControl, Select, FormLabel, Input, Center, Link, Flex, Stack, SimpleGrid, Text, Button, IconButton, Wrap, WrapItem, Badge } from "@chakra-ui/react";
import {ImSpinner9} from "react-icons/im"

export function LoadingBox() {
  return (
    <Center w="100%" minH={{ base: "300px", md: "600px" }}>
      <Spinner thickness="3px" speed="0.65s" emptyColor="gray.200" color="green.400" size="lg" />
  </Center>
  );
}
