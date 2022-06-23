import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import { Box, Image, Center, IconButton, Text, Stack, FormControl, FormLabel, Link, Select, Input, Flex, Button, SimpleGrid } from "@chakra-ui/react";
import {ArrowBackIcon, EditIcon } from "@chakra-ui/icons"
import {BiLike, BiBookmark, BiChevronRight, BiFlag} from 'react-icons/bi';
import {AiOutlineArrowUp,AiOutlineStar, AiOutlineFieldTime, AiOutlineEye, AiFillMobile, AiFillEye, AiTwotoneInfoCircle, AiTwotoneExclamationCircle} from "react-icons/ai";
import { RiDashboard2Line } from 'react-icons/ri';

import { signout } from '../../Actions/userActions';
import { detailsScreen } from '../../Actions/screenActions';
import { getScreenCalender } from '../../Actions/calenderActions';
import { getAdvertGameDetails } from '../../Actions/gameActions';
import { getVideoParams, getVideoDetails, likeVideo, reviewVideo, viewVideo, unlikeVideo, listAllVideos } from '../../Actions/videoActions';
import { REVIEW_VIDEO_RESET } from '../../Constants/videoConstants';

import { LoadingBox, MessageBox, Rating } from "components/helpers";

import { useNftData, useNft } from 'api/hooks/useNft';
import { NftMediaContainer } from 'components/common/NftMediaContainer/index';

