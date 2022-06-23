import { useState } from "react";
import { Box, Tooltip, Checkbox, FormControl, Image, FormLabel, Input, Center, Link, Flex, Stack, SimpleGrid, VStack, Text, Button, IconButton, HStack } from "@chakra-ui/react";
import { AiOutlineClose } from "react-icons/ai";

interface Props {
  title: string | number;
  closable?: Boolean;
}

export default function HChip({ title }: Props) {

  return (
    <Button color="black"  bgColor="gray.300">
        {title}
    </Button>
  );
}
