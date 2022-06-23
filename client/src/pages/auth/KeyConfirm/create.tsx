import { useState } from "react";
// hooks
import { useWallet, useBackup } from "components/contexts";

import styled from "styled-components";

import { icon_check, warning_icon, icon_back2, icon_close } from "assets/svgs";
import HLoading from "components/atoms/HLoading";
import { useHistory } from "react-router-dom";
import { suffleArray } from "utils/util";
import { Box, Tooltip, FormControl, Image, FormLabel, Input, Center, Link, Flex, Stack, SimpleGrid, VStack, Text, Button, IconButton, HStack } from "@chakra-ui/react";
import { LoadingBox, MessageBox } from "components/helpers";

export default function KeyCheck() {
  const navigate = useHistory();
  const { setShowBackup } = useBackup();
  const { mnemonics, isLoading } = useWallet();

  const [suggestKeys, setSuggestKeys] = useState(
    suffleArray(mnemonics?.split(" ") || [])
  );
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [err, setErr] = useState("");

  const onClick = async () => {
    if (selectedKeys.length !== 12) {
      setErr("Please select 12 words");
    } else {
      setErr("");
      if (selectedKeys.join(" ") === mnemonics) {
        navigate.push("/pin-create");
      } else {
        setErr("Mnemonics does not match!");
      }
    }
  };

  const selectKey = (aKey: string) => {
    setSuggestKeys(suggestKeys.filter((k) => k !== aKey));
    setSelectedKeys(selectedKeys.concat([aKey]));
  };
  const removeKey = (aKey: string) => {
    setSelectedKeys(selectedKeys.filter((k) => k !== aKey));
    setSuggestKeys(suggestKeys.concat([aKey]));
  };

  return (
    <Box px="2" pt="20">
      <Center maxW="container.lg" minH="600" mx="auto" pb="8">
        <Stack p="8" rounded="lg" shadow="card">
          <HLoading loading={isLoading} />
          <Flex p="4" justify="space-between" align="center">
            <img
              onClick={() => navigate.push("/key-management")}
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
          <Box p="2" align="center">
            <img src={warning_icon} style={{ width: "30px" }} alt="warning" />
            <Text p="2">Never disclose your recovery phrase.
              <br /> Anyone with this phrase can steal from your wallet
            </Text>
            <Text p="2" fontSize="sm"> Tap the words to re-enter your recovery phrase in the correct order.
            </Text>
            <Box>
              {selectedKeys.map((ph) => (
                <div
                  key={ph}
                  onClick={() => removeKey(ph)}
                >
                  {ph}
                </div>
              ))}
            </Box>
            <Box>
              {suggestKeys.map((ph) => (
                <div
                  key={ph}
                  onClick={() => selectKey(ph)}
                >
                  {ph}
                </div>
              ))}
            </Box>
          </Box>
          <KeyCreateContainer>
            {isLoading && <LoadingBox></LoadingBox>}
            {err && <MessageBox>{err}</MessageBox>}
            <Button variant="outline" color="violet.500" onClick={onClick}>Continue</Button>
            <Box
              onClick={() => setShowBackup(true)}
              className="mt-15 text-center pb-30"
            >
              <Text
                p="2"
                textAlign="center"
                fontSize="sm"
              >
                Skip backup for now
              </Text>
            </Box>
          </KeyCreateContainer>
        </Stack>
      </Center>
    </Box>
  );
}



export const KeyCreateContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background: violet.500;
  padding: 20px;

  .keyword-area {
    background: #f5f5f526;
    border-radius: 2px;
    min-height: 180px;
    padding-left: 10px;
    padding-bottom: 8px;

    .one-key {
      background-color: green.500;
      color: violet.500 !important;
    }
  }
  .keypad {
    padding-left: 10px;
    min-height: 180px;
    .one-key {
      background-color: #38386b;
    }
  }
  .one-key {
    width: calc(100% / 3 - 10px);
    padding-top: 9px;
    padding-bottom: 9px;
    margin-top: 8px;
    float: left;
    margin-right: 10px;
  }
  .lbl-desc1 {
    font-size: 12px;
  }
  .colorGreen {
    color: green.500 !important;
  }
`;