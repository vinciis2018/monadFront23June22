import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {Map} from "./Map";
import { Box, Heading, Flex, Stack, Input, Text, IconButton } from "@chakra-ui/react";
import { getPinJson } from 'Actions/pinActions';
import { LoadingBox, MessageBox } from 'components/helpers';

import {ArrowBackIcon, EditIcon } from "@chakra-ui/icons"
import {BsSliders} from "react-icons/bs";

export function MapBox(props: any) {

  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo 
  } = userSignin;

  const jsonPins = useSelector((state: any) => state.jsonPins);
  const {
    Loading: loadingAllPins, 
    error: errorAllPins, 
    jsonData
  } = jsonPins;


  const dispatch = useDispatch();

  React.useEffect(() => {
    // if(!jsonData) {
      dispatch(getPinJson());
    // }
  }, [dispatch, userInfo])


  return (
    <Box px="2" pt="20">
        <Box maxW="container.lg" mx="auto" pb="8">
          <Stack align="center" p="2" direction="row" justify="space-between">
            <ArrowBackIcon onClick={() => props.history.goBack()}/>
            <Input rounded="2xl" variant='outline' placeholder="Search by Location" fontWeight="600"/>
            <BsSliders color="violet.500" />
          </Stack>
          {loadingAllPins && <LoadingBox></LoadingBox>} 
          {errorAllPins && <MessageBox message={errorAllPins}></MessageBox>} 
          {jsonData !== undefined && (
            <Box p="1" rounded="md" width="100%" height="100%">
              <Map mapProps={jsonData}/>
            </Box>
          )}
      </Box>
    </Box>
    );
}
