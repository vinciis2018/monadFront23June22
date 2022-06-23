import { Box, Tooltip, FormControl, Image, FormLabel, Input, Center, Link, Flex, Stack, SimpleGrid, VStack, Text, Button, IconButton, HStack } from "@chakra-ui/react";

import { styled } from "@mui/material/styles";

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  size?: number;
  sx?: any;
  bgColor?: string;
}

export default function HIconButton({
  children,
  onClick,
  size = 48,
  sx,
  bgColor = "#9BE7C4",
}: Props) {
  return (
    <Box
      onClick={onClick}
      style={{ width: size, height: size, backgroundColor: bgColor, ...sx }}
    >
      {children}
    </Box>
  );
}
