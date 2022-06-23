import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import { Box, Link, Image, Text, Stack, IconButton, Flex, Button, SimpleGrid, Center } from "@chakra-ui/react";
import {ArrowBackIcon, EditIcon } from "@chakra-ui/icons"
import {BiLike, BiBookmark, BiWalk, BiFlag} from 'react-icons/bi';
import {AiOutlineArrowUp,AiOutlineStar, AiOutlineFieldTime, AiOutlineEye, AiFillMobile, AiFillEye, AiTwotoneInfoCircle, AiTwotoneExclamationCircle} from "react-icons/ai";

import { LoadingBox, MessageBox, Rating } from "components/helpers";



import { signout } from '../../Actions/userActions';
import { detailsScreen } from '../../Actions/screenActions';
import { getVideoDetails, likeVideo, unlikeVideo } from '../../Actions/videoActions';

import { useNftData, useNft } from 'api/hooks/useNft';
import { NftMediaContainer } from 'components/common/NftMediaContainer/index';
import { useFinnie } from 'components/finnie';


export function CampaignDashboard(props: any) {
  
  const videoId = props.match.params.id;
  const txId = props.match.params.txId;
  const {data: nft, isLoading, isError} = useNft({id: txId});
  const {data: nftData } = useNftData({id: txId});
  console.log("nft", {nft})

  /* Finnie */
  const {
    state: { connectFinnie, walletAddress, isLoading: finnieLoading, walletBalance, isFinnieConnected, walletPrice, xchangeRate, lastTxn, tokenHis },
  } = useFinnie();

  const [campaignModalOpen, setCampaignModalOpen] = React.useState<boolean>(false);

  const videoDetails = useSelector((state: any) => state.videoDetails);
  const {
    loading: loadingVideo, 
    error: errorVideo,
    video 
  } = videoDetails;

  const screenDetails = useSelector((state: any) => state.screenDetails);
  const {
    loading: loadingScreen,
    error: errorScreen,
    screen
  } = screenDetails;

  const userSignin = useSelector((state: any) => state.userSignin);
  const { loading: loadingUser, error: errorUser, userInfo } = userSignin;

  const dispatch = useDispatch();
  React.useEffect(() => {
    // if(video) {
    //   dispatch(detailsScreen(video.screen));
    // }
    dispatch(getVideoDetails(videoId));

  }, [
    dispatch,
    videoId,
    txId
  ])


  return (
    <Box px="2" pt="20">
      {loadingUser ? (
        <LoadingBox></LoadingBox>
      ) : errorUser ? (
        <MessageBox variant="danger">{errorUser}</MessageBox>
      ) : (
        <Box maxW="container.lg" mx="auto" pb="8">
          {loadingVideo ? (
            <LoadingBox></LoadingBox>
          ) : errorVideo ? (
            <MessageBox variant="danger">{errorVideo}</MessageBox>
          ) : (
            <Stack p="2" >
              <Stack align="center" p="2" direction="row" justify="space-between">
                <ArrowBackIcon onClick={() => props.history.goBack()}/>
                <Text fontWeight="600">Campaign Dashboard</Text>
                <IconButton bg="none" icon={<EditIcon size="20px" color="black" />} aria-label="Edit Screen Details"></IconButton>
              </Stack>
              <Box p="2" shadow="card" rounded="lg">
                <Text p="2"fontWeight="600" fontSize="md">{video?.title}</Text>
                <Text onClick={() => props.history.push(`/dashboard/user/${userInfo?.defaultWallet}`)} px="2" fontWeight="600" fontSize="sm" color="gray.500">{userInfo?.name}</Text>
                <Text px="2" pb="4" fontWeight="" fontSize="xs" color="gray.500">Video ID: {video._id}</Text>
                {/* <Text p="2" fontWeight="" fontSize="xs">₹ {walletPrice?.totalPrice?.toFixed(3)}</Text> */}
                <SimpleGrid gap="4" columns={[3]} p="2">
                  <Box bgGradient="linear-gradient(to bottom, #BC78EC20, #7833B660)" align="center" shadow="card" rounded="lg" p="2">
                    <Text fontWeight="" fontSize="xs">Frequency</Text>
                    <Text p="2" fontWeight="600" fontSize="lg">**</Text>
                  </Box>
                  <Box bgGradient="linear-gradient(to bottom, #BC78EC20, #7833B660)" align="center" shadow="card" rounded="lg" p="2">
                    <Text fontWeight="" fontSize="xs">View</Text>
                    <Text p="2" fontWeight="600" fontSize="lg">**</Text>
                  </Box>
                  <Box bgGradient="linear-gradient(to bottom, #BC78EC20, #7833B660)" align="center" shadow="card" rounded="lg" p="2">
                    <Text fontWeight="" fontSize="xs">Interaction</Text>
                    <Text p="2" fontWeight="600" fontSize="lg">**</Text>
                  </Box>
                </SimpleGrid>
              </Box>
              <Box p="2" shadow="card" rounded="lg">
                <SimpleGrid p="4" bgGradient="linear-gradient(to bottom, #)"gap="4" columns={[2]}>
                  <Button onClick={() => setCampaignModalOpen(false)} rounded="full" bgGradient="linear-gradient(to left, #BC78EC, #7833B6)" fontSize="xs" size="sm">
                    Status
                  </Button>
                  <Button onClick={() => setCampaignModalOpen(!campaignModalOpen)} rounded="full" color="violet.500" variant="outline" fontSize="xs" size="sm">
                    View
                  </Button>
                </SimpleGrid>
                {campaignModalOpen ? (
                  <>
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
                            <Text fontSize="xs">{video?.likedBy?.length}</Text>
                            <BiLike />
                            <Text fontSize="xs">Likes</Text>
                          </Box>
                          <Box align="center">
                            <Text fontSize="xs">{video?.flaggedBy?.length}</Text>
                            <BiFlag />
                            <Text fontSize="xs">Flags</Text>
                          </Box>
                          <Box align="center">
                            <Text fontSize="xs">{video?.rating}</Text>
                            <AiOutlineStar />
                            <Text fontSize="xs">Ratings</Text>
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
                      <Text fontSize="xs">Total Spending</Text>
                      <Text fontWeight="600" fontSize="xs">₹ 345</Text>
                    </Flex>
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
              
                  </>
                ) : (
                  <>
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
