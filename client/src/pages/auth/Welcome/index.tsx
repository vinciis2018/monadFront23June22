/* eslint-disable no-console */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useHistory } from "react-router-dom";
import styled from "styled-components";
import { useWallet } from "components/contexts";
import {
  Button,
  Flex,
  Image,
  Text,
  Stack,
  Center,
  Box,
  SimpleGrid,
  Tooltip,
  Link
} from '@chakra-ui/react'
import koii_large from "assets/koii.png";
import mona_large from "assets/logo.png";
import { LoadingBox, MessageBox } from "components/helpers";


export function Welcome() {
  const navigate = useHistory();

  const { hasEncryptedData } = useWallet();
  const [data, setData] = useState<Boolean>(false);

  const userSignin = useSelector((state: any) => state.userSignin);
  const {userInfo, loading, error} = userSignin;

  useEffect(() => {
    hasEncryptedData().then((hasData) => {
      if(hasData) {
        setData(hasData)
        // window.location.replace("/login");
      }
    });
  }, [hasEncryptedData, navigate]);

  const onClick = () => {
    navigate.push("/pin-create");
  };

  return (
    <Box px="2" pt="20">
      <Center maxW="container.lg" minH="600" mx="auto" pb="8">
        <Stack p="8" rounded="lg" shadow="card" align="center">
          <Flex p="2" justify="center" align="center">
            <Image width="15%" src={mona_large} />
            <Text pt="20" fontSize="xs" >Powered by</Text>
            <Image width="15%" src={koii_large} />
          </Flex>
          <Text px="4" textAlign="center" fontSize="lg" fontWeight="600">Welcome to Monad</Text>
          <hr />
          {loading && <LoadingBox></LoadingBox>} 
          {error && <MessageBox>{error}</MessageBox>} 
          {userInfo && (
            <Box align="center">
              <Text px="4" fontSize="sm">
                Hey {userInfo.name}, thank you for your registration.
                <br />Please follow the instruction process for creating your finnie wallet on Monad.
                <br />What are you waiting for then, click to proceed
              </Text>
            </Box>
          )}
            <Tooltip rounded="lg" shadow="card" bgColor="violet.500" p="4" label="ads becho, ads dekho" aria-label='A tooltip'>
              <Image onClick={onClick} alt="ads dekho, ads becho" p="4" src="https://cdn3d.iconscout.com/3d/premium/thumb/marketing-campaign-3025712-2526910.png" />
            </Tooltip>
          <Button width="100%" variant="outline" color="violet.500" onClick={onClick}>Get Started</Button>
            
        </Stack>
      </Center>
    </Box>
  );26
}
