import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from "framer-motion";

import { Box, SimpleGrid, Flex, Stack, Input, Center, IconButton, ButtonGroup, Button } from "@chakra-ui/react";
import { LoadingBox, MessageBox } from 'components/helpers';

import {ArrowBackIcon, EditIcon } from "@chakra-ui/icons"
import {BsSliders} from "react-icons/bs";
import { listAllVideos } from '../../Actions/videoActions';
import { userVideosList } from '../../Actions/userActions';

import { Advert } from "components/common";


export function Adverts (props: any) {
  
  const MotionFlex = motion(Flex);
  const masterMode = props.match.path.indexOf('/master') >= 0;

  const [myVideosVisible, setMyVideosVisible] = React.useState<boolean>(false);
  const [allVideosVisible, setAllVideosVisible] = React.useState<boolean>(true);

  const userSignin = useSelector((state: any) => state.userSignin);
  const { 
    loading: loadingUser,
    error: errorUser,
     userInfo 
  } = userSignin;

  const videoListAll = useSelector((state: any) => state.videoListAll);
  const { 
    loading: loadingVideoList, 
    error: errorVideoList, 
    allVideos 
  } = videoListAll;

  const userVideos = useSelector((state: any) => state.userVideos);
  const { 
    loading: loadingMyVideos, 
    error: errorMyVideos, 
    videos: myVideos
  } = userVideos;

  const redirect = props?.location?.search
    ? props?.location?.search.split('=')[1]
    : '/signin';

  const dispatch = useDispatch();
  React.useEffect(() => {
    if(userInfo) {
      dispatch(userVideosList(userInfo));
    } else {
        props.history.push(redirect);
    }
    dispatch(listAllVideos());
  }, [
    dispatch,
    userInfo
  ]);

  

  const openAllModal = () => {
    setMyVideosVisible(false);
    setAllVideosVisible(true);
  }

  const openMyModal = () => {
    setAllVideosVisible(false);
    setMyVideosVisible(true);
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
              <ArrowBackIcon onClick={() => props.history.goBack()} />
              <Input rounded="2xl" variant='outline' placeholder="Search by Screen Location, Name" fontWeight="600"/>
              <BsSliders color="violet.500" />
            </Stack>
            <Flex p="2" justify="space-between" align="center">
              <ButtonGroup rounded="2xl" size='sm' isAttached spacing="0" borderColor="violet.500" variant='outline'>
                <Button 
                  rounded="2xl" 
                  fontSize="xs"
                  color={(!allVideosVisible && myVideosVisible) ? "violet.500" : "white"} 
                  borderColor="violet.500" 
                  variant={(!allVideosVisible && myVideosVisible) ? "outline" : "solid"} 
                  bgGradient={(!allVideosVisible && myVideosVisible) ? "null" : "linear-gradient(to left, #BC78EC, #7833B6)"} 
                  onClick={openAllModal}>
                  All Ads
                </Button>
                <Button 
                  rounded="2xl" 
                  fontSize="xs"
                  variant={(allVideosVisible && !myVideosVisible) ? "outline" : "solid"} 
                  borderColor="violet.500" 
                  color={(allVideosVisible && !myVideosVisible) ? "violet.500" : "white"}
                  bgGradient={(allVideosVisible && !myVideosVisible) ? "null" : "linear-gradient(to left, #BC78EC, #7833B6)"} 
                  onClick={openMyModal}>
                  My Ads
                </Button>
              </ButtonGroup>
              {userInfo && userInfo.isMaster && (
                <IconButton as={RouterLink} to={`/mapbox`} bg="none" icon={<EditIcon size="20px" color="black" />} aria-label="Edit Advert Details"></IconButton>
              )}
            </Flex>
            <hr />
            {allVideosVisible && (
              <Stack p="1">
                {loadingVideoList ? (
                  <LoadingBox></LoadingBox>
                ) : errorVideoList ? (
                  <MessageBox message={errorVideoList}></MessageBox>
                ) : (
                  <SimpleGrid p="1" gap="4" columns={[2,]}>
                    {allVideos.length === 0 && <MessageBox>No Screen Found</MessageBox>}
                    {allVideos.map((video: any) => (
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
                        <Advert key={video._id} video={video} />
                      </MotionFlex>
                    ))}
                  </SimpleGrid>
                )}
              </Stack>
            )}
            {myVideosVisible && (
              <Stack p="1">
                {loadingMyVideos ? (
                  <LoadingBox></LoadingBox>
                ) : errorMyVideos ? (
                  <MessageBox message={errorMyVideos}></MessageBox>
                ) : (
                  <SimpleGrid p="1" gap="4" columns={[2,]}>
                    {myVideos.length === 0 && <MessageBox>No Screen Found</MessageBox>}
                    {myVideos.map((video: any) => (
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
                        <Advert key={video._id} video={video} />
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