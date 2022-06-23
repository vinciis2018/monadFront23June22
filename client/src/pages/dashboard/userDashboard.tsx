import React, { useMemo, memo} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useParams } from 'react-router-dom';

import { Box, Image, Slider, SliderTrack, SliderMark, SliderFilledTrack, SliderThumb, FormControl, Select, FormLabel, Input, Center, Link, Flex, Stack, SimpleGrid, VStack, Text, Button, IconButton, HStack } from "@chakra-ui/react";
import {ArrowBackIcon, EditIcon, InfoIcon, CalendarIcon, TimeIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons"
import {BiLike, BiBookmark, BiChevronRight, BiFlag, BiWalk} from 'react-icons/bi';
import {AiOutlineArrowUp,AiOutlineStar, AiOutlineFieldTime, AiOutlineEye, AiFillMobile, AiFillEye, AiTwotoneInfoCircle, AiTwotoneExclamationCircle} from "react-icons/ai";
import {BsUpload} from "react-icons/bs";

import { detailsUser, userScreensList, userVideosList } from '../../Actions/userActions';
import { USER_UPDATE_PROFILE_RESET, USER_UPDATE_RESET } from '../../Constants/userConstants';

import { CopyableAddress, EmptyState, ErrorState } from "components/ui";
import { triggerPort } from 'services/utils';
import { useFinnie } from 'components/finnie';
import { useArtist } from "api/hooks";
import { Map } from 'pages/map/Map';
import { LoadingBox, MessageBox } from 'components/helpers';
import { DragAndDropUploader } from 'components/widgets';
import { NftFeaturedCard, ThumbnailCard } from "components/cards";
import { NftMediaContainer } from 'components/common';
import { ThumbnailContainer } from 'components/cards/NftFeaturedCard';


export function UserDashboard(props: any) {
  
  const { pageNumber = 1 } = useParams<any>();

  const { data: artist, isLoading, isError } = useArtist({ id: props?.match?.params?.id });
  /* Finnie */
  const {
    state: { connectFinnie, walletAddress, isLoading: finnieLoading, walletBalance, isFinnieConnected, walletPrice, xchangeRate, lastTxn, tokenHis },
  } = useFinnie();

  const artistData = useMemo(() => {
    return {
      name: artist?.nfts?.[0]?.name,
      description: artist?.nfts?.[0]?.description,
      pieces: artist?.nfts?.length
    };
  }, [artist]);

  const [campaignModalOpen, setCampaignModalOpen] = React.useState<boolean>(false);

  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo } = userSignin;

  const userDetails = useSelector((state: any) => state.userDetails);
  const { 
    loading: loadingUser, 
    error: errorUser, 
    user 
  } = userDetails;

  const userScreens = useSelector((state: any) => state.userScreens);
  const { 
    loading: loadingScreens, 
    error: errorScreens, 
    screens, 
    screenPage, 
    screenPages 
  } = userScreens;

  const userVideos = useSelector((state: any) => state.userVideos);
  const { 
    loading: loadingVideos, 
    error: errorVideos, 
    videos, 
    videoPage, 
    videoPages 
  } = userVideos;

  const dispatch = useDispatch()
  React.useEffect(() => {
    
    if(!isFinnieConnected) {
      connectFinnie();
    }

    if (!user) {
      dispatch(detailsUser({userId: userInfo._id, walletAddress: walletAddress}));
    }
    dispatch(userScreensList(userInfo));
    dispatch(userVideosList(userInfo));

  }, [
    dispatch,
    userInfo, 
    user,
  ]);


  return (
    <Box px="2" pt="20">
      {loadingUser ? (
        <LoadingBox></LoadingBox>
      ) : errorUser ? (
        <MessageBox variant="danger">{errorUser}</MessageBox>
      ) : (
        <Box maxW="container.lg" mx="auto" pb="8">
            <Stack p="2" >
              <Stack align="center" p="2" direction="row" justify="space-between">
                <ArrowBackIcon  onClick={() => props.history.goBack()}/>
                <Text fontWeight="600">User Dashboard</Text>
                <IconButton bg="none" icon={<EditIcon size="20px" color="black" />} aria-label="Edit Screen Details"></IconButton>
              </Stack>
              <Box p="2" shadow="card" rounded="lg">
                <Text onClick={() => props.history.push(`/dashboard/user/${userInfo?.defaultWallet}`)} p="2"fontWeight="600" fontSize="md">{userInfo?.name}</Text>
                <Text px="2" fontWeight="" fontSize="xs" color="gray.500">User ID: {userInfo._id}</Text>
                <Text p="2" fontWeight="" fontSize="xs">₹ {walletPrice?.totalPrice?.toFixed(3)}</Text>
                <SimpleGrid gap="2" columns={[3]} p="2">
                  <Box onClick={() => props.history.push(`/screens`)} bgGradient="linear-gradient(to bottom, #BC78EC20, #7833B660)" align="center" shadow="card" rounded="lg" p="2">
                    <Text fontWeight="" fontSize="xs">Screens</Text>
                    <Text p="2" fontWeight="600" fontSize="lg">{user?.user?.screens?.length}</Text>
                  </Box>
                  <Box onClick={() => props.history.push(`/adverts`)} bgGradient="linear-gradient(to bottom, #BC78EC20, #7833B660)" align="center" shadow="card" rounded="lg" p="2">
                    <Text fontWeight="" fontSize="xs">Campaigns</Text>
                    <Text p="2" fontWeight="600" fontSize="lg">{user?.user?.videos?.length}</Text>
                  </Box>
                  <Box onClick={() => props.history.push(`/pleaBucket`)} bgGradient="linear-gradient(to bottom, #BC78EC20, #7833B660)" align="center" shadow="card" rounded="lg" p="2">
                    <Text fontWeight="" fontSize="xs">Pleas</Text>
                    <Text p="2" fontWeight="600" fontSize="lg">{user?.user?.pleasMade?.length}</Text>
                  </Box>
                </SimpleGrid>
              </Box>
              <Box p="2" shadow="card" rounded="lg">
                <SimpleGrid p="4" bgGradient="linear-gradient(to bottom, #)"gap="4" columns={[2]}>
                  <Button onClick={() => setCampaignModalOpen(false)} rounded="full" bgGradient="linear-gradient(to left, #BC78EC, #7833B6)" fontSize="xs" size="sm">
                    Screens
                  </Button>
                  <Button onClick={() => setCampaignModalOpen(!campaignModalOpen)} rounded="full" color="violet.500" variant="outline" fontSize="xs" size="sm">
                    Campaigns
                  </Button>
                </SimpleGrid>
                {campaignModalOpen ? (
                  <>
                    {loadingVideos ? (
                      <LoadingBox></LoadingBox>
                    ) : errorVideos ? (
                      <MessageBox variant="danger">{errorVideos}</MessageBox>
                    ) : (
                      <Stack>
                        {videos?.map((video: any) => (
                          <Box bgColor="" key={video._id} p="2" rounded="lg" shadow="card" align="center" justify="center">
                            <Flex justify="space-between" align="center">
                              <Text fontWeight="600" fontSize="sm">{video.title}</Text>
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
                ) : (
                  <>
                   {loadingScreens ? (
                      <LoadingBox></LoadingBox>
                    ) : errorScreens ? (
                      <MessageBox variant="danger">{errorScreens}</MessageBox>
                    ) : (
                      <Stack>
                        {screens.map((screen: any) => (
                          <Box  bgColor="" key={screen._id} p="2" rounded="lg" shadow="card" align="center" justify="center">
                            <Flex justify="space-between" align="center">
                              <Text fontWeight="600" fontSize="sm">{screen.name}</Text>
                              <Flex justify="right" align="center">
                                < AiTwotoneInfoCircle 
                                  color="green"
                                  size="10px"
                                />
                                <Text p="1" fontSize="xs" fontWeight="600" color="green.500">online</Text>
                              </Flex>
                            </Flex>
                            <Flex pt="2" justify="space-between" align="center">
                              <Text fontSize="xs">₹ {screen?.rentPerSlot} per {screen?.slotsTimePeriod} seconds (min)</Text>
                              <Text fontSize="xs" fontWeight="600" color="violet.500">{screen?.allies?.length} 3rd party</Text>
                            </Flex>
                            <Flex pb="2" justify="space-between" align="center">
                              <Text fontSize="xs">{screen?.slotsAvailable} 2145 slots available</Text>
                              <Text fontSize="xs">{new Date().toDateString()}</Text>
                            </Flex>
                            <hr />
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
                            <hr />
                            <SimpleGrid p="2" gap="4" columns={[2]}>
                              <Button color="violet.500" variant="outline" fontSize="xs" size="sm">
                                Change Status
                              </Button>
                              <Button onClick={() => props.history.push(`/dashboard/screen/${screen._id}`)} bgGradient="linear-gradient(to left, #BC78EC, #7833B6)" fontSize="xs" size="sm">
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
          
        </Box>
      )}
    </Box>
  )
}
