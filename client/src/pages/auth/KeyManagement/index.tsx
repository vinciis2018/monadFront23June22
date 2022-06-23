import { useEffect } from "react";
import { useWallet } from "components/contexts";
import mona_large from "assets/logo.png";
import koii_large from "assets/koii.png";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Box, Tooltip, FormControl, Image, FormLabel, Input, Center, Link, Flex, Stack, SimpleGrid, VStack, Text, Button, IconButton, HStack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react";
import {icon_close, icon_back2} from "assets/svgs";

//TODO: Remove it
export function KeyManagement() {
  const navigate = useHistory();

  const { getArweavePublicAddress } = useWallet();

  useEffect(() => {
    const data = getArweavePublicAddress();
    if(!data) {
      navigate.push("/login")
    }
  }, [navigate])

  const onClick = () => {
    navigate.push("/key-phrase-save");
  };
  return (
    <Box px="2" pt="20">
      <Center maxW="container.lg" minH="600" mx="auto" pb="8">
        <Stack p="8" rounded="lg" shadow="card" align="center">
          <KeyManagementContainer>
            <Flex p="4" justify="space-between" align="center">
              <img
                onClick={() => navigate.push("setting")}
                src={icon_back2}
                alt="back"
              />
              <Text fontSize="lg" fontWeight="600" >
                Welcome to Finnie
              </Text>
              <img
                onClick={() => navigate.push("/setting")}
                src={icon_close}
                alt="close"
              />
            </Flex>
            <hr />
            <Flex justify="center" align="center">
              <Image width="10%" src={mona_large} />
              <Text pt="20" fontSize="xs" fontWeight="600">Powered by</Text>
              <Image width="10%" src={koii_large} />
            </Flex>
            <Text p="4" fontSize="sm" textAlign="center" >
              Get a cryptographically secured
              key so that you can create and <br />
              permanently archive content
              while staying anonymous.
            </Text>
            <Button m="4" variant="outline" color="violet.500" onClick={onClick} >Get a Key</Button>
            <Text p="4" textAlign="center">
              Already have Finnie? Connect your existing key with a <br />
              <strong
                onClick={() => navigate.push("/key-recovery")}
              >
                RECOVERY PHRASE
              </strong>
            </Text>
          </KeyManagementContainer>
        </Stack>
      </Center>
    </Box>
  );
}


export const KeyManagementContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  div {
    z-index: 1;
  }

  .bk-part1 {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    width: 100%;
    z-index: 0;
  }
  .bk-part2 {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 200px;
    z-index: 0;
  }
  .koii-large {
    margin-top: 150px;
  }
  .colorWhite {
    color: white !important;
  }
  .colorGreen {
    color: green.500 !important;
  }
  @media (max-width: 321px) {
    width: 100vw;
  }
`;
