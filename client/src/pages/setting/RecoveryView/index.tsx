import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { warning_icon, icon_cancel } from "assets/svgs";
import CryptoBoard from "components/atoms/CryptoBoard";
import HButton from "components/atoms/HButton";
import { useWallet } from "components/contexts";
import HLoading from "components/atoms/HLoading";
import { Box, Tooltip, FormControl, Grid, Image, FormLabel, Input, Center, Link, Flex, Stack, SimpleGrid, VStack, Text, Button, IconButton, HStack } from "@chakra-ui/react";

export function RecoveryView() {
  const navigate = useHistory();

  const { mnemonics, isLoading } = useWallet();

  const onClick = async () => {
    navigate.push("/setting");
  };

  useEffect(() => {
    setTimeout(() => {
      navigate.push("/setting");
    }, 30 * 60000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box px="2" pt="20">
      <Center maxW="container.lg" minH="600" mx="auto" pb="8">
        <Stack p="8" rounded="lg" shadow="card">
          <Text textAlign="center" p="2" fontSize="lg" fontWeight="600" >
            Reveal Recovery Phrase
          </Text>
          <hr />
          <HLoading loading={isLoading} />
          <Box align="center">
            <img style={{ width: "35px" }} src={warning_icon} alt="warning" />
            <Text p="2" fontSize="sm" textAlign="center">
              Never disclose your recovery phrase. Anyone
              <br /> with this phrase can steal from your wallet.
            </Text>
            {mnemonics && <CryptoBoard mnemonics={mnemonics} />}
          </Box>
          <Button variant="outline" color="violet.500" onClick={onClick}>Back to Settings</Button>
          <Flex align="center">
            <img src={icon_cancel} alt="cancel" />
            <Text p="2" color="green.500" fontWeight="600" fontSize="sm">Recovery phrase will lock in 30...</Text>
          </Flex>
        </Stack>
      </Center>
    </Box>
  );
}
