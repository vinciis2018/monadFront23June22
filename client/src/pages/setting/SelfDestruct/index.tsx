import { useHistory } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Box, Tooltip, FormControl, Grid, Image, FormLabel, Input, Center, Link, Flex, Stack, SimpleGrid, VStack, Text, Button, IconButton, HStack } from "@chakra-ui/react";
import {icon_close, icon_back2} from "assets/svgs";

export function SelfDestruct() {
  const theme = useTheme();
  const navigate = useHistory();
  return (
    <Box px="2" pt="20">
      <Center maxW="container.lg" minH="600" mx="auto" pb="8">
        <Stack p="8" rounded="lg" shadow="card">
          <Box sx={{ padding: "14px" }}>
          <Flex p="4" justify="space-between" align="center">
            <img
              onClick={() => navigate.push("/key-management")}
              src={icon_back2}
              alt="back"
            />
            <Text fontSize="lg" fontWeight="600" >
              Self Destruct PIN
            </Text>
            <img
              onClick={() => navigate.push("/setting")}
              src={icon_close}
              alt="close"
            />
          </Flex>
          <hr />
            <Text p="2" fontSize="sm" textAlign="center">
              The Self-Destruct PIN is a feature to{" "}
              <strong>
                help keep you safe
              </strong>
              , and you are best suited to decide how do to that.
            </Text>
            <hr />
            <Text p="2" textAlign="center" color="green.500">
              BASIC
            </Text>
            <hr />
            <Text p="2" fontSize="xs" textAlign="center">
              This PIN will delete all app data from your device when you log in.
              The app will remain but it will be empty.
            </Text>
            <hr />
            <Text p="2" textAlign="center" color="red.500">
              ADVANCED
            </Text>
            <hr />
            <Text fontSize="xs" fontWeight="600" p="2" textAlign="center">
              This PIN will delete all app data from your device and replace it with
              preselected data. It will look active, not empty.
              <br />You will select data now, from your camera roll or an existing list.
            </Text>
            < hr />
            <SimpleGrid p="2"  columns={[1, 2]} gap="4">
              <Button color="green.500" variant="outline">
                Basic
              </Button>
              <Button
                color="red.500"
                variant="outline"
                onClick={() => navigate.push("/setting/advanced")}
              >
                Advanced
              </Button>
            </SimpleGrid>
          </Box>
        </Stack>
      </Center>
    </Box>
  );
}
