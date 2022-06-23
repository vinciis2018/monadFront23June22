import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import { Box, Link, Image, Text, Stack, IconButton, Flex, Button, SimpleGrid, Center } from "@chakra-ui/react";
import {ArrowBackIcon, EditIcon } from "@chakra-ui/icons"
import {BiLike, BiBookmark, BiWalk, BiFlag} from 'react-icons/bi';
import {AiOutlineArrowUp,AiOutlineStar, AiOutlineFieldTime, AiOutlineEye, AiFillMobile, AiFillEye, AiTwotoneInfoCircle, AiTwotoneExclamationCircle} from "react-icons/ai";

import { LoadingBox, MessageBox, Rating } from "components/helpers";


import { detailsScreen, getScreenParams, screenVideosList } from '../../Actions/screenActions';
import { getScreenCalender } from '../../Actions/calenderActions';
import {listAllPleas} from '../../Actions/pleaActions';
import { getScreenGameDetails } from '../../Actions/gameActions';

import { useNftData, useNft } from 'api/hooks/useNft';
import { NftMediaContainer } from 'components/common/NftMediaContainer/index';
import { useFinnie } from 'components/finnie';


export function ScreenDashboard(props: any) {
  const screenId = props.match.params.id;
  // const txId = props.match.params.txId;
  /* Finnie */
  const {
    state: { connectFinnie, walletAddress, isLoading: finnieLoading, walletBalance, isFinnieConnected, walletPrice, xchangeRate, lastTxn, tokenHis },
  } = useFinnie();

  const [dashboardModalOpen, setDashboardModalOpen] = React.useState<boolean>(false);

  const userSignin = useSelector((state: any) => state.userSignin);
  const { loading: loadingUser, error: errorUser, userInfo } = userSignin;

  const screenDetails = useSelector((state: any) => state.screenDetails);
  const {
    loading: loadingScreen,
    error: errorScreen,
    screen
  } = screenDetails;

  const screenVideos = useSelector((state: any) => state.screenVideos);
  const { 
    videos, 
    loading: loadingScreenVideos, 
    error: errorScreenVideos 
  } = screenVideos;

  const screenCalender = useSelector((state: any) => state.screenCalender);
  const {
    loading: loadingScreenCalender,
    error: errorScreenCalender,
    calender
  } = screenCalender;

  const screenGameDetails = useSelector((state: any) => state.screenGameDetails);
  const {
    loading: loadingScreenGameDetails,
    error: errorScreenGameDetails,
    screenGameData
  } = screenGameDetails;

  const screenParams = useSelector((state: any) => state.screenParams);
  const { 
    loading: loadingScreenParams,
    error: errorScreenParams,
    params  
  } = screenParams;

  const allPleasList = useSelector((state: any) => state.allPleasList);
  const { 
    allPleas, 
    loading: loadingAllPleas, 
    error: errorAllPleas 
  } = allPleasList;


  const [txId, setTxId] = React.useState<any>("")
  const {data: nft, isLoading, isError} = useNft({id: txId});
  // const {data: nftData } = useNftData({id: txId});
  console.log("nft", {nft})


  const dispatch = useDispatch();
  React.useEffect(() => {

    if(!isFinnieConnected) {
      connectFinnie();
    }

    if(!screen) {
      dispatch(detailsScreen(screenId));
    } else {
      setTxId(screen?.image?.split("/").slice(-1)[0]);
    }


    dispatch(screenVideosList(screenId));
    dispatch(getScreenCalender(screenId));
    dispatch(getScreenGameDetails(screenId));
    dispatch(getScreenParams(screenId));
    dispatch(listAllPleas())

  }, [
    dispatch,
    screen,
    txId,
    nft
  ])

  return (
    <Box px="2" pt="20">
      {loadingUser ? (
        <LoadingBox></LoadingBox>
      ) : errorUser ? (
        <MessageBox variant="danger">{errorUser}</MessageBox>
      ) : (
        <Box maxW="container.lg" mx="auto" pb="8">
          {loadingScreen ? (
            <LoadingBox></LoadingBox>
          ) : errorScreen ? (
            <MessageBox variant="danger">{errorScreen}</MessageBox>
          ) : (
            <Stack p="2" >
              <Stack align="center" p="2" direction="row" justify="space-between">
                <ArrowBackIcon onClick={() => props.history.goBack()}/>
                <Text fontWeight="600">Screen Dashboard</Text>
                <IconButton bg="none" icon={<EditIcon size="20px" color="black" />} aria-label="Edit Screen Details"></IconButton>
              </Stack>
              <Box p="2" shadow="card" rounded="lg">
                <Text onClick={() => props.history.push(`/dashboard/user/${userInfo?.defaultWallet}`)} p="2"fontWeight="600" fontSize="md">{screen?.master?.master?.name}</Text>
                <Text px="2" fontWeight="600" fontSize="sm" color="gray.500">{screen?.name}</Text>
                <Text px="2" pb="4" fontWeight="" fontSize="xs" color="gray.500">Screen ID: {screen._id}</Text>
                {/* <Text p="2" fontWeight="" fontSize="xs">₹ {walletPrice?.totalPrice?.toFixed(3)}</Text> */}
                <SimpleGrid gap="4" columns={[3]} p="2">
                  <Box onClick={() => props.history.push(`/screen/${screen._id}`)} bgGradient="linear-gradient(to bottom, #BC78EC20, #7833B660)" align="center" shadow="card" rounded="lg" p="2">
                    <Text fontWeight="" fontSize="xs">Playlist</Text>
                    <Text p="2" fontWeight="600" fontSize="lg">{screen?.videos?.length}</Text>
                  </Box>
                  <Box onClick={() => props.history.push(`/pleaBucket`)} bgGradient="linear-gradient(to bottom, #BC78EC20, #7833B660)" align="center" shadow="card" rounded="lg" p="2">
                    <Text fontWeight="" fontSize="xs">Allies</Text>
                    <Text p="2" fontWeight="600" fontSize="lg">{screen?.allies?.length}</Text>
                  </Box>
                  <Box onClick={() => props.history.push(`/pleaBucket`)} bgGradient="linear-gradient(to bottom, #BC78EC20, #7833B660)" align="center" shadow="card" rounded="lg" p="2">
                    <Text fontWeight="" fontSize="xs">Pleas</Text>
                    {loadingAllPleas ? (
                      <LoadingBox></LoadingBox>
                    ) : errorAllPleas ? (
                      <MessageBox variant="danger">{errorAllPleas}</MessageBox>
                    ) : (
                      <Text p="2" fontWeight="600" fontSize="lg">{allPleas.filter((plea: any) => plea.screen === screen._id).length}</Text>
                    )}
                  </Box>
                </SimpleGrid>
              </Box>
              <Box p="2" shadow="card" rounded="lg">
                <SimpleGrid p="4" bgGradient="linear-gradient(to bottom, #)"gap="4" columns={[2]}>
                  <Button onClick={() => setDashboardModalOpen(false)} rounded="full" bgGradient="linear-gradient(to left, #BC78EC, #7833B6)" fontSize="xs" size="sm">
                    Campaigns
                  </Button>
                  <Button onClick={() => setDashboardModalOpen(!dashboardModalOpen)} rounded="full" color="violet.500" variant="outline" fontSize="xs" size="sm">
                    Dashboard
                  </Button>
                </SimpleGrid>

                {dashboardModalOpen ? (
                  <Stack>
                    {isLoading ? (
                      <LoadingBox></LoadingBox>
                    ) : isError ? (
                      <MessageBox variant="danger">{isError}</MessageBox>
                    ) : (
                      <Box p="2" shadow="card" rounded="lg">
                        <NftMediaContainer 
                          nft={nft}
                        />
                        <Flex p="2" align="center" justify="space-between">
                          <Box align="center">
                            <Text fontSize="xs">{screen?.likedBy?.length}</Text>
                            <BiLike />
                            <Text fontSize="xs">Likes</Text>
                          </Box>
                          <Box align="center">
                            <Text fontSize="xs">{screen?.flaggedBy?.length}</Text>
                            <BiFlag />
                            <Text fontSize="xs">Flags</Text>
                          </Box>
                          <Box align="center">
                            <Text fontSize="xs">{screen?.subscribers?.length}</Text>
                            <BiBookmark />
                            <Text fontSize="xs">Subscribers</Text>
                          </Box>
                          <Box align="center">
                            <Text fontSize="xs">{nft?.attention}</Text>
                            <AiOutlineEye />
                            <Text fontSize="xs">Views</Text>
                          </Box>
                        </Flex>
                      </Box>
                    )}
                    <Flex p="4"  shadow="card" rounded="lg" align="center" justify="space-between">
                      <Text fontSize="xs">Total Earnings</Text>
                      <Text fontWeight="600" fontSize="xs">₹ 345</Text>
                    </Flex>
                    <Flex p="2" align="center" justify="space-between">
                      <Flex align="center" justify="left">
                        <BiWalk size="20px" />
                        <Text p="1" fontSize="xs">Footfall</Text>
                      </Flex>
                      <Text fontSize="xs">10000 per day</Text>
                    </Flex>
                    <Flex p="2" align="center" justify="space-between">
                      <Flex align="center" justify="left">
                        <AiFillEye size="20px" />
                        <Text p="1" fontSize="xs">Views</Text>
                      </Flex>
                      <Text fontSize="xs">10000 per day</Text>
                    </Flex>
                    <Flex p="2" align="center" justify="space-between">
                      <Flex align="center" justify="left">
                        <AiFillMobile size="20px" />
                        <Text p="1" fontSize="xs">Interaction</Text>
                      </Flex>
                      <Text fontSize="xs">10000 per day</Text>
                    </Flex>
                  </Stack>
                ) : (
                  <>
                  {loadingScreenVideos ? (
                    <LoadingBox></LoadingBox>
                  ) : errorScreenVideos ? (
                    <MessageBox variant="danger">{errorScreenVideos}</MessageBox>
                  ) : (
                    <Stack>
                      {videos.map((video: any) => (
                        <Box bgColor="" key={video._id} p="2" rounded="lg" shadow="card" align="center" justify="center">
                          <Flex justify="space-between" align="center">
                            <Text fontWeight="600" fontSize="sm">{video?.title}</Text>
                            <Flex justify="right" align="center">
                              < AiTwotoneInfoCircle 
                                color="green"
                                size="10px"
                              />
                              <Text p="1" fontSize="xs" fontWeight="600" color="green.500">online</Text>
                            </Flex>
                          </Flex>
                          <Flex pt="2" justify="space-between" align="center">
                            <Text fontSize="xs">Screen Id:</Text>
                            <Text fontSize="xs" fontWeight="600" color="violet.500">{video?.screen}</Text>
                          </Flex>
                          <Flex pb="2" justify="space-between" align="center">
                            <Text fontSize="xs">{video?.slotsAvailable} 2145 times played</Text>
                            <Text fontSize="xs">{new Date().toDateString()}</Text>
                          </Flex>
                          <hr />
                          <Flex p="2" align="center" justify="space-between">
                            <Flex align="center" justify="left">
                              <AiOutlineFieldTime size="20px" />
                              <Text p="1" fontSize="xs">Frequency</Text>
                            </Flex>
                            <Text fontSize="xs">10000 per day</Text>
                          </Flex>
                          <Flex p="2" align="center" justify="space-between">
                            <Flex align="center" justify="left">
                              <AiFillEye size="20px" />
                              <Text p="1" fontSize="xs">Views</Text>
                            </Flex>
                            <Text fontSize="xs">10000 per day</Text>
                          </Flex>
                          <Flex p="2" align="center" justify="space-between">
                            <Flex align="center" justify="left">
                              <AiFillMobile size="20px" />
                              <Text p="1" fontSize="xs">Interaction</Text>
                            </Flex>
                            <Text fontSize="xs">10000 per day</Text>
                          </Flex>
                          <hr />
                          <SimpleGrid p="2" gap="4" columns={[2]}>
                            <Button color="violet.500" variant="outline" fontSize="xs" size="sm">
                              Change Status
                            </Button>
                            <Button onClick={() => props.history.push(`/dashboard/campaign/${video._id}/${video?.video.split('/').slice(-1)[0]}`)} bgGradient="linear-gradient(to left, #BC78EC, #7833B6)" fontSize="xs" size="sm">
                              View 
                            </Button>
                          </SimpleGrid>
                        </Box>
                      ))}
                    </Stack>
                  )}
                  </>
                )}
                
              </Box>
            </Stack>
          )}
          
        </Box>
      )}
    </Box>
  )
}
