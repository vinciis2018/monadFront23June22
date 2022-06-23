import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { Box, Heading, FormControl, Image, FormLabel, Input, Center, Link, Flex, Stack, SimpleGrid, VStack, Text, Button, IconButton, HStack } from "@chakra-ui/react";

import { TextField } from '@material-ui/core';

import {LoadingBox, MessageBox} from '../../../components/helpers';
import { signin } from '../../../Actions/userActions';


export function Signin(props: any) {

  const navigate = useHistory();
  
  const [email, setEmail] = useState<any>('');
  const [password, setPassword] = useState<any>('');

  const redirect = props?.location?.search
    ? props?.location?.search.split('=')[1]
    : '/';

  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch();

  const submitHandler = (e: any) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      if(userInfo?.defaultWallet) {
        navigate.push(redirect);
      } else {
        navigate.push("/welcome");
      }
    }


  }, [props?.history, redirect, userInfo]);

  return (
      <Box px="2" pt="20">
        <Center maxW="container.lg" minH="600" mx="auto" pb="8">
          <Stack p="8">
            <SimpleGrid columns={[1, 2]} gap="4">
              <Box justify="center" rounded="lg" shadow="card" bg="#ffffff" align="center">
              <Image 
                align="center"
                src={`https://arweave.net/aod3mUEOMhhMBHwqWZp9ReSctl4zUu_PxLlfRn7Ings`} 
              />
              </Box>
              <Box p="4" pt="8" align="center" rounded="lg" shadow="card" bg="#ffffff">
                <Text fontSize="md" textAlign="center" fontWeight="600">Welcome Back Again</Text>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <FormControl p="1" id="email">
                  <FormLabel fontSize="xs" px="1">Email</FormLabel>
                  <Stack direction="row" align="center">
                    <Input 
                      id="email"
                      onChange={(e) => setEmail(e?.target?.value)} 
                      placeholder={email} 
                      value={email}
                      required
                      type="email"  
                    />
                  </Stack>
                </FormControl>
                <FormControl p="1" id="password">
                  <FormLabel fontSize="xs" px="1">Password</FormLabel>
                  <Stack direction="row" align="center">
                    <Input 
                      id="password"
                      onChange={(e) => setPassword(e?.target?.value)} 
                      placeholder={password} 
                      value={password}
                      required
                      type="password"  
                    />
                  </Stack>
                </FormControl>
                <Stack p="1" pt="2" align="center">
                  <Button width="100%" bgGradient="linear-gradient(to left, #BC78EC, #7833B6)" size="md" type="submit" onClick={submitHandler}>
                    LOGIN
                  </Button>
                  <Text fontSize="xs">You will now agree to all our <Link as={RouterLink} to="/terms_and_conditions"> Terms and Conditions</Link></Text>
                  <Text fontSize="xs" fontWeight="600" as={RouterLink} to={`/signup?redirect=${redirect}`}>Not a registered user?</Text>
                  <Text as={RouterLink} to="/forgot_password" align="center" fontSize="xs"> Click here to reset your password</Text>
                </Stack>
                
              </Box>
            </SimpleGrid>
          </Stack>
        </Center>
      </Box>
      
  )
}