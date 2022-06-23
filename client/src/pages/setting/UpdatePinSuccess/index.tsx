import { useHistory } from "react-router-dom";
import { setting_bk_bottom, setting_candy } from "assets/svgs";
import { Box, Tooltip, FormControl, Grid, Image, FormLabel, Input, Center, Link, Flex, Stack, SimpleGrid, VStack, Text, Button, IconButton, HStack } from "@chakra-ui/react";

export function UpdatePinSuccess() {
  const navigate = useHistory();

  return (
    <Box px="2" pt="20">
      <Center maxW="container.lg" minH="600" mx="auto" pb="8">
        <Stack p="8" rounded="lg" shadow="card">
          <Box bgColor="" align="center">
            <img src={setting_candy} alt="candy" />
          </Box>
          <Text color="green" txtAlign="center">
            Your Wallet Password updated successfully.
          </Text>
          <Text textAlign="center">
            Remember, don't share it with anyone.
          </Text>
          <Button variant="outline" color="violet.500" onClick={() => navigate.push("/setting")}>Back To Settings</Button>
        </Stack>
      </Center>
    </Box>
  );
}
