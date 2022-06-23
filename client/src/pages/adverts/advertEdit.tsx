import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
  DatePicker,
  DateTimePicker,
  TimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { IconButton as MiuiIconButton, InputAdornment } from "@material-ui/core";

import { Box, Heading, Wrap, WrapItem, Badge, Slider, SliderTrack, SliderMark, SliderFilledTrack, SliderThumb, FormControl, Select, FormLabel, Input, Center, Link, Flex, Stack, SimpleGrid, Image, Text, Button, IconButton, ButtonGroup } from "@chakra-ui/react";

import {ArrowBackIcon, EditIcon, InfoIcon, CalendarIcon, TimeIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons"
import {BiGame, BiDislike, BiChevronRight, BiFlag} from 'react-icons/bi';
import {GiStopSign} from "react-icons/gi";
import {BsUpload} from 'react-icons/bs';
import {MdOutlinePublishedWithChanges} from 'react-icons/md';

import { signout } from '../../Actions/userActions';
import { detailsScreen } from '../../Actions/screenActions';
import { LoadingBox, MessageBox } from "components/helpers";

import { useNft } from 'api/hooks/useNft';
import { useFinnie } from 'components/finnie';
import { useArtist } from "api/hooks";

import { NftMediaContainer } from 'components/common/NftMediaContainer/index';
import { createAdvertGame, removeAdvertGame, getAdvertGameDetails, getScreenGameDetails } from '../../Actions/gameActions';
import { addCalenderData, getScreenCalender, bookSlot, bookDay, bookDaySlot } from '../../Actions/calenderActions';
import {getVideoDetails, updateVideo} from '../../Actions/videoActions';
import { VIDEO_UPDATE_RESET } from '../../Constants/videoConstants';

export function AdvertEdit (props: any) {
  const videoId = props.match.params.id;
  const screenId = props.match.params.screenId;
  
  const [txId, setTxId] = React.useState<any>(props.match.params.txId);
  const {data: nft, isLoading, isError} = useNft({id: txId});

  const {
    state: { connectFinnie, walletAddress, isLoading: finnieLoading, walletBalance, isFinnieConnected }
  } = useFinnie();

  const { data: artist, 
    isLoading: isLoadingArtist, 
    isError: isErrorArtist 
  } = useArtist({ id: walletAddress });


  const [title, setTitle] = React.useState<any>('');
  const [description, setDescription] = React.useState<any>('');
  const [thumbnail, setThumbnail] = React.useState<any>('');
  const [advert, setAdvert] = React.useState<any>('');
  const [adWorth, setAdWorth] = React.useState<any>(0);
  const [adBudget, setAdBudget] = React.useState<any>(0);
  const [expectedViews, setExpectedViews] = React.useState<any>(0);
  const [hrsToComplete, setHrsToComplete] = React.useState<any>(0);
  const [advertTags, setAdvertTags] = React.useState<any>([]);
  const [category, setCategory] = React.useState<any>('')
  const [brandName, setBrandName] = React.useState<any>('')


  const [modalVisible, setModalVisible] =React.useState<any>(false);
  const [dayModalVisible, setDayModalVisible] =React.useState<any>(true);
  const [timeModalVisible, setTimeModalVisible] =React.useState<any>(false);

  const [mediaUploadModal, setMediaUploadModal] = React.useState<any>(false);
  const [selectThumbnailPopup, setSelectThumbnailPopup] = React.useState<any>(false);
  const [selectAdvertPopup, setSelectAdvertPopup] = React.useState<any>(false);
  const [selectMediaPopup, setSelectMediaPopup] = React.useState<any>(false)

  const [slotsModalOpen, setSlotsModalOpen] = React.useState<any>(false);
  const [daySlotsModalOpen, setDaySlotsModalOpen] = React.useState<any>(false);

  const [dateHere, setDateHere] = React.useState<any>(new Date());
  const [startDateHere, setStartDateHere] = React.useState<any>(new Date());
  const [endDateHere, setEndDateHere] = React.useState<any>(new Date());

  const [slotsPerDay, setSlotsPerDay] = React.useState<any>(1);

  const [slotBooked, setSlotBooked] = React.useState<any>("")
  const [dayBooked, setDayBooked] = React.useState<any>("")
  var [date, setDate] = React.useState<any>(new Date());

  
  const userSignin = useSelector((state: any) => state.userSignin);
  const { loading: loadingUser, error: errorUser, userInfo } = userSignin;

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

  
  const slotBooking = useSelector((state: any) => state.slotBooking);
  const {
    loading: loadingSlotBooking,
    error: errorSlotBooking,
    success: successSlotBooking,
    bookedSlot
  } = slotBooking;

  const screenCalender = useSelector((state: any) => state.screenCalender);
  const {
    loading: loadingScreenCalender,
    error: errorScreenCalender,
    calender
  } = screenCalender;

  const calenderDataAdd = useSelector((state: any) => state.calenderDataAdd);
  const {
    loading: loadingCalenderDataAdd,
    error: errorCalenderDataAdd,
    success: successCalenderDataAdd,
    calenderSlotData
  } = calenderDataAdd;

  const calenderDaySlotBook = useSelector((state: any) => state.calenderDaySlotBook);
  const {
    loading: loadingDaySlotBook,
    error: errorDaySlotBook,
    success: successDaySlotBook,
    calenderDaySlotData
  } = calenderDaySlotBook;

  const dayBooking = useSelector((state: any) => state.dayBooking);
  const {
    loading: loadingDayBooking,
    error: errorDayBooking,
    success: successDayBooking,
    bookedDay
  } = dayBooking;

  const videoUpdate = useSelector((state: any) => state.videoUpdate);
  const {
    loading: loadingVideoUpdate,
    error: errorVideoUpdate,
    success: successVideoUpdate,
  } = videoUpdate;
  
  const advertGameCreate = useSelector((state: any) => state.advertGameCreate);
  const {
    loading: loadingAdvertGameCreate,
    error: errorAdvertGameCreate,
    success: successAdvertGameCreate,
    createdAdvertGame
  } = advertGameCreate

  const advertGameDetails = useSelector((state: any) => state.advertGameDetails);
  const {
    loading: loadingAdvertGameDetails,
    error: errorAdvertGameDetails,
    advertGameData
  } = advertGameDetails;

  const advertGameRemove = useSelector((state: any) => state.advertGameRemove);
  const {
    loading: loadingAdvertGameRemove,
    error: errorAdvertGameRemove,
    success: successAdvertGameRemove
  } = advertGameRemove

  const redirect = props?.location?.search
    ? props?.location?.search.split('=')[1]
    : '/signin';

  const dispatch = useDispatch();
  React.useEffect(() => {
    if(!isFinnieConnected) {
      connectFinnie()
    }
    if (!video || video._id !== videoId || successVideoUpdate) {
      dispatch({
        type: VIDEO_UPDATE_RESET
      });
      dispatch(getVideoDetails(videoId));
    } else {
      setTxId(video.video.split("/").slice(-1)[0]);
      setTitle(video.title);
      setThumbnail(thumbnail || video.thumbnail);
      setAdvert(advert || video.video);
      setDescription(video.description);
      setAdWorth(video.adWorth);
      setAdBudget(video.adBudget);
      setHrsToComplete(video.hrsToComplete);
      setExpectedViews(video.expectedViews);
      setAdvertTags(video.videoTags);
      setCategory(video.category);
    }

    if(successSlotBooking) {
      window.alert('slot booked successfully');
      setSlotsModalOpen(false)
      setSlotBooked(false)
      dispatch(getScreenCalender(screenId))
    }
    if(successDayBooking){
      window.alert('day booked successfully');
      setDaySlotsModalOpen(false)
      setDayBooked(false)
      dispatch(getScreenCalender(screenId))
    }
    if(successAdvertGameCreate) {
      window.alert('Advert Game Created Successfully')
    }
    if(successAdvertGameRemove) {
      window.alert('Advert Game Removed Successfully')
    }

    if(!userInfo) {
      props.history.push(redirect);
    }

    dispatch(getVideoDetails(videoId));
    dispatch(detailsScreen(screenId));
    dispatch(getVideoDetails(videoId));
    dispatch(getScreenCalender(screenId))
    dispatch(getAdvertGameDetails(videoId))
  }, [
    dispatch, 
    userInfo, 
    videoId, 
    screenId,
    successCalenderDataAdd,
    successDaySlotBook,
    successSlotBooking,
    bookedSlot,
    successVideoUpdate,
    createdAdvertGame,
    successAdvertGameCreate,
    successAdvertGameRemove,
    txId
  ])


const openDayModal = () => {
  setTimeModalVisible(false);
  setDayModalVisible(true);
}
const openTimeModal = () => {
  setDayModalVisible(false);
  setTimeModalVisible(true);

}

  const dateTimeHandler = () => {
    setDaySlotsModalOpen(false)
    setSlotsModalOpen(true)
    dispatch(addCalenderData(video.screen, {
      dateHere,
      video
    }))
  }

  const daySlotHandler = () => {
    setSlotsModalOpen(false)
    setDaySlotsModalOpen(true)
    dispatch(bookDaySlot(screenId, {
      startDateHere,
      endDateHere,
      slotsPerDay,
      video
    }))
  }

  const slotBookingHandler = (slotId: any) => {
    setSlotsModalOpen(true)
    setSlotBooked(true)
    window.alert('Confirm Booking slot')
    dispatch(bookSlot(screenId, slotId, {
      dateHere,
      slotBooked,
      video
    }));
  }

  const dayBookingHandler = (dayId: any) => {
    setDaySlotsModalOpen(true)
    setDayBooked(true)
    window.alert('Confirm Booking day')
    dispatch(bookDay(screenId, dayId, {
      startDateHere,
      endDateHere,
      daySlot: calenderDaySlotData.daySlot,
      slotsPerDay,
      dayBooked,
      video
    }));
  }

  const videoUpdateHandler = (e: any) => {
    e.preventDefault();
    dispatch(updateVideo({
      _id: videoId,
      advert,
      thumbnail,
      title,
      description,
      adWorth,
      adBudget,
      expectedViews,
      hrsToComplete,
      advertTags,
      category,
      brandName
    }))
  }

  const addGameContract = async (e: any) => {
    let confirm: any;
    e.preventDefault();
    window.alert('Please confirm your request to create screen game.')
    await window.arweaveWallet.getActivePublicKey().then(res => {
      confirm = res;
      return confirm
    })
    dispatch(createAdvertGame(videoId, {
      _id: videoId,
      name: title,
      description,
      category,
      brandName,
      thumbnail,
      advert,
      adWorth,
      expectedViews,
      hrsToComplete,
      adBudget,
      tags: advertTags,
      confirm,
      gamePage: `${window.location.href.split(`/edit/${video.screen}`)[0]}`,
      gameType: `ADVERT_GAME`,
      walletAddress: userInfo.defaultWallet
      
    }))
  }

  const removeGameContract = (e: any) => {
    e.preventDefault();
    dispatch(removeAdvertGame(videoId))
  }

  const uploadAdvertMedia = () => {
    setSelectMediaPopup(!selectMediaPopup);
    setSelectThumbnailPopup(false);
    setSelectAdvertPopup(!selectAdvertPopup);
  }

  const uploadThumbnailMedia = () => {
    setSelectMediaPopup(!selectMediaPopup);
    setSelectAdvertPopup(false);
    setSelectThumbnailPopup(!selectThumbnailPopup);
  }

  const chooseAdvert = (e: any) => {
    e.preventDefault();
    setAdvert(e.target.value);
    setSelectMediaPopup(!selectMediaPopup);
    setSelectAdvertPopup(!selectAdvertPopup);
    setSelectThumbnailPopup(false);
  }

  const chooseThumbnail = (e: any) => {
    e.preventDefault();
    setThumbnail(e.target.value);
    setSelectMediaPopup(!selectMediaPopup);
    setSelectThumbnailPopup(!selectThumbnailPopup);
    setSelectAdvertPopup(false);
  }

  const calenderHandler = () => {
    setModalVisible(!modalVisible)
    setMediaUploadModal(false)
  }

  return (
    <Box px="2" py="20">
      <Box maxW="container.lg" mx="auto" pb="8">
        {loadingUser ? (
          <LoadingBox></LoadingBox>
        ) : errorUser ? (
          <MessageBox variant="danger">{errorUser}</MessageBox>
        ) : (
          
        <Box >
          <Stack p="2" direction="row" justify="space-between">
            <ArrowBackIcon onClick={() => props.history.goBack()}/>
            <Text fontWeight="600">Edit Campaign Details</Text>
            <MdOutlinePublishedWithChanges color="green" onClick={videoUpdateHandler}/>
          </Stack>
          {/* <hr /> */}
          {loadingVideo ? (
            <LoadingBox></LoadingBox>
          ) : errorVideo ? (
            <MessageBox variant="danger">{errorVideo}</MessageBox>
          ) : (
            <Stack px="2">
              {!modalVisible ? (
                <Stack>
                  {!mediaUploadModal ? (
                    <Stack p="2">
                      {isLoading && <LoadingBox></LoadingBox>}
                      {isError && <MessageBox variant="danger">{isError}</MessageBox>}
                      {!isLoading && (
                        <Box>
                          <Text p='1' fontSize="xs" fontWeight="600" color="">Advert for "{video?.title}" Ad Campaign</Text>
                          <NftMediaContainer nft={nft} />
                          <Text onClick={() => setMediaUploadModal(!mediaUploadModal)} p="1" align="center" fontWeight="600" fontSize="sm">Click here to change the advert</Text>

                        </Box>
                      )}
                      <Box shadow="card" p="2" rounded="lg" >
                        <Text align="center" fontWeight="600" p="2" fontSize="md">Edit your campaign details</Text>
                        <FormControl p="2" id="title">
                          <Stack direction="row" align="center">
                            <Input 
                              id="title"
                              onChange={(e) => setTitle(e.target.value)} 
                              placeholder={title} 
                              value={title}
                              type="text"  
                            />
                          </Stack>
                          <FormLabel px="1" fontSize="xs">Your campaign will be known by this name...</FormLabel>
                        </FormControl>
                        <FormControl p="2" id="description">
                          <Stack direction="row" align="center">
                            <Input 
                              id="description"
                              onChange={(e) => setDescription(e.target.value)} 
                              placeholder={description} 
                              value={description}
                              type="text"  
                            />
                          </Stack>
                          <FormLabel px="1" fontSize="xs">This will explain about your campaign...</FormLabel>
                        </FormControl>
                        <FormControl p="2" id="category">
                          <Stack direction="row" align="center">
                            <Select
                              placeholder={category}
                              value={category}
                              onChange={(e) => setCategory(e.target.value)}
                            >
                              <option value="AUTOMOBILE">Automobile</option>
                              <option value="COACHING_INSTITUTE">Coaching/Institute</option>
                              <option value="CONSUMER_GOOD">Consumer Good</option>
                              <option value="CONSUMER_TECH">Cosumer Tech</option>
                              <option value="ENTERTAINMENT">Entertainment</option>
                              <option value="FOOD_BEVEREGE">Food/Beverege</option>
                              <option value="GOVERNMENT">Government Body</option>
                              <option value="HEALTH_MEDICINE">Health/Medicine</option>
                              <option value="HOSPITAL_LABS">Hospital/Pharma Lab</option>
                              <option value="HOTEL_ACCOMODATION">Hotel/Accomodation</option>
                              <option value="NEWS_POLITICS">News/Politics</option>
                              <option value="SCHOOL_COLLEGE">School/College</option>
                              <option value="STARTUP_MSME">Startup/MSME</option>
                              <option value="TRAVEL_TOURISM">Travel/Toursim</option>
                              <option value="OTHER">Others</option>
                            </Select>
                          </Stack>
                          <FormLabel px="1" fontSize="xs">Campaign Category</FormLabel>
                        </FormControl>
                        <FormControl p="2" id="brandName">
                          <Stack direction="row" align="center">
                            <Input 
                              id="brandName"
                              onChange={(e) => setBrandName(e.target.value)} 
                              placeholder={brandName} 
                              value={brandName}
                              type="text"  
                            />
                          </Stack>
                          <FormLabel px="1" fontSize="xs">Mention the name of the brand for this campaign...</FormLabel>
                        </FormControl>
                        <FormControl p="2" id="advertTags">
                          <Stack direction="row" align="center">
                            <Input 
                              id="advertTags"
                              onChange={(e) => setAdvertTags(e.target.value)} 
                              placeholder="nsfw,art,holiday, ...etc" 
                              value={advertTags}
                              />
                          </Stack>
                          <FormLabel px="1" fontSize="xs">These tags will help in increasing your campaign's visibility...</FormLabel>
                          <Wrap spacing="8px" mt="3" mb="3">
                            {Object.keys(advertTags).map((key) => [String(key), advertTags[key]]).map((t) => (
                              <WrapItem  key={t[1]}>
                                <Badge rounded="md" shadow="card" py="1" px="2"  colorScheme="blue">{t[1]}</Badge>
                              </WrapItem>
                            ))}
                          </Wrap>
                        </FormControl>
                      </Box>
                      <Box py="2">
                        <Text p='1' fontSize="xs" fontWeight="600" color="">Thumbnail for "{video?.title}" Ad Campaign</Text>
                        <Image 
                          px="1px"
                          src={video?.thumbnail}
                          width="100%"
                          height="240px"
                          rounded="md"
                        />
                      </Box>
                      <Box shadow="card" p="2" rounded="lg" >
                        {!video.activeGameContract && (
                          <Stack>
                            <Text p="2" textAlign="center" fontSize="md" fontWeight="600" >Edit Game Details</Text>
                            <FormControl p="2" id="adWorth">
                              <Stack direction="row" align="center">
                                <Input 
                                  id="adWorth"
                                  onChange={(e) => setAdWorth(e.target.value)} 
                                  placeholder={adWorth} 
                                  value={adWorth}
                                  type="number"  
                                />
                              </Stack>
                              <FormLabel px="1" fontSize="xs">This is the amount of RAT that you want for the data of this campaign...</FormLabel>
                            </FormControl>
                            <FormControl p="2" id="adBudget">
                              <Stack direction="row" align="center">
                                <Input 
                                  id="adBudget"
                                  onChange={(e) => setAdBudget(e.target.value)} 
                                  placeholder={adBudget} 
                                  value={adBudget}
                                  type="number"  
                                />
                              </Stack>
                              <FormLabel fontSize="xs">This is the amount of RAT that you want to distribute among your campaign's audiences...</FormLabel>
                            </FormControl>
                            <FormControl p="2" id="expectedViews">
                              <Stack direction="row" align="center">
                                <Input 
                                  id="expectedViews"
                                  onChange={(e) => setExpectedViews(e.target.value)} 
                                  placeholder={expectedViews} 
                                  value={expectedViews}
                                  type="number"  
                                />
                              </Stack>
                              <FormLabel fontSize="xs">This is the minimum number of interactions that you want from your audiences...</FormLabel>
                            </FormControl>
                            <FormControl p="2" id="hrsToComplete">
                              <Stack direction="row" align="center">
                                <Input 
                                  id="hrsToComplete"
                                  onChange={(e) => setHrsToComplete(e.target.value)} 
                                  placeholder={hrsToComplete} 
                                  value={hrsToComplete}
                                  type="number"  
                                />
                              </Stack>
                              <FormLabel fontSize="xs">This the number of hours you took to create this campaign...</FormLabel>
                            </FormControl>
                            {loadingAdvertGameCreate ? (
                              <LoadingBox></LoadingBox>
                            ) : errorAdvertGameCreate ? (
                              <MessageBox variant="danger">{errorAdvertGameCreate}</MessageBox>
                            ) : (
                              <Flex p="2"  onClick={addGameContract} align="center" justify="flex-end">
                                <IconButton bg="none" icon={<BiGame size="20px" color="green" />} aria-label="Edit Advert Details"></IconButton>
                                <Text fontWeight="600" color="green.500" fontSize="xs">Create Game Contract</Text>
                                {/* <Button color="violet.500" variant="outline" width="20%" onClick={addGameContract}>Create Game</Button> */}
                              </Flex>
                            )}
                          </Stack>
                        )}
                        {video.activeGameContract && (
                          <Stack>
                            {loadingAdvertGameDetails ? (
                              <LoadingBox></LoadingBox>
                            ) : errorAdvertGameDetails ? (
                              <MessageBox variant="danger">{errorAdvertGameDetails}</MessageBox>
                            ) : (
                              <Box>
                                {advertGameData?.message && (
                                  <MessageBox variant="danger">{advertGameData.message}</MessageBox>
                                )}
                                
                                <Flex align="center" justify="space-between">
                                  <Box shadow="card" border="1px" borderColor="gray.200" rounded="md" p="1" width="30%" align="center">
                                    <Text fontSize="xs">Initial Worth</Text>
                                    <Text fontWeight="600" fontSize="">INR {advertGameData?.gameParams?.initialWorth}</Text>
                                  </Box>
                                  <Box shadow="card" border="1px" borderColor="gray.200" rounded="md" p="1" width="30%" align="center">
                                    <Text fontSize="xs">Initial Budget</Text>
                                    <Text fontWeight="600" fontSize="">INR {advertGameData?.gameParams?.initialBudget}</Text>
                                  </Box>
                                  <Box shadow="card" border="1px" borderColor="gray.200" rounded="md" p="1"  width="30%" align="center">
                                    <Text fontSize="xs">Expected Views</Text>
                                    <Text fontWeight="600" fontSize="">{advertGameData?.gameParams?.expectedViews}</Text>
                                  </Box>
                                </Flex>
                              </Box>
                            )}
                            {loadingAdvertGameRemove ? (
                              <LoadingBox></LoadingBox>
                            ) : errorAdvertGameRemove ? (
                              <MessageBox variant="danger">{errorAdvertGameRemove}</MessageBox>
                            ) : (
                              <Flex p="2"  onClick={removeGameContract} align="center" justify="flex-end">
                                <IconButton bg="none" icon={<GiStopSign size="20px" color="red" />} aria-label="Edit Advert Details"></IconButton>
                                <Text onClick={() => window.location.replace("/")} fontWeight="600" color="red.500" fontSize="xs">Remove Active Game Contract</Text>
                                {/* <Button width="20%" color="violet.500" variant="outline" onClick={removeGameContract}>Remove Game</Button> */}
                              </Flex>
                            )}
                          </Stack>
                        )}
                        {video.__v < 1 && (
                          <Badge rounded="md" px="2" py="1" fontSize="xs">Change tags and update first</Badge>
                        )}
                      </Box>
                      <Button bgGradient="linear-gradient(to left, #BC78EC, #7833B6)" width="100%" type="submit" onClick={calenderHandler}>
                        Next, Book Slots
                      </Button>
                    </Stack>
                  ) : (
                    <Stack p="2" >
                      {isFinnieConnected && (
                        <Stack>
                          {advert !== null && (
                            <Stack>
                              <Text fontSize="xs" fontWeight="600">This is the advert media of your campaign</Text>
                              <Box p="2" align="center" rounded="lg">
                                <video 
                                  height="50px"
                                  width="50%"
                                  autoPlay 
                                  
                                  src={advert}
                                  poster={advert}
                                />
                              </Box> 
                              <Flex align="center" justify="space-between">
                                <Text fontWeight="600" fontSize="sm">{selectAdvertPopup ? "Confirm Advert" : "Change Advert"}</Text>
                                <EditIcon onClick={uploadAdvertMedia} color="gray" />
                              </Flex>
                              {/* <Button p="2" width="100%" >{selectAdvertPopup ? "Confirm Advert" : "Change Advert"}</Button> */}
                            </Stack> 
                          )}
                          {!selectAdvertPopup && (advert === null) && !selectMediaPopup && (
                            <Center flexDir="column" w="100%" bg="" border="1px dashed" p="2" borderColor="gray.200" rounded="md" cursor="pointer" >
                              <Text fontWeight="600" fontSize="md">Select your campaign media...</Text>
                              <Box py="10" align="center" direction="column" maxW="500px" height="100px" mx="auto">
                                <BsUpload onClick={uploadAdvertMedia} fontSize="30px" color="gray"/>
                                <Text onClick={uploadAdvertMedia} fontSize="sm">Click here to choose</Text>
                              </Box>
                            </Center>
                          )}
                          {selectAdvertPopup && !selectThumbnailPopup && (
                            <FormControl id="advert"> 
                              <FormLabel htmlFor="advert" fontSize="sm">This is the advert for your physical screen...</FormLabel>
                                <Select
                                  id="advert"
                                  placeholder={advert}
                                  value={advert}
                                  onChange={chooseAdvert}
                                >
                                  {artist?.nfts.map((nft: Record<string, any>) => (
                                  <option key={nft?.id} value={`https://arweave.net/${nft?.id}`}>
                                    {nft?.id}
                                  </option>
                                ))}
                                </Select>
                            </FormControl>
                          )}
                          <hr />
                          {(thumbnail !== null) && !selectAdvertPopup&& (
                            <Stack>
                              <Text fontSize="xs" fontWeight="600">This is the Thumbnail media of your campaign</Text>
                              <Box p="2" align="center" rounded="lg">
                                <video 
                                  height="50px"
                                  width="50%"
                                  autoPlay 
                                  src={thumbnail}
                                  poster={thumbnail}
                                />
                              </Box> 
                              <Flex align="center" justify="space-between">
                                <Text fontWeight="600" fontSize="sm">{selectThumbnailPopup ? "Confirm Thumbnail" : "Change Thumbnail"}</Text>
                                <EditIcon onClick={uploadThumbnailMedia} color="gray" />
                              </Flex>
                              {/* <Button p="2" width="100%" onClick={() => setSelectThumbnailPopup(!selectThumbnailPopup)}>{selectThumbnailPopup ? "Confirm Thumbnail" : "Change Thumbnail"}</Button> */}
                            </Stack> 
                          )}
                          {!selectThumbnailPopup && (thumbnail === null) && (advert !== null) && !selectMediaPopup &&(
                            <Center flexDir="column" w="100%" bg="" border="1px dashed" p="2" borderColor="gray.200" rounded="md" cursor="pointer" >
                              <Box py="10" align="center" direction="column" maxW="500px" height="100px" mx="auto">
                                <BsUpload onClick={uploadThumbnailMedia} fontSize="30px" color="gray"/>
                                <Text onClick={uploadThumbnailMedia} fontSize="sm">Click here to choose </Text>
                              </Box>
                            </Center>
                          )}
                          {selectThumbnailPopup && !selectAdvertPopup && (
                            <FormControl id="thumbnail"> 
                              <FormLabel htmlFor="thumbnail" fontSize="70%">This will be shown as a thumbnail for your audiences...</FormLabel>
                                <Select
                                  id="thumbnail"
                                  placeholder={thumbnail}
                                  value={thumbnail}
                                  onChange={chooseThumbnail}
                                >
                                  {artist?.nfts.map((nft: Record<string, any>) => (
                                  <option key={nft?.id} value={`https://arweave.net/${nft?.id}`}>
                                    {nft?.id}
                                  </option>
                                ))}
                                </Select>
                            </FormControl>
                          )}
            
                          {selectMediaPopup && (selectAdvertPopup || selectThumbnailPopup) && (
                            <SimpleGrid gap="4" columns={[1, 2]}>
                              {artist?.nfts.map((nft: Record<string, any>) => (
                                <Stack rounded="md" border="1px" borderColor="gray.200" key={nft?.id}>
                                  <Flex align="center" justify="space-between" rounded="md" p="1" >
                                    <Box p="1">
                                      <Text fontSize="md" fontWeight="600"> NFT ID</Text>
                                      <Text fontSize="xs">{nft?.id}</Text>
                                    </Box>
                                    <Box rounded="md" width="50px">
                                      <NftMediaContainer nft={nft} />
                                    </Box>
                                  </Flex>
                                </Stack>
                              ))}
                            </SimpleGrid>
                          )}
                          <Button bgColor="violet.500" onClick={videoUpdateHandler}>Update Campaign Media</Button>
                          
                        </Stack>
                      )}
                    </Stack>
                  )}
                </Stack>
              ) : (
                <Stack>
                  <Flex justify="space-between">
                    <ButtonGroup rounded="2xl" size='sm' isAttached spacing="0" borderColor="violet.500" variant='outline'>
                      <Button 
                        rounded="2xl" 
                        fontSize="xs"
                        color={(!dayModalVisible && timeModalVisible) ? "violet.500" : "white"} 
                        borderColor="violet.500" 
                        variant={(!dayModalVisible && timeModalVisible) ? "outline" : "solid"} 
                        bgGradient={(!dayModalVisible && timeModalVisible) ? "null" : "linear-gradient(to left, #BC78EC, #7833B6)"} 
                        onClick={openDayModal}>
                        Day Slot
                      </Button>
                      <Button 
                        rounded="2xl" 
                        fontSize="xs"
                        variant={(dayModalVisible && !timeModalVisible) ? "outline" : "solid"} 
                        borderColor="violet.500" 
                        color={(dayModalVisible && !timeModalVisible) ? "violet.500" : "white"}
                        bgGradient={(dayModalVisible && !timeModalVisible) ? "null" : "linear-gradient(to left, #BC78EC, #7833B6)"} 
                        onClick={openTimeModal}>
                        Time SLot
                      </Button>
                    </ButtonGroup>
                    {/* <Text px="4" fontSize="xs" fontWeight="600">{video?.title}</Text> */}
                  </Flex>
                  {dayModalVisible && (
                    <Stack shadow="card" rounded="md" p="10px">
                      {loadingScreenCalender ? (
                        <LoadingBox></LoadingBox>
                      ) : errorScreenCalender ? (
                        <MessageBox variant="danger">{errorScreenCalender}</MessageBox>
                      ) : (
                        <Box ref={React.createRef()}>
                          <SimpleGrid px="2" gap="2" columns={[1, 2]} align="center" justify="space-between">
                            <FormControl py="4" width="100%" align="center" id="startDateHere">
                              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DateTimePicker 
                                  inputVariant="outlined"
                                  disablePast={true}
                                  format="dd/MM/yyyy hh:mm"
                                  // variant="dialog"
                                  label="Select Slot Start Date"
                                  value={startDateHere}
                                  onChange={setStartDateHere}
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <MiuiIconButton>
                                          <CalendarIcon />
                                        </MiuiIconButton>
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                              </MuiPickersUtilsProvider>
                            </FormControl>
                      
                            <FormControl py="4" width="100%" align="center" id="endDateHere">
                              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DateTimePicker 
                                  inputVariant="outlined"
                                  disablePast={true}
                                  format="dd/MM/yyyy hh:mm"
                                  variant="dialog"
                                  label="Select Slot End Date"
                                  value={endDateHere}
                                  onChange={setEndDateHere}
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <MiuiIconButton>
                                          <CalendarIcon />
                                        </MiuiIconButton>
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                              </MuiPickersUtilsProvider>
                            </FormControl>
                          </SimpleGrid>
                          <Flex px="8" pt="8" pb="2" justify="space-around">
                            <Slider
                              id='slotsPerDay'
                              min={1}
                              max={4200} 
                              colorScheme='purple'
                              aria-label='slotsPerDay' 
                              onChange={(val) => setSlotsPerDay(val)}
                            >
                              <SliderMark
                                value={slotsPerDay}
                                textAlign='center'
                                bg='purple.400'
                                color='white'
                                rounded="md"
                                mt='-10'
                                mx="-7"
                                p="2"
                              >
                                {slotsPerDay}
                              </SliderMark>
                              <SliderTrack>
                                <SliderFilledTrack />
                              </SliderTrack>
                              <SliderThumb />
                            </Slider>
                          </Flex>
                          <FormControl px='4' align="center" id="slotsPerDay">
                            <Input 
                              id="slotsPerDay"
                              align="center" justify="center"
                              onChange={(e) => setSlotsPerDay(e.target.value)} 
                              placeholder={slotsPerDay} 
                              value={slotsPerDay}
                              type="number"  
                              width="50%"
                              size='lg'
                            />
                            <Flex p="2" align="center" justify="center">
                              <Text px="1" fontSize="xs">See details for these {slotsPerDay} slots</Text>
                              <IconButton onClick={daySlotHandler} bg="none" icon={<InfoIcon size="20px" color="violet.500" />} aria-label="show Details"></IconButton>
                            </Flex>
                          </FormControl>
                        </Box>
                      )}
                      {daySlotsModalOpen && (
                        <Stack >
                          <hr />
                          {loadingDaySlotBook ? (
                            <LoadingBox></LoadingBox>
                          ) : errorDaySlotBook ? (
                            <MessageBox variant="danger">{errorDaySlotBook}</MessageBox>
                          ) : (
                            <Box p="4" >
                              <SimpleGrid columns={[2]} gap="2">
                                <Box rounded="md" shadow="card" p="2" align="center">
                                  <Text fontSize="sm">Start Date </Text >
                                  <Text fontSize="sm" fontWeight="600">{new Date(calenderDaySlotData.daySlot.date).toDateString()}, {new Date(calenderDaySlotData.daySlot.date).toLocaleTimeString()}</Text >
                                </Box>
                                <Box rounded="md" shadow="card" p="2" align="center">
                                  <Text fontSize="sm">End Date </Text>
                                  <Text fontSize="sm" fontWeight="600">{new Date(calenderDaySlotData.daySlot.date).toDateString()}, {new Date(calenderDaySlotData.daySlot.date).toLocaleTimeString()}</Text >
                                </Box>
                              </SimpleGrid>
                              <Text p="4" fontSize="sm">SlotsAvailable : <strong>{calenderDaySlotData.slotsAvailable}</strong></Text >

                              {!calenderDaySlotData.daySlot.slotsBooked.isSlotBooked ? (
                                <Stack>
                                  {loadingDayBooking ? (
                                    <LoadingBox></LoadingBox>
                                  ) : errorDayBooking ? (
                                    <MessageBox variant="danger">{errorDayBooking}</MessageBox>
                                  ) : (
                                    <SimpleGrid gap="4" columns={[2]}>
                                      <Button variant="outline" color="green.500" width="100%" fontSize="sm" onClick={() => dayBookingHandler(calenderDaySlotData.daySlot._id)}>
                                        <CheckIcon />
                                      </Button>
                                      <Button variant="outline" color="red.500" width="100%" fontSize="sm" onClick={() => setDaySlotsModalOpen(!daySlotsModalOpen)}>
                                        <CloseIcon />
                                      </Button>
                                    </SimpleGrid>
                                  )}
                                </Stack>
                              ) : (
                                <Text fontSize="" >Already booked for the day</Text>
                              )}
                            </Box>
                          )}
                        </Stack>
                      )}
                    </Stack>
                  )}
                  {timeModalVisible && (
                    <Stack shadow="card" rounded="md" p="10px">
                      <Box ref={React.createRef()}>
                        <FormControl p="4" width="100%" align="center" id="dateHere">
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                              <DateTimePicker 
                                inputVariant="outlined"
                                disablePast={true}
                                format="dd/MM/yyyy hh:mm"
                                variant="dialog"
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <MiuiIconButton>
                                        <TimeIcon />
                                      </MiuiIconButton>
                                    </InputAdornment>
                                  ),
                                }}
                                label="Select slot date"
                                value={dateHere}
                                onChange={setDateHere}
                              />
                            </MuiPickersUtilsProvider>
                            <Flex pt="2" align="center" justify="center">
                              <Text px="1" fontSize="xs">See details for this time slot</Text>
                              <IconButton onClick={dateTimeHandler} bg="none" icon={<InfoIcon size="20px" color="violet.500" />} aria-label="show Details"></IconButton>
                            </Flex>
                        </FormControl>
                      </Box>
                      {slotsModalOpen && (
                        <Stack>
                          <hr />
                          {loadingCalenderDataAdd ? (
                            <LoadingBox></LoadingBox>
                          ) : errorCalenderDataAdd ? (
                            <MessageBox variant="danger">{errorCalenderDataAdd}</MessageBox>
                          ) : (
                            <Stack>
                              <SimpleGrid p="2" columns={[2]} gap="2">
                                <Box rounded="md" shadow="card" p="2" align="center">
                                  <Text fontSize="sm">Preceeding Slot</Text>
                                  {calenderSlotData?.viewSlots?.preceedingSlotAsked ? (
                                    <Text fontWeight="600" fontSize="sm">
                                      {new Date(calenderSlotData.viewSlots.preceedingSlotAsked.slotTimeStart).toLocaleString()} to {' '}
                                      {new Date(new Date(calenderSlotData.viewSlots.preceedingSlotAsked.slotTimeStart).getTime() + calenderSlotData.viewSlots.preceedingSlotAsked.dataAttached.duration*1000).toLocaleString()}
                                    </Text>
                                  ) : (
                                    <Text fontWeight="600" fontSize="sm">Slots empty</Text>
                                  )}
                                </Box>
                                <Box rounded="md" shadow="card" p="2" align="center">
                                  <Text fontSize="sm">Succeeding Slot</Text>
                                  {calenderSlotData?.viewSlots?.succeedingSlotAsked ? (
                                    <Text fontWeight="600" fontSize="sm">
                                      {new Date(calenderSlotData.viewSlots.succeedingSlotAsked.slotTimeStart).toLocaleString()} to {' '}
                                      {new Date(new Date(calenderSlotData.viewSlots.succeedingSlotAsked.slotTimeStart).getTime() + calenderSlotData.viewSlots.succeedingSlotAsked.dataAttached.duration*1000).toLocaleString()}
                                    </Text>
                                  ) : (
                                    <Text fontWeight="600" fontSize="sm">Slots empty</Text>
                                  )} 
                                </Box>
                              </SimpleGrid>
                              <Box align="center" >
                                <Text fontSize="xs">Asked Slot</Text>
                                {!calenderSlotData?.slotBooked && (
                                  <Flex P="2" align="center" justify="space-around">
                                  <Text fontSize="sm" fontWeight="600">
                                    {new Date(calenderSlotData.slotBooked.slotTimeStart).toDateString()}
                                    {/* {new Date(new Date(calenderSlotData.slotBooked.slotTimeStart).getTime() + calenderSlotData.slotBooked.dataAttached.duration*1000).toLocaleString()}{' '} */}
                                  </Text>
                                  <Text fontSize="sm" fontWeight="600">
                                    {new Date(calenderSlotData.slotBooked.slotTimeStart).toLocaleTimeString()}
                                    {/* {new Date(new Date(calenderSlotData.slotBooked.slotTimeStart).getTime() + calenderSlotData.slotBooked.dataAttached.duration*1000).toLocaleString()}{' '} */}
                                  </Text>
                                </Flex>
                                )}
                                {calenderSlotData?.slotBooked && (
                                  <Stack>
                                    <Flex p="2" align="center" justify="space-around">
                                      <Text fontSize="sm" fontWeight="600">
                                        {new Date(calenderSlotData.slotBooked.slotTimeStart).toDateString()}
                                        {/* {new Date(new Date(calenderSlotData.slotBooked.slotTimeStart).getTime() + calenderSlotData.slotBooked.dataAttached.duration*1000).toLocaleString()}{' '} */}
                                      </Text>
                                      <Text fontSize="sm" fontWeight="600">
                                        {new Date(calenderSlotData.slotBooked.slotTimeStart).toLocaleTimeString()}
                                        {/* {new Date(new Date(calenderSlotData.slotBooked.slotTimeStart).getTime() + calenderSlotData.slotBooked.dataAttached.duration*1000).toLocaleString()}{' '} */}
                                      </Text>
                                    </Flex>
                                    {calenderSlotData.slotBooked.isSlotBooked === false && (
                                      <Stack>
                                        {loadingSlotBooking ? (
                                          <LoadingBox></LoadingBox>
                                        ) : errorSlotBooking ? (
                                          <MessageBox variant="danger">{errorSlotBooking}</MessageBox>
                                        ) : (
                                          <SimpleGrid p="2" gap="4" columns={[2]}>
                                            <Button variant="outline" color="green.500" width="100%" fontSize="sm" onClick={() => slotBookingHandler(calenderSlotData.slotBooked._id)}>
                                              <CheckIcon />
                                            </Button>
                                            <Button variant="outline" color="red.500" width="100%" fontSize="sm" onClick={() => setSlotsModalOpen(!slotsModalOpen)}>
                                              <CloseIcon />
                                            </Button>
                                          </SimpleGrid>
                                        )}
                                      </Stack>
                                    )}
                                  </Stack>
                                )}
                              </Box>
                            </Stack>
                          )}
                        </Stack>
                      )}
                    </Stack>
                  )}
                  <Button bgGradient="linear-gradient(to left, #BC78EC, #7833B6)" width="100%" type="submit" onClick={videoUpdateHandler}>
                    Proceed to Payment 
                  </Button>
              </Stack >
              )}
            </Stack>
          )}
        </Box>
        )}
      </Box>
    </Box>
  )
}