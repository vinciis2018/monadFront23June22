import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { Box, Heading, Image, FormControl, Select, FormLabel, Input, Center, Link, Flex, Stack, SimpleGrid, VStack, Text, Button, IconButton, HStack } from "@chakra-ui/react";

import {LoadingBox, MessageBox} from '../../../components/helpers';
import { signup, signout } from '../../../Actions/userActions';


export function Signup(props: any) {

  const navigate = useHistory();

  const [name, setName] = useState<any>('');
  const [email, setEmail] = useState<any>('');
  const [password, setPassword] = useState<any>('');
  const [confirmPassword, setConfirmPassword] = useState<any>('');

  const redirect = props?.location?.search.split('=')[1]
    ? props?.location?.search.split('=')[1]
    : '/welcome';

  const userSignup = useSelector((state: any) => state.userSignup);
  const { userInfo, loading, error } = userSignup;

  const dispatch = useDispatch();
  const submitHandler = async (e: any) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Password and confirm password donot match');
    } else {
      dispatch(signup(name, email, password));
      alert('user created, please create a wallet to proceed');
      navigate.push("/welcome");

    }
  };

  useEffect(() => {
    
    if (userInfo) {
      props?.history?.push(redirect);
    }
    dispatch(signout())
  }, [dispatch, props?.history, redirect, userInfo]);

  return (
    <Box px="2" pt="20">
      <Center maxW="container.lg" minH="600" mx="auto" pb="8">
        <Stack p="8">
          {/* <Text p="4" textAlign="center" fontSize="2xl" fontWeight="1000">KEEP CALM AND WATCH ADS AS NEVER BEFORE</Text> */}
          <SimpleGrid columns={[1, 2]} gap="4">
            <Box rounded="lg" shadow="card" bg="#ffffff">
              <Image 
                src="https://arweave.net/66t9863gmqPTqca773Ov70Gx43C7ve9faCipAWQ604I" 
              />
            </Box>
            <Box p="4" pt="8" rounded="lg" shadow="card" bg="#ffffff">
              <Text p="2" fontSize="md" textAlign="center" fontWeight="600">Please enter your details</Text>
              {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
              <FormControl p="1" id="name">
                <FormLabel px="1" fontSize="xs">Name</FormLabel>
                <Stack direction="row" align="center">
                  <Input 
                    id="name"
                    onChange={(e) => setName(e?.target?.value)} 
                    placeholder={name} 
                    value={name}
                    required
                    type="text"  
                  />
                </Stack>
              </FormControl>
              <FormControl p="1" id="email">
                <FormLabel px="1" fontSize="xs">Email</FormLabel>
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
                <FormLabel px="1" fontSize="xs">Password</FormLabel>
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
              <FormControl p="1" id="confirmPassword">
                <FormLabel px="1" fontSize="xs">Confirm Password</FormLabel>
                <Stack direction="row" align="center">
                  <Input 
                    id="confirmPassword"
                    onChange={(e) => setConfirmPassword(e?.target?.value)} 
                    placeholder={confirmPassword} 
                    value={confirmPassword}
                    required
                    type="password"  
                  />
                </Stack>
              </FormControl>

              <Stack p="1" pt="2" align="center">
                <Button width="100%" bgGradient="linear-gradient(to left, #BC78EC, #7833B6)" size="md" type="submit" onClick={submitHandler}>
                  REGISTER
                </Button>
                <Text fontSize="xs" fontWeight="600" as={RouterLink} to={`/signin?redirect=${redirect}`}>Already a a registered user?</Text>
              </Stack>
            </Box>
          </SimpleGrid>
        </Stack>
      </Center>
    </Box>
    
  )
}