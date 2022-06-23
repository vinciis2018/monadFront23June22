import { useRef, useState, useEffect } from "react";
import {Link as RouterLink} from "react-router-dom";
import { Box, Tooltip, FormControl, Image, FormLabel, Input, Center, Link, Flex, Stack, SimpleGrid, VStack, Text, Button, IconButton, HStack } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import ReactCodeInput from "react-code-input";
import { useWallet } from "components/contexts";
import HPasswordInput from "components/atoms/HPasswordInput";
import styled from "styled-components";
import { useWindowSize } from "components/utils";



export function PinCreate() {
  const pinInputRef = useRef<ReactCodeInput>(null);
  const confirmInputRef = useRef<ReactCodeInput>(null);
  const navigate = useHistory();
  const [err, setErr] = useState("");
  const [createPinFocus, setCreatePinFocus] = useState(true);
  const [createPincode, setCreatePin] = useState("");
  const [confirmPinFocus, setConfirmPinFocus] = useState(false);
  const [confirmPin, setConfirmPin] = useState("");

  const { tempSavePin } = useWallet();
  const {width} = useWindowSize();
  const onClick = async () => {
    if (createPincode === "" || confirmPin === "") {
      setErr("Please input PIN.");
    } else if (createPincode !== confirmPin) {
      setErr("Access PINs don't match, please try again.");
    } else {
      const data = await tempSavePin(createPincode);
      console.log(data)
      if(!data) {
        setErr("Something went wrong while creating pin, please try again.");
      } else {
        navigate.push("/pin-success");
      }
    }
  };

  const activeFocusArea = (element: string = "create") => {
    if (element === "create") {
      setCreatePinFocus(true);
      setConfirmPinFocus(false);
    } else {
      setCreatePinFocus(false);
      setConfirmPinFocus(true);
    }
  };

  const completedCreatePin = () => {
    // @ts-ignore
    confirmInputRef.current.textInput[0].focus();
  };

  useEffect(() => {
    // @ts-ignore
    if (pinInputRef) pinInputRef.current.textInput[0].focus();
  }, [pinInputRef]);

  return (
    <Box px="2" pt="20">
      <Center maxW="container.lg" minH="600" mx="auto" pb="8">
        <Stack p="8" rounded="lg" shadow="card">
          <Text textAlign="center" px="4" pt="4" fontSize="xl" fontWeight="600">
            Create Your Secret Wallet PIN
          </Text>
          <hr />
          <PinCreateContainer>
            <SimpleGrid columns={[1,2]} gap="4" >
              <Tooltip rounded="lg" shadow="card" bgColor="violet.500" p="4" label="kisi ko batana ni" aria-label='A tooltip'>
                <Image alt="kisi ko batana ni" p="4" src="https://cdn3d.iconscout.com/3d/premium/thumb/no-message-3025708-2526906.png" />
              </Tooltip>
              <Box py={width > 500 ? "20" : "0"} px="4" align="center">
                <Text textAlign="center" px="4" pt="4" fontSize="sm" fontWeight="600">
                  DONOT DISCLOSE YOUR PIN TO ANYONE
                </Text>
                <Box align="center" >
                  <Text textAlign="center" px="4" pt="4" fontSize="xs" fontWeight="600">
                    Enter your 6 digit secret pin
                  </Text>
                  <HPasswordInput
                    label="Create Access PIN"
                    onChange={setCreatePin}
                    onComplete={() => completedCreatePin()}
                    focused={createPinFocus}
                    ref={pinInputRef}
                    onFocus={() => activeFocusArea("create")}
                    labelAlign="left"
                  />
                </Box>
                <Box align="center">
                  <Text textAlign="center" px="4" pt="4" fontSize="xs" fontWeight="600">
                    Confirm your 6 digit secret pin
                  </Text>
                  <HPasswordInput
                    label="Confirm Access PIN"
                    onChange={setConfirmPin}
                    focused={confirmPinFocus}
                    onFocus={() => {
                      activeFocusArea("confirm");
                    }}
                    labelAlign="left"
                    ref={confirmInputRef}
                    autoFocus={false}
                  />
                </Box>
                {err !== "" ? err : <span>&nbsp;</span>}

                <Button m="4" variant="outline" color="violet.500" width="75%" onClick={onClick}>Create Pin</Button>
              </Box>
            </SimpleGrid>
          </PinCreateContainer>
        </Stack>
      </Center>
    </Box>
  )
}



export const PinCreateContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background: violet.500;
  overflow: hidden;
  background-position-y: bottom;
  background-repeat: no-repeat;
  background-size: 100%;

  .bk-part2 {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: -1;
  }
  .lbl-desc1 {
    line-height: 28px;
    span {
      color: green.200 !important;
    }
  }
  .colorWhite {
    color: white !important;
  }
  .colorGreen {
    color: green.200 !important;
  }
  @media (max-width: 321px) {
    width: 100vw;
  }
`;