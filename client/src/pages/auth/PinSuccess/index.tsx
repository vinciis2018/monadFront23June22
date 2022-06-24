/* eslint-disable no-console */
import { useEffect, useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

// hooks
import { useLogin, useWallet } from "components/contexts";
import { Box, Tooltip, FormControl, Image, FormLabel, Input, Center, Link, Flex, Stack, SimpleGrid, VStack, Text, Button, IconButton, HStack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react";
import koii_large from "assets/koii.png";
import mona_large from "assets/logo.png";
import styled from "styled-components";

import { isPWA } from "utils/util";
import { useDropzone } from "react-dropzone";
import {BsUpload} from 'react-icons/bs';
import { getFileData } from "services/utils";
import { KeyRecovery } from "../KeyRecovery";
import {createWallet, editWallet} from "../../../Actions/walletActions";

let deferredPrompt: Event;

export function PinSuccess() {

  const navigate = useHistory();
  const { register } = useLogin();
  const [pwaMode, setPwaMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [installable, setInstallable] = useState(true);
  const [recModal, setRecModal] = useState<Boolean>(false);

  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();

  const { setupPin, generateAndSave, getTempSavedPin, wipeTempSavedPin, getArweavePublicAddress } = useWallet();
  
  const handleClose = () => {
    setOpen(false);
  };

  const registerUser = async () => {
    const expired = Math.floor(Date.now() / 1000) + 10 * 60; // 10 mins
    await register(expired);

    getTempSavedPin().then((pin: string | null) => {
      if (pin) {
        setupPin(pin)
          .then(() => wipeTempSavedPin())
          .then(() => generateAndSave(pin))
        const defWallet = getArweavePublicAddress();
        console.log(defWallet)
        if(userInfo?.defaultWallet === undefined || null || "") {
          dispatch(createWallet(defWallet));
        }
        if(userInfo?.defaultWallet !== defWallet) {
          dispatch(editWallet({
            defWallet
          }))
        }
        navigate?.push("/upload");

      } else {
        navigate.push("/pin-create");
      }
    });
  };

  
  const handleAgree = async () => {
    if (installable) {
      // Show the install prompt
      await appInstallLuncher();
    } else {
      await registerUser();
    }
  };

 
  const appInstallLuncher = () => {
    // Hide the app provided install promotion
    setInstallable(false);
    let dt: any = deferredPrompt;
    // Show the install prompt
    dt.prompt();
    // Wait for the user to respond to the prompt
    dt.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the install prompt");
        registerUser();
      } else {
        console.log("User dismissed the install prompt");
        setOpen(true);
      }
    });
  };

  useEffect(() => {
    if (isPWA()) {
      setPwaMode(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []);

  const onClick = async () => {
    handleAgree();
  };

  const openRecoveryModal = () => {
    setRecModal(!recModal);
  }

  return (
    <Box px="2" pt="20">
      <Center maxW="container.lg" minH="600" mx="auto" pb="8">
          {recModal ? (
            <KeyRecovery />
          ) : (
            <Stack p="8" rounded="lg" shadow="card" align="center">
              <WelcomeContainer>
                {!pwaMode && (
                  <Box align="center">
                    <Text fontSize="xl" fontWeight="600"> Welcome to MONAD version of Finnie Wallet</Text>
                  </Box>
                )}
                <Flex justify="center" align="center">
                  <Image width="10%" src={mona_large} />
                  <Text pt="20" fontSize="xs" fontWeight="600">Powered by</Text>
                  <Image width="10%" src={koii_large} />
                </Flex>
                <hr />
                {pwaMode ? (
                  <Text p="4" align="center" fontSize="sm" fontWeight="600">
                    You are almost ready to start earning from your Ads with MONAD
                  </Text>
                ) : (
                  <Text p="4" align="center" fontSize="sm" fontWeight="600">
                    Add MONAD to your home screen and start earnings from your Ads
                  </Text>
                )}
                <Tooltip rounded="lg" shadow="card" bgColor="violet.500" p="4" label="paisa hi paisa hoga" aria-label='A tooltip'>
                  <Box align="center" >
                    <Image  width="50%" alt="paisa hi paisa hoga" p="4" src={`https://cdn3d.iconscout.com/3d/premium/thumb/boy-drawing-on-tablet-3025702-2526900.png`}/>
                  </Box>
                </Tooltip>

                <Box align="center">
                  <Button width="50%" variant="outline" color="violet.500" onClick={onClick}>
                    {pwaMode ? "Let's Go" : "Save & Launch"}
                  </Button>
                </Box>
                
                {installable && (
                  <Text color="teal.500" p="4" align="center" fontSize="sm" fontWeight="600">Click here to add MONAD to your Home Screen</Text>
                )}
                <hr />
                <Box p="4" align="center">
                  <Text fontSize="">Have the Finnie Wallet?</Text>
                  <Text  fontSize="sm" fontWeight="600">Connect your existing key with a <Link color="teal.500" onClick={openRecoveryModal}>Recovery phrase</Link></Text>
                </Box>
            
                <Modal isOpen={open} onClose={handleClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader align="center" fontSize="sm" fontWeight="600">MONAD is Progressive Web App <br /> Do you know how to install progressive web apps?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <Text align="justify" fontSize="sm">
                        Open the menu next to the URL bar. Depending on whether you're using
                        Chrome or Android you'll see a menu option "Install" or "Install
                        App". This is the "Add to Home screen" option displayed for any site
                        that has the necessary features in place.
                      </Text>
                    </ModalBody>
                    <ModalFooter>
                      <Button onClick={registerUser} autoFocus variant="outline" color="violet.500">
                        OK
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </WelcomeContainer>
            </Stack>

          )}
      </Center>
    </Box>
  )
}


export const WelcomeContainer = styled.div`
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
  @media (max-width: 321px) {
    width: 100vw;
  }
`;
