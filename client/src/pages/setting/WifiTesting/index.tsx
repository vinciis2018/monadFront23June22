import { useHistory } from "react-router-dom";
import {
  icon_back2,
  icon_close,
  icon_warning_triangle,
  warning_red_icon,
} from "assets/svgs";
import { Box, Tooltip, FormControl, Grid, Image, FormLabel, Input, Center, Link, Flex, Stack, SimpleGrid, VStack, Text, Button, IconButton, HStack } from "@chakra-ui/react";

export function WifiTesting() {
  const navigate = useHistory();

  return (
    <Box px="2" pt="20">
      <Center maxW="container.lg" minH="600" mx="auto" pb="8">
        <Stack p="8" rounded="lg" shadow="card">
            <Box>
              <Flex p="4" justify="space-between" align="center">
                <img
                  onClick={() => navigate.push("/setting")}
                  src={icon_back2}
                  alt="back"
                />
                <Text
                  fontSize="lg"
                  fontWeight="600"
                >
                  Turn Off WiFi
                </Text>
                <img
                  onClick={() => navigate.push("/setting")}
                  src={icon_close}
                  alt="close"
                />
              </Flex>
              <hr />
              <Box p="4" align="center">
                <img src={warning_red_icon} alt="warning" />
                <Text>
                  Turn off your WiFi if you are on a public
                  or unsecured network.
                  <br />
                  Accessing a public WiFi connection is an easy way
                  to steal your recovery phrase.
                </Text>
                <hr />
                <SimpleGrid pt="4" columns={[1, 2]} gap="4">
                  <Button variant="outline" color="violet.500" onClick={() => navigate.push("/setting")} >
                    Go to WiFi Settings
                  </Button>
                  <Button bgColor="violet.500" onClick={() => navigate.push("/setting")}>
                    My Network is Secure
                  </Button>
                </SimpleGrid>
              </Box>
            </Box>
          </Stack>
      </Center>
    </Box>
  );
}
