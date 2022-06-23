import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import { Box, IconButton, Input, Heading, Image, Link, Flex, Stack, HStack, SimpleGrid, VStack, Text, Button, FormLabel, Select } from "@chakra-ui/react";
import {ArrowBackIcon, EditIcon } from "@chakra-ui/icons"

import { listAllPleas } from '../../Actions/pleaActions';
import { listUsers } from '../../Actions/userActions';
import { rejectScreenAllyPlea, grantScreenAllyPlea } from '../../Actions/screenActions';
import {LoadingBox} from '../../components/helpers/LoadingBox';
import {MessageBox} from '../../components/helpers/MessageBox';

export function PleaBucket (props: any) {

  const allPleasList = useSelector((state: any) => state.allPleasList);
  const { 
    allPleas, 
    loading: loadingAllPleas, 
    error: errorAllPleas 
  } = allPleasList;

  const userSignin = useSelector((state: any) => state.userSignin);
  const {userInfo} = userSignin; 

  const userList = useSelector((state: any) => state.userList);
  const { loading: loadingUsers, error: errorUsers, users } = userList;

  const screenAllyPleaGrant = useSelector((state: any) => state.screenAllyPleaGrant);
  const {
    loading: loadingScreenAllyPleaGrant,
    error: errorScreenAllyPleaGrant,
    success: successScreenAllyPleaGrant,
  } = screenAllyPleaGrant;

  const screenAllyPleaReject = useSelector((state: any) => state.screenAllyPleaReject);
  const {
    loading: loadingScreenAllyPleaReject,
    error: errorScreenAllyPleaReject,
    success: successScreenAllyPleaReject
  } = screenAllyPleaReject;
  
  const redirect = props?.location?.search
  ? props?.location?.search.split('=')[1]
  : '/signin';

  const dispatch = useDispatch();
  useEffect(() => {
    if(successScreenAllyPleaGrant){
      window.alert("Ally access Granted")
    }
    if(successScreenAllyPleaReject){
      window.alert("Ally access Rejected")
    }

    if(!userInfo) {
      props.history.push(redirect);
    }

    dispatch(listAllPleas());
    dispatch(listUsers());
      
  }, [dispatch, userInfo, successScreenAllyPleaGrant, successScreenAllyPleaReject]);

  const allyAccessHandler = (pleaId: any) => {
    window.confirm("Are you sure?")
    dispatch(grantScreenAllyPlea(pleaId))
  }

  const allyRemoveHandler = (pleaId: any) => {
    window.confirm("Are you sure?")
    dispatch(rejectScreenAllyPlea(pleaId))
  }
  
  return (
    <Box px="2" pt="20">
      <Box maxW="container.lg" mx="auto" pb="8">

      {loadingScreenAllyPleaGrant && <LoadingBox></LoadingBox>}
      {errorScreenAllyPleaGrant && <MessageBox variant="danger">{errorScreenAllyPleaGrant}</MessageBox>}
      {loadingScreenAllyPleaReject && <LoadingBox></LoadingBox>}
      {errorScreenAllyPleaReject && <MessageBox variant="danger">{errorScreenAllyPleaReject}</MessageBox>}
      {loadingAllPleas ? (
        <LoadingBox></LoadingBox>
      ) : errorAllPleas ? (
        <MessageBox variant="danger">{errorAllPleas}</MessageBox>
      ) : (
        <Stack p="2">
          <Stack align="center" p="2" direction="row" justify="space-between">
            <ArrowBackIcon onClick={() => props.history.goBack()}/>
            <Text fontWeight="600">Notifications</Text>
            <Flex>
              {/* <IconButton as={RouterLink} to={`/screen/${screenId}/edit`} bg="none" icon={<EditIcon size="20px" color="black" />} aria-label="Edit Screen Details"></IconButton> */}
            </Flex>
            
          </Stack>
          {userInfo && (
            <Box p="2">
              <Text p="2" fontWeight="600" fontSize="">Pleas I made</Text>
              <hr />
              {allPleas.filter((plea: any) => plea.from === userInfo.defaultWallet).map((plea: any) =>  (
                <Box shadow="card" p="2" justify="space-between" key={plea._id} rounded="lg">
                  {loadingUsers ? (
                    <LoadingBox></LoadingBox>
                  ) : errorUsers ? (
                    <MessageBox variant="danger">{errorUsers}</MessageBox>
                  ) : (
                    <Flex p="2" justify="space-between" align="center">
                      {users.filter((user: any) => user.defaultWallet === plea.to).map((user: any) => (
                        <Text fontWeight="600" onClick={() => props.history.push(`/artist/${user.defaultWallet}`)} fontSize="">To: {user.name}</Text>
                      ))}
                      {plea.reject && <Text fontSize="sm" color="red">Access Revoked</Text>}
                    </Flex>
                  )}
                  <hr />
                  <Text px="1" fontSize="sm">{plea.content}</Text>
                  <Text px="1" fontSize="sm">Type: {plea.pleaType}</Text>
                  <Text px="1" fontSize="sm">Screen: {plea.screen} </Text>
                  <Stack p="2" color={plea.status ? "green" : "red"}>Status: {plea.status ? (<Text fontWeight="600" fontSize="xs">Granted</Text>) : (<Text fontWeight="600" fontSize="xs">In Process</Text>)}</Stack>
                </Box>
              ))}
            </Box>
         )}
         {userInfo.isMaster && (
           <Box p="2">
            <Text p="2" fontWeight="600" fontSize="">Pleas I recieved</Text>
            <hr/>
             {allPleas.filter((plea: any) => plea.to === userInfo.defaultWallet).map((plea: any) => (
              <Box shadow="card" p="2" justify="space-between" key={plea._id}>
                {loadingUsers ? (
                  <LoadingBox></LoadingBox>
                ) : errorUsers ? (
                  <MessageBox variant="danger">{errorUsers}</MessageBox>
                ) : (
                  <Flex p="2" justify="space-between" align="center">
                    {users.filter((user: any) => user.defaultWallet === plea.from).map((user: any) => (
                      <Text fontWeight="600" onClick={() => props.history.push(`/artist/${user.defaultWallet}`)} fontSize="">From: {user.name}</Text>
                    ))}
                    {!plea.status && <Button bgGradient="linear-gradient(to left, #BC78EC, #7833B6)" width="20%" fontSize="xs" onClick={() => allyAccessHandler(plea._id)}>Give Access</Button>}
                    {plea.status && <Button variant="outline" color="violet.500" width="20%" fontSize="xs" onClick={() => allyRemoveHandler(plea._id)}>Revoke Access</Button>}
                  </Flex>
                )}
                < hr />
                <Text px="1" fontSize="sm">{plea.content}</Text>
                <Text px="1" fontSize="sm">Type: {plea.pleaType}</Text>
                <Text px="1" fontSize="sm">Screen: {plea.screen} </Text>
                <Stack p="2" color={plea.status ? "green" : "red"}>Status: {plea.status ? (<Text fontWeight="600" fontSize="xs">Granted</Text>) : (<Text fontWeight="600" fontSize="xs">In Process</Text>)}</Stack>
              </Box>
             ))}
           </Box>
         )}
         {!userInfo && (
           <Text fontSize="">PleaseSignin</Text>
         )}
        </Stack>
      )}
      </Box>
    </Box>
  );
}