export function AdvertDetail (props: any) {
  const videoId = props.match.params.id;
  const txId = props.match.params.txId;
  const screenId = props.match.params.screenId;
  const {data: nft, isLoading, isError} = useNft({id: txId});
  const {data: nftData } = useNftData({id: txId});
  console.log("nft", {nft})
  const [comment, setComment] = React.useState<any>('');
  const [rating, setRating] = React.useState<any>(0);

  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo } = userSignin;

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

  const screenCalender = useSelector((state: any) => state.screenCalender);
  const {
    loading: loadingScreenCalender,
    error: errorScreenCalender,
    calender
  } = screenCalender;

  const advertGameDetails = useSelector((state: any) => state.advertGameDetails);
  const {
    loading: loadingAdvertGameDetails,
    error: errorAdvertGameDetails,
    advertGameData
  } = advertGameDetails;

  const videoParams = useSelector((state: any) => state.videoParams);
  const { 
    loading: loadingVideoParams,
    error: errorVideoParams,
    params  
  } = videoParams;

  const videoReview = useSelector((state: any) => state.videoReview);
  const { 
    loading: reviewLoading, 
    error: reviewError, 
    success: reviewSuccess
  } = videoReview;

  const redirect = props?.location?.search
    ? props?.location?.search.split('=')[1]
    : '/signin';

  const dispatch = useDispatch();
  React.useEffect(() => {
    if (reviewSuccess) {
      window.alert('Review submitted successfully');
      setRating('');
      setComment('');
      dispatch({
          type: REVIEW_VIDEO_RESET
      })
    }

    if(!userInfo) {
      props.history.push(redirect);
    }

    dispatch(getVideoDetails(videoId));
 
    dispatch(getAdvertGameDetails(videoId));
    dispatch(getVideoParams(videoId));
    dispatch(detailsScreen(screenId));
    dispatch(getScreenCalender(screenId));
  }, [
    dispatch,
    videoId,
    screenId,
    reviewSuccess,
    txId
  ])


  
  function likeHandler(videoId: any) {
    console.log("like");
    if (userInfo) {
      window.alert('Please signin again to confirm your like and continue...');
      dispatch(likeVideo(videoId));
      // dispatch(signout());
    } else {
      alert("please sign in to like the video");
    }
  };

  function unlikeHandler(videoId: any) {
      console.log("like");
    if (userInfo) {
      window.alert('Please signin again to confirm your unlike and continue...');
      dispatch(unlikeVideo(videoId));
      // dispatch(signout());
    } else {
        alert("please sign in to unlike the video");
    }
  };

  const reviewHandler = (e: any) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(
        reviewVideo(videoId, { rating, comment, name: userInfo.name })
      );
    } else {
      alert('Please enter comment and rating');
    }
  };


  
  return (
    <Box px="2" pt="20">
      {loadingVideo ? (
        <LoadingBox></LoadingBox>
      ) : errorVideo ? (
        <MessageBox variant="danger">{errorVideo}</MessageBox>
      ) : (
        <>
          {loadingScreen ? (
            <LoadingBox></LoadingBox>
          ) : errorScreen ? (
            <MessageBox variant="danger">{errorScreen}</MessageBox>
          ) : (
            <Box maxW="container.lg" mx="auto" pb="8">
              <Stack p="2" direction="row" justify="space-between">
                <ArrowBackIcon onClick={() => props.history.goBack()}/>
                <Text fontWeight="600">Campaign Details</Text>
                {video.uploader === userInfo.defaultWallet ? (
                  <IconButton as={RouterLink} to={`/advert/${video._id}/${video?.video.split('/').slice(-1)[0]}/edit/${video?.screen}`} bg="none" icon={<EditIcon size="20px" color="black" />} aria-label="Edit Advert Details"></IconButton>
                ) : (
                  <IconButton bg="none" icon={<RiDashboard2Line size="20px" color="black" />} aria-label="Edit Advert Details"></IconButton>
                )}
              </Stack>
              <Stack px="2">
                <Flex py="2" align="center">
                  <Image 
                    src={video?.thumbnail}
                    width="100px"
                    rounded="md"
                  />
                  <Box p="4">
                    <Text fontSize="md" fontWeight="600">{video?.title}</Text>
                    <Text fontSize="xs" color="gray.500">Created by: {video?.uploaderName}</Text>
                  </Box>
                </Flex>
                {isLoading ? (
                  <LoadingBox></LoadingBox>
                ) : isError ? (
                  <MessageBox variant="danger">{isError}</MessageBox>
                ) : (
                  <SimpleGrid gap="4" columns={[1, 2]}>
                    <Box bg="" shadow="card" rounded="lg" align="center" justify="">
                      <NftMediaContainer nft={nft} />
                      <Flex p="4" align="center" justify="space-between">
                        <Box align="center">
                          <Text fontSize="xs">{video?.likedBy?.length || 0}</Text>
                          <BiLike />
                          <Text fontSize="xs">Likes</Text>
                        </Box>
                        <Box align="center">
                          <Text fontSize="xs">{video?.flaggedBy?.length || 0}</Text>
                          <BiFlag />
                          <Text fontSize="xs">Flags</Text>
                        </Box>
                        <Box align="center">
                          <Text fontSize="xs">{video?.rating || 0}</Text>
                          <AiOutlineStar />
                          <Text fontSize="xs">Ratings</Text>
                        </Box>
                        <Box align="center">
                          <Text fontSize="xs">{nft?.attention || 0}</Text>
                          <AiOutlineEye />
                          <Text fontSize="xs">Views</Text>
                        </Box>
                      </Flex>
                    </Box>
                    {loadingScreen ? (
                      <LoadingBox></LoadingBox>
                    ) : errorScreen ? (
                      <MessageBox variant="danger">{errorScreen}</MessageBox>
                    ) : (
                      <Box p="4" shadow="card" rounded="lg">
                        <Stack p="2" justify="space-between">
                          <Text  fontSize="xs" >Running on screen</Text>
                          <Text fontSize="md" fontWeight="600">{screen.name}</Text>
                        </Stack>
                        <hr />
                        <Stack p="2" justify="space-between">
                          <Text fontSize="xs" fontWeight="600">{video.brandName} Brand</Text>
                          <Text fontSize="xs" fontWeight="600">{video.category} Category</Text>
                        </Stack>
                        <hr />
                        <Stack p="2" direction="row" justify="space-between">
                          <Text fontSize="xs" fontWeight="600">Total Earnings to be made: {video?.adBudget} Ad Credits</Text>
                        </Stack>
                        <hr />
                      </Box>
                    )}
                  </SimpleGrid>  
                )}
                {video.uploader === userInfo.defaultWallet && (
                  <SimpleGrid p="2" gap="4" columns={[1, 2]}>
                    <Button onClick={() => props.history.push(`/advert/${video._id}/${video?.video.split('/').slice(-1)[0]}/edit/${video?.screen}`)} color="violet.500" variant="outline" fontSize="xs" size="sm">
                      Change Status
                    </Button>
                    <Button onClick={() => props.history.push(`/dashboard/campaign/${video._id}/${video?.video.split('/').slice(-1)[0]}`)} bgGradient="linear-gradient(to left, #BC78EC, #7833B6)" fontSize="xs" size="sm">
                      View Campaign
                    </Button>
                  </SimpleGrid>
                )}
              </Stack>
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
                        <Text fontSize="xs">Reviewed By <strong>{video.numReviews}</strong></Text>
                        <Text fontSize="xs">Average Ratings <strong>{video.rating}</strong></Text>
                      </Flex>
                      <Flex py="2" align="center" justify="space-between">
                        <Rating rating={video.rating} numReviews={video.numReviews}></Rating>
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
                      {reviewLoading && <LoadingBox></LoadingBox>}
                      {reviewError && <MessageBox variant="danger">{reviewError}</MessageBox>}
                    </Box>
                  ) : (
                  <MessageBox>
                    Please <Link to="/signin">Sign In</Link> to write a review
                  </MessageBox>
                  )}
                  <Box shadow="card" rounded="lg" p="4">
                    {video?.reviews?.length === 0 && <MessageBox>There is no review</MessageBox>}
                    {video?.reviews?.map((review: any) => (
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
            </Box>
          )}
        </>
      )}

    </Box>
  )
}