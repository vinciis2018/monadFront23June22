import { Box, Image, Slider, SliderTrack, SliderMark, SliderFilledTrack, SliderThumb, FormControl, Select, FormLabel, Input, Center, Link, Flex, Stack, SimpleGrid, Text, Button, IconButton, Wrap, WrapItem, Badge } from "@chakra-ui/react";


export function MessageBox(props: any) {
  return (
    <Box bg={props.variant === "danger" ? "red.200" : "green.100"} rounded="lg" shadow="card" p="4" m="2"> 
      <Text fontSize="sm" fontWeight="600">{props.children}</Text>
    </Box> 
  );
}
