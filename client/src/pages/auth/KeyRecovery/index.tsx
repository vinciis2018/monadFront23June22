import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

// hooks
import { useWallet } from "components/contexts";
import HIconButton from "components/atoms/HIconButton";
import { useHistory } from "react-router-dom";
import HLoading from "components/atoms/HLoading";
import styled from "styled-components";
import { Box, Tooltip, FormControl, Grid, Image, FormLabel, Input, Center, Link, Flex, Stack, SimpleGrid, VStack, Text, Button, IconButton, HStack } from "@chakra-ui/react";
import {
  icon_back2,
  icon_close,
  icon_warning_triangle,
  warning_red_icon,
  bk_key_part1, icon_back, icon_check, warning_icon
} from "assets/svgs";
import { LoadingBox, MessageBox } from "components/helpers";
import {createWallet} from "../../../Actions/walletActions";
import {signout } from "../../../Actions/userActions";

export function KeyRecovery() {
  const navigate = useHistory();
  const [userMnemonics, setUserMnemonics] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const { importAndSave, getTempSavedPin, wipeTempSavedPin, getArweavePublicAddress } = useWallet();

  
  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();

  const onClick = async () => {
    const keys = userMnemonics.split(" ");
    if (keys.filter((k) => k !== "").length !== 12) {
      setErr("You should input 12 words. Try again.");
    } else {
      setLoading(true);
      console.log(keys)
      getTempSavedPin().then((pin) => {
        console.log(pin)
        if (pin) {
          wipeTempSavedPin()
            .then(() => importAndSave(pin, userMnemonics))
            .then((res) => {
              setErr("");
              const defWallet = getArweavePublicAddress();
              if(userInfo.defaultWallet === undefined || null || "") {
                dispatch(createWallet(defWallet));
                dispatch(signout());
              }
              navigate.push("/upload");

            })
            .finally(() => {
              setLoading(false);
            });
        } else {
          navigate.push("/pin-create");
        }
      });
    }
  };

  return (
    <Box px="2" pt="20">
      <Center maxW="container.lg" minH="600" mx="auto" pb="8">
        <Stack p="8" rounded="lg" shadow="card">
          <HLoading loading={loading} />
          <KeyRecoveryContainer>
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
              <Tooltip rounded="lg" shadow="card" bgColor="violet.500" p="4" label="paisa hi paisa hoga" aria-label='A tooltip'>
                <Box align="center" >
                  <Image  width="50%" alt="paisa hi paisa hoga" p="4" src={`https://cdn3d.iconscout.com/3d/premium/thumb/reading-book-3025706-2526904.png`}/>
                </Box>
              </Tooltip>
              <Text fontSize="sm" p="2">
                Never disclose your recovery phrase.
              <br />Anyone with this phrase can steal from your wallet.
              </Text>
            </Box>
            <Box p="4">
              {err && <MessageBox>{err}</MessageBox>}
              {loading && <LoadingBox></LoadingBox>}
              <Input
                placeholder="Enter your recovery phrase"
                onChange={(e: any) => setUserMnemonics(e.target.value)}
              />
            </Box>
            <Button mx="4" variant="outline" color="violet.500" onClick={onClick}>Continue</Button>
            <Text p="2" textAlign="center" fontSize="sm" fontWeight="600"><Link color="teal.500" onClick={() => navigate.push("/welcome")}>Or make a new key</Link></Text>
          </KeyRecoveryContainer>
        </Stack>
      </Center>
    </Box>
  );
}



export const KeyRecoveryContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background: violet.500;
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
  textarea {
    width: calc(100% - 30px);
    padding: 15px;
    height: 140px;
    background: #f5f5f526;
    border: none;
    resize: none;
    text-align: left;
    &::-webkit-input-placeholder {
      /* Chrome/Opera/Safari */
      color: white;
    }
    &::-moz-placeholder {
      /* Firefox 19+ */
      color: white;
    }
    &:-ms-input-placeholder {
      /* IE 10+ */
      color: white;
    }
    &:-moz-placeholder {
      /* Firefox 18- */
      color: white;
    }
  }
  .colorWhite {
    color: white !important;
  }
  .colorGreen {
    font-size: 12px !important;
    color: green.500 !important;
    letter-spacing: 0.01em;
  }
`;
