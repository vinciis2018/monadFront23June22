import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import { Box, Link, Image, Center, Text, Stack, IconButton, Flex, Button, FormControl, Select, FormLabel, Input, SimpleGrid } from "@chakra-ui/react";
import {ArrowBackIcon, EditIcon } from "@chakra-ui/icons"
import {BiLike, BiPieChart, BiBookmark, BiWalk, BiFlag} from 'react-icons/bi';

import {AiOutlineArrowUp, AiOutlineDelete, AiOutlineVideoCameraAdd, AiOutlineEye, AiOutlineArrowDown, AiTwotoneInfoCircle, AiTwotoneExclamationCircle} from "react-icons/ai";
import {VscRequestChanges} from 'react-icons/vsc';
import { LoadingBox, MessageBox, Rating } from "components/helpers";

import { deleteScreenVideo, likeScreen, unlikeScreen, flagScreen, subscribeScreen, unsubscribeScreen, detailsScreen, createReview, getScreenParams, screenVideosList, applyScreenAllyPlea } from '../../Actions/screenActions';
import { getScreenCalender } from '../../Actions/calenderActions';
import { listAllPleas } from '../../Actions/pleaActions';
import { getScreenGameDetails } from '../../Actions/gameActions';
import { SCREEN_REVIEW_CREATE_RESET } from '../../Constants/screenConstants';

import { useNftData, useNft } from 'api/hooks/useNft';
import { NftMediaContainer } from 'components/common/NftMediaContainer/index';

