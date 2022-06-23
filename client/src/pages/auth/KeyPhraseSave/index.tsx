import { useEffect, useState } from "react";

import { bk_key_part1, icon_check, icon_lock, warning_icon } from "assets/svgs";
import CryptoBoard from "components/atoms/CryptoBoard";
import HButton from "components/atoms/HButton";
import HLoading from "components/atoms/HLoading";
import { useHistory } from "react-router-dom";
// import { KeyPhaseSaveContainer } from "./style";
import { useWallet, useBackup } from "components/contexts";
import { Box, Tooltip, FormControl, Image, FormLabel, Input, Center, Link, Flex, Stack, SimpleGrid, VStack, Text, Button, IconButton, HStack } from "@chakra-ui/react";
import styled from "styled-components";

export function KeyPhraseSave() {
  const navigate = useHistory();
  const { showBackup, setShowBackup } = useBackup();
  const [showKeys, setShowKeys] = useState<boolean>(false);
  const [keys, setKeys] = useState<any>(false);

  const { mnemonics, isLoading } = useWallet();
  console.log("isLoading", mnemonics);


  useEffect(() => {
    if(!mnemonics) {
      navigate.push("/login")
    }
  }, [navigate])

  const onClick = async () => {
    navigate.push("/key-confirm");
  };

  const openKeyModal = () => {
    setKeys(!keys)
  }
  return (
    <Box px="2" pt="20">
      <Center maxW="container.lg" minH="600" mx="auto" pb="8">
        <Stack p="8" rounded="lg" shadow="card" align="center">
          <Text align="center" fontWeight="" p="2" fontSize="lg">You are about to enter the new world of advertising</Text>
          <Text align="center" fontWeight="" p="2" fontSize="xs">
            Grab a pen and paper and keep your
            recovery phrase somewhere safe.<br /> 
            Try to keep it off any internet-connected
            device.
          </Text>
          <Box align="center">
            <img src={warning_icon} alt="warning" />
          </Box>
          <Text align="center" fontWeight="600" p="2" fontSize="sm">
            Never disclose your recovery phrase.
            <br />
            Anyone with this phrase can steal from your wallet.
          </Text>
          <Box onClick={() => setShowKeys(!showKeys)}>
            <KeyPhaseSaveContainer>
              {mnemonics && (
                <Stack>
                  {/* <Text>{mnemonics.split(" ")}</Text> */}
                  {showKeys && (
                    <>
                      <CryptoBoard mnemonics={mnemonics} />
                    </>
                  )}
                  {!showKeys && (
                    <>
                      <Text >
                        When you have a pen & paper ready.
                        tap to reveal phrase.
                      </Text>
                      <CryptoBoard
                        mnemonics={mnemonics}
                        sx={{ filter: "blur(4px)", background: "none !important" }}
                      />
                    </>
                  )}
                </Stack>
              )}
            </KeyPhaseSaveContainer>
          </Box>
          <Text onClick={() => setShowBackup(true)} textAlign="center">I don’t have a pen, skip back up for now.</Text>
          <Button width="50%" variant="outline" color="violet.500" onClick={onClick}> Continue</Button>
          
          {isLoading && ( <HLoading loading={isLoading} />  )}
        </Stack>
      </Center>
    </Box>
  );
}


export const KeyPhaseSaveContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background: teal.200;
  padding: 20px;
  div {
    z-index: -1;
  }

  .bk-part1 {
    position: absolute;
    color: violet;
    left: 0;
    top: 0;
    right: 0;
    width: 100%;
    z-index: -1;
  }
  .keyword-area {
    position: relative;
    .opacity-area {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: #f5f5f526;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 2px;
    }
  }
  .lbl-desc1 {
    font-size: 12px;
  }
  @media (max-width: 321px) {
    width: 100vw;
  }
`;