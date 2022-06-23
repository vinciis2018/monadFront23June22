import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
// hooks
import { useLogin, useWallet } from "components/contexts";
import { Box, Tooltip, FormControl, Image, FormLabel, Input, Center, Link, Flex, Stack, SimpleGrid, VStack, Text, Button, IconButton, HStack } from "@chakra-ui/react";
import { CopyableAddress, EmptyState, ErrorState } from "components/ui";
import { isPWA } from "utils/util";

import {
  setting_bomb,
  icon_close,
  icon_back2,
} from "assets/svgs";
import { signout } from "Actions/userActions";

let deferredPrompt: Event;

export function Setting() {
  const navigate = useHistory();
  const [pwaMode, setPwaMode] = useState(false);
  const [installable, setInstallable] = useState(false);
  const [open, setOpen] = useState(false);

  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const { logout, lock } = useLogin();
  const { lock: lockMyWallet } = useWallet();

  const dispatch = useDispatch();

  const { getArweavePublicAddress } = useWallet();
  const gotoRecovery = () => {
    if (!navigator.onLine) {
      navigate.push("/setting/wifi-test");
    } else {
      navigate.push("/setting/recovery");
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
      } else {
        console.log("User dismissed the install prompt");
        setOpen(true);
      }
    });
  };

  useEffect(() => {
    const wallet = getArweavePublicAddress();



    if(!wallet) {
      navigate?.push("/login")
    } else {
      if(userInfo?.defaultWallet !== wallet) {
        logout();
        lock();
        lockMyWallet();
      }
    }

    if (isPWA()) {
      setPwaMode(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps


  },[userInfo, getArweavePublicAddress()])

 
  const onClick = async () => {
    if (installable) {
      // Show the install prompt
      await appInstallLuncher();
    }
  };
  return (
    <Box px="2" pt="20">
      <Center maxW="container.lg" minH="600" mx="auto" pb="8">
          <Stack p="8" rounded="lg" shadow="card">
            <Flex p="4" justify="space-between" align="center">
              <img
                onClick={() => navigate.push("/upload")}
                src={icon_back2}
                alt="back"
              />
              <Text fontSize="lg" fontWeight="600" >
                Wallet & Security
              </Text>
              <img
                onClick={() => navigate.push("/")}
                src={icon_close}
                alt="close"
              />
            </Flex>
            <hr />
                <Flex align="center" justify="space-between">
                  <Text p="4" fontSize="sm">WALLET ADDRESS :</Text>
                  <CopyableAddress address={getArweavePublicAddress()} w="100%" maxW="200px" />
                </Flex>
                <Box align="center">
                  <Text color="violet.500" onClick={onClick}>
                    {pwaMode && "Save on HomeScreen"}
                  </Text>
                </Box>
                <Flex align="center" justify="space-between">
                  <Text p="4" fontSize="sm">GET RECOVERY PHRASE</Text>
                  <Button variant="outline" color="violet.500" onClick={gotoRecovery}>Reveal Recovery Phrase</Button>
                </Flex>
                <Flex align="center" justify="space-between">
                  <Text p="4" fontSize="sm">UPDATE FINNIE PIN</Text>
                  <Button variant="outline" color="violet.500" onClick={() => navigate.push("/setting/update-pin")}>Update PIN</Button>
                </Flex>
                <hr />
                <Text p="2" textAlign="center">UPDATE FINNIE PIN</Text>            
                <Text p="2" textAlign="center">
                  When you unlock Finnie using the self-destruct PIN,
                  <br />
                  <strong>all app data will be deleted.</strong> 
                  <br />
                  You can retrieve the data from any device at a later time using your recovery phrase.
                </Text>
                <hr />
                <Box onClick={() => navigate.push("/setting/self-destruct-pin")} p="4" align="center">
                  <img src={setting_bomb} alt="bomb btn"/>
                  <Text p="2">Set Up Self-Destruct PIN</Text>
                </Box>
                <Button bgColor="violet.500" onClick={() => navigate.push("/setting/self-destruct")}>
                  Inactive
                </Button>
          </Stack>
      </Center>
    </Box>
    
  );
}