export function ScreenDetail (props: any) {
  const screenId = props.match.params.id;
  const txId = props?.match?.params?.txId;
  const activeGame = props?.match?.params?.gameId;

  const [dateHere, setDateHere] = React.useState<any>(new Date());

  const [rating, setRating] = React.useState(0);
  const [comment, setComment] = React.useState('');

  const [deleteModal, setDeleteModal] = React.useState(false);

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

  const screenVideoDelete = useSelector((state: any) => state.screenVideoDelete);
  const {
    loading: loadingVideoDelete,
    error: errorVideoDelete,
    success: successVideoDelete
  } = screenVideoDelete;

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

  const screenAllyPleaRequest = useSelector((state: any) => state.screenAllyPleaRequest)
  const {
    loading: loadingScreenAllyPlea,
    error: errorScreenAllyPlea,
    success: successScreenAllyPlea,
    screenAllyPlea
  } = screenAllyPleaRequest;

  const allPleasList = useSelector((state: any) => state.allPleasList);
  const { 
    allPleas, 
    loading: loadingAllPleas, 
    error: errorAllPleas 
  } = allPleasList;


  const screenParams = useSelector((state: any) => state.screenParams);
  const { 
    loading: loadingScreenParams,
    error: errorScreenParams,
    params  
  } = screenParams;

  const screenReviewCreate = useSelector((state: any) => state.screenReviewCreate);
  const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
  } = screenReviewCreate;

  const {data: nft, isLoading, isError} = useNft({id: txId});
  // const {data: nftData } = useNftData({id: txId});
  // console.log("nft", {nft})

  const redirect = props?.location?.search
    ? props?.location?.search.split('=')[1]
    : '/signin';

  const dispatch = useDispatch();
  React.useEffect(() => {
    if(!userInfo) {
      props.history.push(redirect);
    }

    if (successReviewCreate) {
      window.alert('Review submitted successfully');
      setRating(0);
      setComment('');
      dispatch({
        type: SCREEN_REVIEW_CREATE_RESET
      })
    }


    
    dispatch(detailsScreen(screenId));
    dispatch(screenVideosList(screenId));
    dispatch(getScreenCalender(screenId));
    dispatch(listAllPleas())
    dispatch(getScreenParams({screenId, activeGame}));
    dispatch(getScreenGameDetails({activeGame}));

    
  }, [
    dispatch,
    // screen,
    // txId,
    // nft,
    successVideoDelete
  ])

  const allyPleaHandler = () => {
    if (screen.pleas.includes(userInfo?._id)) {
      window.alert('you already applied for plea, contact master for more info');
    }
    window.alert('Apply for ally plea');
    dispatch(applyScreenAllyPlea(screenId));
  };

  const reviewHandler = (e: any) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(
        createReview(screenId, { rating, comment, name: userInfo?.name })
      );
    } else {
      alert('Please enter comment and rating');
    }
  };

  const deletePlaylistHandler = (video: any) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteScreenVideo(video._id));
    }
    props.history.push(`/screen/${screenId}/${screen.image.split('/').slice(-1)[0]}`)
  };

  const screenLikeHandler = async (screenId: any) => {
    if (userInfo) {
      window.alert('On liking this screen, you will be tipping the screen master from your default wallet. This will return as an incentive reward later...');
      if(params) {
        dispatch(likeScreen(screenId, {
            interaction: "like",
            params: params,
            calender: calender,
            screen: screen
          }
        ));
      } else {
        window.alert('Interaction not available, check again later');
      }
    } else {
      window.alert('Please sign in to like screen');
    }
  }

  function screenUnlikeHandler(screenId: any) {
    if (userInfo) {
      window.alert('You have already tipped the screen master, unliking will not refund your tip, and you may not be able to get incentivized with game raward');
      dispatch(unlikeScreen(screenId));
    } else {
      window.alert('Please sign in to unlike screen');
    }
  }

  function screenFlagHandler(screenId: any) {
    if(userInfo) {
      window.alert('On Flagging this screen, you are reporting the admin for an inspection by tipping the admin from your default wallet. This will return as an incentive reward later...');
      dispatch(flagScreen({screenId, interaction: "flag"}));
    } else {
      window.alert('Please sign in to flag screen');
    }
  }

  function screenSubscribeHandler(screenId: any) {
    if (userInfo) {
      window.alert('On Subscribing this screen, you are tipping the master from your default wallet. This will return as stored as a stoke for your withdrawal reward later...');
      setDateHere(new Date());
      dispatch(subscribeScreen({screenId, dateHere, interaction: "subscribe"}));
    } else {
      window.alert('Please sign in to subscribe screen');
    }
  }

  function screenUnsubscribeHandler(screenId: any) {
    if (userInfo) {
      window.alert('On Unsubscribing this screen, you are withdrawing the amount you paid to the master of the screen while subscribing...');
      dispatch(unsubscribeScreen({screenId, interaction: "unsubscribe"}));
    } else {
      window.alert('Please sign in to unsubscribe screen');
    }
  }

  return (
    <Box px="2" pt="20">
      {loadingUser ? (
        <LoadingBox></LoadingBox>
      ) : errorUser ? (
        <MessageBox message={errorUser}></MessageBox>
      ) : (
        <Center maxW="container.lg" mx="auto" pb="8">
          {loadingScreen ? (
            <LoadingBox></LoadingBox>
          ) : errorScreen ? (
            <MessageBox message={errorScreen}></MessageBox>
          ) : (
            <Stack p="2" >
              <Stack align="center" p="2" direction="row" justify="space-between">
                <ArrowBackIcon onClick={() => props.history.goBack()}/>
                <Text fontWeight="600">Screen Details</Text>
                <Flex>
                  {/* {walletAddress === screen.master.master._id} */}
                  {screen?.master === userInfo?.defaultWallet ? (
                    <IconButton as={RouterLink} to={`/edit/screen/${screenId}`} bg="none" icon={<EditIcon size="20px" color="black" />} aria-label="Edit Screen Details"></IconButton>
                  ) : (
                    <>
                      {screen?.allies?.filter((ally: any) => ally === userInfo?.defaultWallet).length !== 0 ? (
                        <IconButton  as={RouterLink} to={`/createCampaign/${screen._id}/${userInfo.defaultWallet}`} bg="none" icon={<AiOutlineVideoCameraAdd size="20px" color="black" />} aria-label="Edit Screen Details"></IconButton>
                      ) : (
                        <Flex align="center">
                          {loadingAllPleas ? (
                            <LoadingBox></LoadingBox>
                          ) : errorAllPleas ? (
                            <MessageBox variant="danger">{errorAllPleas}</MessageBox>
                          ) : (
                            <>
                              {allPleas?.filter((plea: any) => plea?.from === userInfo?.defaultWallet && plea.screen === screen._id).length !== 0 ? (
                                <Text fontWeight="600" fontSize="xs">
                                  {screen?.allies?.length}
                                </Text>
                              ) : (
                                <>
                                  {userInfo.isAlly ? (
                                    <IconButton onClick={allyPleaHandler} bg="none" icon={<VscRequestChanges size="20px" color="black" />} aria-label="Edit Screen Details"></IconButton>
                                  ) : (
                                    <Text fontSize="xs">You're not an Ally yet...</Text>
                                  )}
                                </>
                              )}
                            </>
                          )}
                        </Flex>
                      )}
                    </>
                  )}
                </Flex>
              </Stack>

              {isLoading && <LoadingBox></LoadingBox>}
              {isError && <MessageBox varian="danger">{isError}</MessageBox>}
              {nft && (
                <Box rounded="lg" color="gray.200" border="1px" shadow="card">
                  <Box onClick={() => props.history.push(`/myscreen/play/${screenId}`)}>
                    <NftMediaContainer nft={nft} />
                  </Box>
                  <Flex color="black" p="4" align="center" justify="space-between">
                    <Box onClick={screenLikeHandler} align="center">
                      <Text fontSize="xs">{screen?.likedBy?.length}</Text>
                      <BiLike color={screen?.likedBy?.filter((liker: any) => liker === userInfo?.defaultWallet).length !== 0 ? "green" : "" }/>
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


              <Flex p="2" align="center" justify="space-between"  rounded="lg" shadow="card">
                <Box p="2">
                  <Text fontWeight="600">{screen?.name}</Text>
                  <Text fontSize="xs" color="gray.500">{screen?.category}</Text>
                </Box>
                <Stack>
                  <Rating rating={screen?.rating} numReviews={screen?.numReviews}></Rating>
                </Stack>
              </Flex>
              <Flex p="2" align="center" justify="space-between" rounded="lg" shadow='card'>
                <Text onClick={() => props.history.push(`/artist/${screen?.master}`)} fontSize="xs" fontWeight="600" color="gray.500">Owner: {screen?.masterName}</Text>
                <Text fontSize="xs" fontWeight="600" color="gray.500">Allies: {screen?.allies?.length}</Text>
              </Flex>
              {/* Ally modal here */}

              {loadingScreenGameDetails ? (
                <LoadingBox></LoadingBox>
              ) : errorScreenGameDetails ? (
                <MessageBox variant="danger">{errorScreenGameDetails}</MessageBox>
              ) : (
                <Stack>
                  <Box p="4" rounded="lg" shadow="card">
                    <Text px="" fontSize="xs"><strong>ScreenId :</strong> {screen._id}</Text>
                    <Flex onClick={() => props.history.push(`/userProfile/${screen.master}`)}>
                      <Text fontSize="xs" fontWeight="600">Wallet : </Text>
                      <Text px="5px" color="gray.500" fontSize="xs" fontWeight="600">{screen.master}</Text>
                    </Flex>
                    <Flex>
                      <Text fontSize="xs" fontWeight="600">Location : </Text>
                      <Text px="5px" color="gray.500" fontSize="xs" fontWeight="600">{screen.screenAddress}, {screen.districtCity}, {screen.stateUT}, {screen.country}  </Text>
                    </Flex>
                    {loadingScreenCalender ? (
                      <LoadingBox></LoadingBox>
                    ) : errorScreenCalender ? (
                      <MessageBox variant="danger">{errorScreenCalender}</MessageBox>
                    ) : (
                      <Flex 
                        as={Link}
                        href={`https://viewblock.io/arweave/tx/${calender?.activeGameContract}`}
                        isExternal
                        rel="noopener noreferrer"
                        align="center"
                      >
                        <AiTwotoneInfoCircle
                          color="green"
                          fontSize="10px"
                        />
                        <Text px="2" fontSize="sm" color="green.500" fontWeight="600">{screenGameData?.state?.gameType}</Text>
                   
                      </Flex>
                    )}
                  </Box>
                  <hr />

                  <Stack p="4" align="center" rounded="lg" shadow="card">
                    <Text fontSize="sm" fontWeight="600">Available Slots for the day</Text>
                    <Flex align="center">
                      <Text px="2" fontSize="xl" fontWeight="600" color="gray.500">2146</Text>
                      <BiPieChart fontSize="20px" color="green" />
                    </Flex>
                  </Stack>
                  {loadingScreenParams ? (
                    <LoadingBox></LoadingBox>
                  ) : errorScreenParams ? (
                    <MessageBox variant="danger">{errorScreenParams}</MessageBox>
                  ) : (
                    <SimpleGrid py="4" gap="4" columns={[2]} >
                      <Box rounded="lg" shadow="card" border="1px" borderColor="gray.300" p="2">
                        <Flex align="center" justify="space-between">
                          <Stack px="1">
                            <Flex>
                              <Text fontSize="xs">Worth : </Text>
                              <Text fontWeight="400" color="gray.500" fontSize="xs">₹{screen.scWorth}</Text>
                            </Flex>
                            <Text px="1" fontWeight="600" color="gray.500" fontSize="md">₹{params.Wdash}</Text>
                          </Stack>
                          {params.Wdash > screen.scWorth && (
                            <AiOutlineArrowUp fontSize="30px" color="green"/>
                          )}
                          {params.Wdash < screen.scWorth && (
                            <AiOutlineArrowDown fontSize="30px" color="red" />
                          )}
                        </Flex>
                      </Box>
                      <Box border="1px" rounded="lg" shadow="card" borderColor="gray.300" p="2">
                        <Flex align="center" justify="space-between">
                          <Stack px="1">
                            <Flex>
                              <Text fontSize="xs">Slot Rent : </Text>
                              <Text fontWeight="400" color="gray.500" fontSize="xs">₹{screen.rentPerSlot}</Text>
                            </Flex>
                            <Text px="1" fontWeight="600" color="gray.500" fontSize="md">₹{params.Rdash}</Text>
                          </Stack>
                          {params.Rdash > screen.rentPerSlot && (
                            <AiOutlineArrowUp fontSize="30px" color="green"/>
                          )}
                          {params.Rdash < screen.rentPerSlot && (
                            <AiOutlineArrowDown fontSize="30px" color="red" />
                          )}
                        </Flex>
                      </Box>
                    </SimpleGrid>
                  )}
                </Stack>
              )}
              <Box p="2" rounder="lg" shadow="card">
                <Text p="1" fontSize="" fontWeight="600">Details </Text>
                <Text px="1" fontSize="sm"><strong>Description :</strong> {screen.description}</Text>
                <Text px="1" fontSize="sm"><strong>Time period of 1 slot :</strong> {screen.slotsTimePeriod} seconds</Text>
                <Text px="1" fontSize="sm"><strong>Screen Type :</strong> {screen.screenType}</Text>
              </Box>
              <hr />
              {loadingAllPleas ? (
                <LoadingBox></LoadingBox>
              ) : errorAllPleas ? (
                <MessageBox variant="danger">{errorAllPleas}</MessageBox>
              ) : (
                <Box p="2" rounder="lg" shadow="card">
                  <SimpleGrid gap="4" columns={[2]}>
                    <Stack align="center">
                      <Text fontSize="xs" fontWeight="600">Number of Allies:</Text> 
                      <Text fontSize="sm" fontWeight="600">{screen?.allies?.length}</Text>
                    </Stack>
                    <Stack align="center">
                      <Text fontSize="xs" fontWeight="600">Pending ally pleas: </Text>
                      <Text fontSize="sm" fontWeight="600">{allPleas?.filter((plea: any) => (plea.status === false && plea.screen === screen._id)).length}</Text>
                    </Stack>
                  </SimpleGrid>
                </Box>
              )}
              {loadingScreenVideos ? (
                <LoadingBox></LoadingBox>
              ) : errorScreenVideos ? (
                <MessageBox variant="danger">{errorScreenVideos}</MessageBox>
              ) : (
                <Stack p="1">
                  <Flex align="center" justify="space-between">
                    <Text fontSize="md" fontWeight="600">Currently playing on the screen</Text>
                    {userInfo?.defaultWallet === screen.master ? (
                      <IconButton onClick={() => setDeleteModal(!deleteModal)} bg="none" icon={<AiOutlineDelete size="20px" color="black" />} aria-label="Edit Screen Details"></IconButton>
                    ) : screen?.allies?.filter((ally: any) => ally === userInfo.defaultWallet) && (
                      <IconButton onClick={() => setDeleteModal(!deleteModal)} bg="none" icon={<AiOutlineDelete size="20px" color="black" />} aria-label="Edit Screen Details"></IconButton>
                    )}
                  </Flex>
                  {videos.length === 0 && <MessageBox>Please upload your first campaign</MessageBox>}
                  {videos.map((video: any) => (
                    <Box key={video._id} color="gray.200" border="1px" p="2" rounded="md" shadow="card">
                      {loadingVideoDelete ? (
                        <LoadingBox></LoadingBox>
                      ) : errorVideoDelete ? (
                        <MessageBox variant="danger">{errorScreenVideos}</MessageBox>
                      ) : (
                        <Flex justify="space-between" align="center">
                          <Flex as={RouterLink} to={`/advert/${video._id}/${video?.video.split('/').slice(-1)[0]}/${video.screen}`} >
                            <Image 
                              px="1px"
                              src={video?.thumbnail}
                              width="150px"
                              height="100px"
                              rounded="md"
                            />
                            <Box color="black" p="2">
                              <Text px="1" fontSize="md" fontWeight="600">{video?.title}</Text>
                              <Text px="1" fontSize="xs" fontWeight="600"color="gray.500">{video?.category}</Text>
                              <Text px="1" fontSize="xs" fontWeight=""color="gray.500">{video?.description}</Text>
                              <Text p="1" fontSize="sm" fontWeight=""color="gray.500">Uploaded by: {video?.uploaderName}</Text>

                            </Box>
                          </Flex>
                            {deleteModal && video.uploader === userInfo?.defaultWallet && (
                              <IconButton onClick={() => deletePlaylistHandler(video)} bg="none" icon={<AiOutlineDelete size="20px" color="black" />} aria-label="Edit Screen Details"></IconButton>
                            )}
                        </Flex>
                      )}
                    </Box>
                  ))}
                </Stack>
              )}
              {screen.master === userInfo?.defaultWallet && (
                <SimpleGrid gap="2" columns={[2]} p="10px" align="center" justify="space-between">
                  <Button size="sm" fontSize="xs" bgGradient="linear-gradient(to left, #BC78EC, #7833B6)" as={RouterLink} to={`/createCampaign/${screen._id}/${userInfo?.defaultWallet}`} p="2" >Create Campaign</Button>
                  <Button size="sm" fontSize="xs" color="violet.500" variant="outline" as={RouterLink} to={`/dashboard/screen/${screen._id}`} p="2" >View Dashboard</Button>
                </SimpleGrid>
              )}
              <Stack>
                <SimpleGrid p="2" gap="4" columns={[1, 2]}>
                  {userInfo ? (
                    <Box shadow="card" rounded="lg" p="4">
                      <FormControl id="comment">
                        <FormLabel fontSize="xs">Write a comment and get a chance to get free tokens...</FormLabel>
                        <Stack direction="row" align="center">
                          <Input 
                            id="comment"
                            onChange={(e: any) => setComment(e.target.value)} 
                            placeholder={comment} 
                            value={comment}
                            type="text"  
                          />
                        </Stack>
                      </FormControl>
                      <Flex p="2" align="center" justify="space-between">
                        <Text fontSize="xs">Reviewed By <strong>{screen?.numReviews}</strong></Text>
                        <Text fontSize="xs">Average Ratings <strong>{screen?.rating}</strong></Text>
                      </Flex>
                      <Flex py="2" align="center" justify="space-between">
                        <Rating rating={screen?.rating} numReviews={screen?.numReviews}></Rating>
                        <FormControl p="2" id="rating">
                          <Stack direction="row" align="center">
                            <Select
                              title="rating"
                              value={rating}
                              onChange={(e: any) => setRating(e.target.value)}
                            >
                              <option value="">Rating...</option>
                              <option value="1">1- Poor</option>
                              <option value="2">2- Fair</option>
                              <option value="3">3- Good</option>
                              <option value="4">4- Very Good</option>
                              <option value="5">5- Excellent</option>
                            </Select>
                          </Stack>
                        </FormControl>
                      </Flex>
                      <hr />
                      <Button bgGradient="linear-gradient(to left, #BC78EC, #7833B6)" fontSize="xs" size="sm" width="100%" type="submit" onSubmit={reviewHandler}>Submit</Button>
                      {loadingReviewCreate && <LoadingBox></LoadingBox>}
                      {errorReviewCreate && <MessageBox variant="danger">{errorReviewCreate}</MessageBox>}
                    </Box>
                  ) : (
                  <MessageBox>
                    Please <Link to="/signin">Sign In</Link> to write a review
                  </MessageBox>
                  )}
                  <Box shadow="card" rounded="lg" p="4">
                    {screen?.reviews?.length === 0 && <MessageBox>There is no review</MessageBox>}
                    {screen?.reviews?.map((review: any) => (
                      <Box shadow="card" p="2" rounded="lg" key={review?._id}>
                        <Flex >
                          <Text fontSize="md">{review?.name}</Text>
                          <Rating rating={review?.rating} caption=" "></Rating>
                        </Flex>
                        <Text fontSize="md">{review?.createdAt?.substring(0, 10)}</Text>
                        <hr />
                        <Text fontSize="md">{review?.comment}</Text>
                      </Box>
                    ))}
                  </Box>
                </SimpleGrid>
              </Stack>
            </Stack>
          )}
      </Center>
      )}
    </Box>
  )
}