import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { setting_shine } from "assets/svgs";
import styled from "styled-components";
import { Box, Tooltip, FormControl, Grid, Image, FormLabel, Input, Center, Link, Flex, Stack, SimpleGrid, VStack, Text, Button, IconButton, HStack } from "@chakra-ui/react";


export function SelfDestructPinSuccess() {
  const navigate = useHistory();

  useEffect(() => {
    setTimeout(() => {
      navigate.push("/setting");
    }, 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box px="2" pt="20">
      <Center maxW="container.lg" minH="600" mx="auto" pb="8">
        <Stack p="8" rounded="lg" shadow="card">
          <SelfDestructPinSuccessContainer >
            <Box p="2" align="center">
              <img src={setting_shine} alt="shine" />
              <Text textAlign="center" color="red.500" fontSize="lg" fontWeight="600">Self Destruct PIN is armed</Text>
            </Box>
            <hr />
            <Text p="2" textAlign="center" fontSize="sm">
              This PIN will <strong>delete all app data from your device</strong> when you log into Finnie.
              <br />
              Use your <strong>recovery phrase</strong> to access your data from any device at a later date.
            </Text>
            <Text p="2" fontWeight="600" fontSize="lg" textAlign="center" color="red.500">
              Returning to home screen in 5...
            </Text>
          </SelfDestructPinSuccessContainer>
        </Stack>
      </Center>
    </Box>
  );
}



export const SelfDestructPinSuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  .lbl-cap1 {
    margin-top: -70px;
  }
  .lbl-desc1 {
    line-height: 28px !important;
    span {
      color: red.500 !important;
      &.text-underline {
        color: black !important;
      }
    }
  }
`;

