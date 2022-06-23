import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from "framer-motion";

import { Box, SimpleGrid, Flex, Stack, Input, Center, IconButton, ButtonGroup, Button } from "@chakra-ui/react";
import { LoadingBox, MessageBox } from 'components/helpers';

import {ArrowBackIcon, EditIcon } from "@chakra-ui/icons"
import {BsSliders} from "react-icons/bs";
import { listScreens, createScreen, deleteScreen } from '../../Actions/screenActions';
import { userScreensList } from '../../Actions/userActions';

import { Screen } from "components/common";

import { SCREEN_CREATE_RESET, SCREEN_DELETE_RESET } from '../../Constants/screenConstants';


export function Screens (props: any) {
  
  const MotionFlex = motion(Flex);

  const masterMode = props.match.path.indexOf('/master') >= 0;

  const [myScreensVisible, setMyScreensVisible] = React.useState<boolean>(false);
  const [allScreensVisible, setAllScreensVisible] = React.useState<boolean>(true);

  const userSignin = useSelector((state: any) => state.userSignin);
  const { 
    loading: loadingUser,
    error: errorUser,
     userInfo 
  } = userSignin;

  const screenList = useSelector((state: any) => state.screenList);
  const { 
    loading: loadingScreenList, 
    error: errorScreenList, 
    screens 
  } = screenList;

  const userScreens = useSelector((state: any) => state.userScreens);
  const { 
    loading: loadingMyScreens, 
    error: errorMyScreens, 
    screens: myScreens
  } = userScreens;

  const screenCreate = useSelector((state: any) => state.screenCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    screen: createdScreen
  } = screenCreate;

  const redirect = props?.location?.search
    ? props?.location?.search.split('=')[1]
    : '/signin';

  const dispatch = useDispatch();
  React.useEffect(() => {
    if (successCreate) {
      dispatch({ type: SCREEN_CREATE_RESET });
      props.history.push(`/screen/${createdScreen._id}/edit`)
    }

    if(!userInfo) {
      props.history.push(redirect);
    }

    dispatch(listScreens({}));
    dispatch(userScreensList(userInfo));

  }, [
    dispatch,
    userInfo,
    masterMode,
    createdScreen,
    successCreate,

  ]);

  const createScreenHandler = () => {
    dispatch(createScreen());
  };


  const openAllModal = () => {
    setMyScreensVisible(false);
    setAllScreensVisible(true);
  }

  const openMyModal = () => {
    setAllScreensVisible(false);
    setMyScreensVisible(true);
  }

  return (
    <Box px="2" pt="20">
      {loadingUser ? (
        <LoadingBox></LoadingBox>
      ) : errorUser ? (
        <MessageBox message={errorUser}></MessageBox>
      ) : (
        <Box maxW="container.lg" mx="auto" pb="8">
          <Stack align="center" p="2" direction="row" justify="space-between">
            <ArrowBackIcon onClick={() => props.history.goBack()}/>
            <Input rounded="2xl" variant='outline' placeholder="Search by Screen Location, Name" fontWeight="600"/>
            <BsSliders color="violet.500" />
          </Stack>
          <Flex p="2" justify="space-between" align="center">
            <ButtonGroup rounded="2xl" size='sm' isAttached spacing="0" borderColor="violet.500" variant='outline'>
              <Button 
                rounded="2xl" 
                fontSize="xs"
                color={(!allScreensVisible && myScreensVisible) ? "violet.500" : "white"} 
                borderColor="violet.500" 
                variant={(!allScreensVisible && myScreensVisible) ? "outline" : "solid"} 
                bgGradient={(!allScreensVisible && myScreensVisible) ? "null" : "linear-gradient(to left, #BC78EC, #7833B6)"} 
                onClick={openAllModal}>
                All Screens
              </Button>
              <Button 
                rounded="2xl" 
                fontSize="xs"
                variant={(allScreensVisible && !myScreensVisible) ? "outline" : "solid"} 
                borderColor="violet.500" 
                color={(allScreensVisible && !myScreensVisible) ? "violet.500" : "white"}
                bgGradient={(allScreensVisible && !myScreensVisible) ? "null" : "linear-gradient(to left, #BC78EC, #7833B6)"} 
                onClick={openMyModal}>
                My Screens
              </Button>
            </ButtonGroup>
            {userInfo && userInfo.isMaster && (
              <>
                {loadingCreate ? (
                  <LoadingBox></LoadingBox>
                ) : errorCreate ? (
                  <MessageBox variant="danger">{errorCreate}</MessageBox>
                ) : (
                  <IconButton onClick={createScreenHandler} bg="none" icon={<EditIcon size="20px" color="black" />} aria-label="Edit Advert Details"></IconButton>
                )}
              </>
            )}

          </Flex>
          <hr />
          {allScreensVisible && (
            <Stack p="1">
              {loadingScreenList ? (
                <LoadingBox></LoadingBox>
              ) : errorScreenList ? (
                <MessageBox message={errorScreenList}></MessageBox>
              ) : (
                <SimpleGrid p="1" gap="4" columns={[2]}>
                  {screens.length === 0 && <MessageBox>No Screen Found</MessageBox>}
                  {screens.map((screen: any) => (
                    <MotionFlex
                      flexDir="column"
                      w="100%"
                      role="group"
                      rounded="md"
                      shadow="card"
                      whileHover={{
                        translateY: -3
                      }}
                      pos="relative"
                      zIndex="1"
                    >
                      <Screen key={screen._id} screen={screen} />
                    </MotionFlex>
                  ))}
                </SimpleGrid>
              )}
            </Stack>
          )}
          {myScreensVisible && (
            <Stack p="1">
              {loadingMyScreens ? (
                <LoadingBox></LoadingBox>
              ) : errorMyScreens ? (
                <MessageBox message={errorMyScreens}></MessageBox>
              ) : (
                <SimpleGrid p="1" gap="4" columns={[2]}>
                  {myScreens.length === 0 && <MessageBox>No Screen Found</MessageBox>}
                  {myScreens.map((screen: any) => (
                    <MotionFlex
                      flexDir="column"
                      w="100%"
                      role="group"
                      rounded="md"
                      shadow="card"
                      whileHover={{
                        translateY: -3
                      }}
                      pos="relative"
                      zIndex="1"
                    >
                      <Screen key={screen._id} screen={screen} />
                    </MotionFlex>
                  ))}
                </SimpleGrid>
              )}
            </Stack>
          )}
        </Box>
      )}
    </Box>
  )
}