import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Box, Tooltip, FormControl, Image, FormLabel, Input, Center, Link, Flex, Stack, SimpleGrid, VStack, Text, Button, IconButton, HStack } from "@chakra-ui/react";

interface Props {
  mnemonics: string;
  sx?: any;
}

export default function CryptoBoard({ mnemonics, sx }: Props) {
  const items = mnemonics.split(" ");

  return (
    <StyledBoard sx={sx}>
      <Box flex={1} >
        {items
          .filter((_item, _i) => _i < 6)
          .map((keyword, i) => (
            <Item key={i} label={`${i + 1}`} title={keyword} />
          ))}
      </Box>
      <Box flex={1}>
        {items
          .filter((_item, _i) => _i >= 6)
          .map((keyword, i) => (
            <Item key={i} label={`${i + 7}`} title={keyword} />
          ))}
      </Box>
    </StyledBoard>
  );
}

export const StyledBoard = styled(Box)(() => ({
  display: "flex",
  background: "#f5f5f526",
  borderRadius: "2px",
  padding: "16px 12px",
}));

export const Item = ({
  label,
  title,
}: {
  label: string;
  title: string | number;
}) => {
  return (
    <Box display="flex" alignItems="center" marginBottom="5px">
      <Text sx={{ color: "black", minWidth: "30px" }}>
        {label}.
      </Text>
      <Text sx={{ color: "black" }}>
        {title}
      </Text>
    </Box>
  );
};
