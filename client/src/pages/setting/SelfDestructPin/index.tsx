import { useState } from "react";
import { useHistory } from "react-router-dom";
import HPasswordInput from "components/atoms/HPasswordInput";
import { setting_bomb, icon_back2, icon_close } from "assets/svgs";
// hooks
import { useWallet } from "components/contexts";
import styled from "styled-components";
import { Box, Tooltip, FormControl, Grid, Image, FormLabel, Input, Center, Link, Flex, Stack, SimpleGrid, VStack, Text, Button, IconButton, HStack } from "@chakra-ui/react";
import { MessageBox } from "components/helpers";

export function SelfDestructPin() {
  const navigate = useHistory();
  const [err, setErr] = useState("");
  const [accessPinFocus, setAccessPinFocus] = useState(true);
  const [accessPin, setAccessPin] = useState("");
  const [destructPinFocus, setDestructPinFocus] = useState(false);
  const [destructPin, setDestructPin] = useState("");
  const [destructPinConfirmFocus, setDestructPinConfirmFocus] = useState(false);
  const [destructPinConfirm, setDestructPinConfirm] = useState("");

  const { unlock, setSelfDestructPin } = useWallet();

  const onClick = async () => {
    if (accessPin === "") {
      setErr("Please input current PIN.");
    } else if (destructPin === "" || destructPinConfirm === "") {
      setErr("Please input PIN triggering Self Destruct");
    } else if (destructPin !== destructPinConfirm) {
      setErr("Self Destruct PINs don't match, please try again.");
    } else {
      unlock(accessPin)
        .then(() => setSelfDestructPin(destructPin))
        .then(() => navigate.push("/setting/self-destruct-pin-success"))
        .catch(() => {
          setErr("Access PIN is incorrect.");
        });
    }
  };

  const activeFocusArea = (element: string = "old") => {
    if (element === "old") {
      setAccessPinFocus(true);
      setDestructPinFocus(false);
      setDestructPinConfirmFocus(false);
    } else if (element === "create") {
      setAccessPinFocus(false);
      setDestructPinFocus(true);
      setDestructPinConfirmFocus(false);
    } else {
      setAccessPinFocus(false);
      setDestructPinFocus(false);
      setDestructPinConfirmFocus(true);
    }
  };

  return (
    <Box px="2" pt="20">
    <Center maxW="container.lg" minH="600" mx="auto" pb="8">
      <Stack p="8" rounded="lg" shadow="card">
        <DesctructPinContainer>
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
            Create a PIN that will <strong>delete all app data from your device</strong> 
            <br />
            when you log in. <strong>will only delete the data</strong>, not the app. 
          </Text>
          <Text p="2" fontSize="xs" textAlign="center">
            Use your{" "}
            <strong
              onClick={() => navigate.push("/setting/update-pin")}
            >
              recovery phrase
            </strong>{" "}
            access your data from any device at a later date.
          </Text>
            
          {err && <MessageBox>{err}</MessageBox>};
          <Box align="center" onClick={() => activeFocusArea("old")}>
            <Text px="8" fontSize="xs">Enter your old self destruction PIN</Text>
            <HPasswordInput
              label="Enter Access PIN"
              onChange={setAccessPin}
              onComplete={() => activeFocusArea("create")}
              focused={accessPinFocus}
              labelAlign="left"
            />
          </Box>
          <Box align="center"  onClick={() => activeFocusArea("create")}>
            <Text px="8" fontSize="xs">Create your new self destruction PIN</Text>

            <HPasswordInput
              label="Create"
              onChange={setDestructPin}
              onComplete={() => activeFocusArea("confirm")}
              focused={destructPinFocus}
              labelAlign="left"
              type="Self-Destruct PIN"
            />
          </Box>
          <Box align="center"  onClick={() => activeFocusArea("confirm")}>
            <Text px="8" fontSize="xs">Confirm your new self destruction PIN</Text>
            <HPasswordInput
              label="Confirm"
              onChange={setDestructPinConfirm}
              focused={destructPinConfirmFocus}
              labelAlign="left"
              type="Self-Destruct PIN"
            />
          </Box>
          <Button 
            m="4"
            variant="outline"
            onClick={onClick}
            leftIcon={
            <img src={setting_bomb} alt="bomb btn" />
            }
          >
            Update Self-Destruct PIN
          </Button>
          
        </DesctructPinContainer>
        </Stack>
      </Center>
    </Box>
  );
}


export const DesctructPinContainer = styled.div`
  display: flex;
  flex-direction: column;
  .lbl-desc1 {
    line-height: 28px !important;
    span {
      color: red.500 !important;
      &.colorGreen {
        color: green.500 !important;
      }
    }
  }
  .warning-btn {
    background: red.500;
    display: flex;
    padding: 8px 30px;
    width: fit-content;
    justify-content: center;
    margin: 0 auto;
    border-radius: 2px;
    align-items: center;
  }
`;

