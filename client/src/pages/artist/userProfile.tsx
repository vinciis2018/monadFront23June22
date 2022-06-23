import React, { useMemo, memo} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import { Box, Image, Slider, SliderTrack, SliderMark, SliderFilledTrack, SliderThumb, FormControl, Select, FormLabel, Input, Center, Link, Flex, Stack, SimpleGrid, VStack, Text, Button, IconButton, HStack } from "@chakra-ui/react";
import {ArrowBackIcon, EditIcon, InfoIcon, CalendarIcon, TimeIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons"
import {BiLike, BiDislike, BiChevronRight, BiFlag} from 'react-icons/bi';
import {BsUpload, BsMegaphone, BsTags} from "react-icons/bs";
import {AiOutlineFundProjectionScreen} from "react-icons/ai";

import { detailsUser, updateUserProfile } from '../../Actions/userActions';
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


export function UserProfile(props: any) {

  const { data: artist, isLoading, isError } = useArtist({ id: props?.match?.params?.id });
  // console.log(artist)
  const artistData = useMemo(() => {
    return {
      name: artist?.nfts?.[0]?.name,
      description: artist?.nfts?.[0]?.description,
      pieces: artist?.nfts?.length
    };
  }, [artist]);

  const [name, setName] = React.useState<any>('');
  const [avatar, setAvatar] = React.useState<any>('');
  const [phone, setPhone] = React.useState<any>('');
  const [email, setEmail] = React.useState<any>('');


  const [address, setAddress] = React.useState<any>('');
  const [districtCity, setDistrictCity] = React.useState<any>('');
  const [stateUt, setStateUt] = React.useState<any>('');
  const [country, setCountry] = React.useState<any>('');
  const [pincode, setPincode] = React.useState<any>('');


  const [profileModal, setProfileModal] = React.useState<boolean>(false);
  const [addressModal, setAddressModal] = React.useState<boolean>(false);
  const [uploadNftModal, setUploadNftModal] = React.useState<boolean>(false);


  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo } = userSignin;

  const userDetails = useSelector((state: any) => state.userDetails);
  const { 
    loading: loadingDetails, 
    error: errorDetails, 
    user 
  } = userDetails;

  const userUpdate = useSelector((state: any) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpadate,
    success: successUpdate,
  } = userUpdate;

  const redirect = props?.location?.search
  ? props?.location?.search.split('=')[1]
  : '/signin';

  const dispatch = useDispatch()
  React.useEffect(() => {
    if (successUpdate) {
    window.alert('Profile updated successfully');
      dispatch({
        type: USER_UPDATE_RESET
      });
    }

    if (!user) {
      dispatch({
        type: USER_UPDATE_PROFILE_RESET
      });
      dispatch(detailsUser({userId: userInfo?._id, walletAddress: props?.match?.params?.id}));

    } else {
      setName(user?.user?.name);
      setEmail(user?.user?.email);
      setPhone(user?.user?.phone);
      setAvatar(user?.user?.avatar);
      setAddress(user?.user?.address);
      setDistrictCity(user?.user?.districtCity);
      setStateUt(user?.user?.stateUt);
      setCountry(user?.user?.country);
      setPincode(user?.user?.pincode);
    }

    if(!userInfo) {
      props.history.push(redirect);
    }

  }, [
    dispatch,
    userInfo, 
    user,
    successUpdate 
  ]);

  const submitHandler = (e: any) => {
    e.preventDefault();
    dispatch(updateUserProfile({
      userId: userInfo._id,
      name,
      avatar,
      phone,
      email,
      address,
      districtCity,
      stateUt,
      country,
      pincode

    }));
    setProfileModal(false);
    setAddressModal(false);
    setUploadNftModal(false);
  };

  const uploadNftOpen = () => {
    setProfileModal(false);
    setAddressModal(false);
    setUploadNftModal(!uploadNftModal);

  }

  const userProfileEditOpen = () => {
    setAddressModal(false);
    setUploadNftModal(false);
    setProfileModal(!profileModal);
  }

  const userAddressEditOpen = () => {
    setProfileModal(false);
    setUploadNftModal(false);
    setAddressModal(!addressModal);
  }

  return (
    <Box px="2" pt="20">
      {/* Container */}
      <Box maxW="container.lg" mx="auto" pb="8">
          <Stack p="2" direction="row" justify="space-between">
            <ArrowBackIcon onClick={() => props.history.goBack()} />
            <Text fontWeight="600">User Profiile</Text>
            <EditIcon color="white" />
          </Stack>
          {loadingDetails ? (
            <LoadingBox></LoadingBox>
          ) : errorDetails ? (
            <MessageBox message={errorDetails}></MessageBox>
          ) : (
            <Stack p="2">
              {profileModal ? (
                <Box m="" p="2" rounded="lg" shadow="card">
                  <Text align="center" fontWeight="600" p="2" fontSize="md">Edit Profile</Text>
                  <Flex align="" justify="space-between">
                    <Box p="2" align="center" width="">
                      {isLoading ? (
                        <LoadingBox></LoadingBox>
                      ) : isError ? (
                        <MessageBox variant="danger" message={isError}></MessageBox>
                      ) : (
                        <Image 
                          p="2"
                          border="1px"
                          borderColor="gray.100"
                          rounded="full"
                          height="100px"
                          src={avatar}
                        />
                      )}
                    </Box>
                    <Box width="75%">
                      <FormControl p="2" id="name">
                        <Stack direction="row" align="center">
                          <Input 
                            id="name"
                            onChange={(e) => setName(e.target.value)} 
                            placeholder={name} 
                            value={name}
                            type="text"  
                          />
                        </Stack>
                        <FormLabel px="1" fontSize="xs">Change your name here...</FormLabel>
                      </FormControl>
                      <FormControl p="2" id="phone">
                        <Stack direction="row" align="center">
                          <Input 
                            id="phone"
                            onChange={(e) => setPhone(e.target.value)} 
                            placeholder={phone} 
                            value={phone}
                            type="phone"  
                          />
                        </Stack>
                        <FormLabel px="1" fontSize="xs">Change your contact number here...</FormLabel>
                      </FormControl>
                      <FormControl p="2" id="email">
                        <Stack direction="row" align="center">
                          <Input 
                            id="email"
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder={email} 
                            value={email}
                            type="email"  
                          />
                        </Stack>
                        <FormLabel px="1" fontSize="xs">Change your email here...</FormLabel>
                      </FormControl>
                
                        <FormControl p="2" id="avatar"> 
                          <Select
                            id="avatar"
                            placeholder={avatar}
                            value={avatar}
                            onChange={(e) => setAvatar(e.target.value)}
                          >
                            {artist?.nfts.map((nft: Record<string, any>) => (
                            <option key={nft?.id} value={`https://arweave.net/${nft?.id}`}>
                              {nft?.id}
                            </option>
                          ))}
                          </Select>
                          <FormLabel  px="1" htmlFor="avatar" fontSize="xs">This is your profile pic...</FormLabel>
                        </FormControl>
                    </Box>
                  </Flex>
                  <SimpleGrid p="2" gap="4" columns={[2]}>
                    <Button onClick={submitHandler} bgGradient="linear-gradient(to left, #BC78EC, #7833B6)">
                      Update
                    </Button>
                    <Button onClick={() => setProfileModal(false)} bgColor="white" color="violet.500" border="1px" borderColor="violet.500">
                      Go back
                    </Button>
                  </SimpleGrid>
                </Box>
              ) : (
                <Box m="" p="2" rounded="lg" shadow="card">
                  <Flex  px="2" align="center" justify="space-between" >
                    <Box align="left" width="25%">
                      <Image 
                        p="2"
                        border="1px"
                        borderColor="gray.100"
                        rounded="full"
                        height="100px"
                        src={user?.user?.avatar}
                        onLoad={() =>  triggerPort(user?.user?.avatar.split("/").slice(-1)[0])}
                      />
                    </Box>
                    <Flex width="75%" justify="space-between"> 
                      <Box>
                        <Text px="2" fontWeight="600" fontSize="lg">{user?.user?.name}</Text>
                        <Text px="2" fontWeight="" fontSize="xs">{user?.user?.phone}  </Text>
                        <Text px="2" fontWeight="" fontSize="xs">{user?.user?.email}</Text>
                        <CopyableAddress address={props?.match?.params?.id} w="100%" maxW="200px" />
                      </Box>
                      <IconButton onClick={userProfileEditOpen} bg="none" icon={<EditIcon size="20px" color="black" />} aria-label="Edit user details"></IconButton>
                    </Flex>
                  </Flex>
                  <Flex py="2" align="center" justify="space-between"> 
                  </Flex>
                </Box>
              )}
              <Flex p="2" align="center" justify="space-between">
                <Flex onClick={() => props.history.push(`/dashboard/user/${userInfo.defaultWallet}`)} bgColor={userInfo.isMaster ? "violet.600" : "gray.200"} rounded="lg" height="30px" p="2" align="center" justify="space-between">
                  <AiOutlineFundProjectionScreen />
                  <Text p="2" fontSize="xs" fontWeight={userInfo.isMaster ? "600" : ""}>Screen Owner</Text>
                </Flex>
                <Flex onClick={() => props.history.push(`/dashboard/user/${userInfo.defaultWallet}`)} bgColor={userInfo.isAlly ? "violet.600" : "gray.200"} rounded="lg" height="30px" p="2" align="center" justify="space-between">
                  <BsMegaphone />
                  <Text p="2" fontSize="xs" fontWeight={userInfo.isAlly ? "600" : ""}>Advertiser</Text>
                </Flex>
                <Flex onClick={() => props.history.push(`/dashboard/user/${userInfo.defaultWallet}`)} bgColor={userInfo.isBrand ? "violet.600" : "gray.200"} rounded="lg" height="30px" p="2" align="center" justify="space-between">
                  <BsTags />
                  <Text p="2" fontSize="xs" fontWeight={userInfo.isBrand ? "600" : ""}>Brands</Text>
                </Flex>
              </Flex>
              {addressModal ? (
                <Box m="" p="2" rounded="lg" shadow="card">
                  <Text align="center" fontWeight="600" p="2" fontSize="md">Edit Profile</Text>
                  <Box width="">
                    <FormControl p="2" id="address">
                      <Stack direction="row" align="center">
                        <Input 
                          id="address"
                          onChange={(e) => setAddress(e.target.value)} 
                          placeholder={address} 
                          value={address}
                          type="text"  
                        />
                      </Stack>
                      <FormLabel px="1" fontSize="xs">Your house/building/complex details</FormLabel>
                    </FormControl>
                    <FormControl p="2" id="districtCity">
                      <Stack direction="row" align="center">
                        <Input 
                          id="districtCity"
                          onChange={(e) => setDistrictCity(e.target.value)} 
                          placeholder={districtCity} 
                          value={districtCity}
                          type="text"  
                        />
                      </Stack>
                      <FormLabel px="1" fontSize="xs">Your city or nearest district</FormLabel>
                    </FormControl>
                    <FormControl p="2" id="stateUt">
                      <Stack direction="row" align="center">
                        <Input 
                          id="stateUt"
                          onChange={(e) => setStateUt(e.target.value)} 
                          placeholder={stateUt} 
                          value={stateUt}
                          type="text"  
                        />
                      </Stack>
                      <FormLabel px="1" fontSize="xs">Your current state</FormLabel>
                    </FormControl>
                    <FormControl p="2" id="country">
                      <Stack direction="row" align="center">
                        <Input 
                          id="country"
                          onChange={(e) => setCountry(e.target.value)} 
                          placeholder={country} 
                          value={country}
                          type="text"  
                        />
                      </Stack>
                      <FormLabel px="1" fontSize="xs">And your nation here</FormLabel>
                    </FormControl>
                    <FormControl p="2" id="pincode">
                      <Stack direction="row" align="center">
                        <Input 
                          id="pincode"
                          onChange={(e) => setPincode(e.target.value)} 
                          placeholder={pincode} 
                          value={pincode}
                          type="text"  
                        />
                      </Stack>
                      <FormLabel px="1" fontSize="xs">Your Postal Zip Code</FormLabel>
                    </FormControl>
                  </Box>
                  <SimpleGrid p="2" gap="4" columns={[2]}>
                    <Button onClick={submitHandler} bgGradient="linear-gradient(to left, #BC78EC, #7833B6)">
                      Update
                    </Button>
                    <Button onClick={() => setAddressModal(false)} bgColor="white" color="violet.500" border="1px" borderColor="violet.500">
                      Go back
                    </Button>
                  </SimpleGrid>
                </Box>
              ) : (
                <Box m="" p="2" shadow="card" rounded="md">
                  <Flex px="2" align="center" justify="space-between">
                    <Text fontSize="lg" fontWeight="600" >Address</Text>
                    <IconButton onClick={userAddressEditOpen} bg="none" icon={<EditIcon size="20px" color="black" />} aria-label="Edit user details"></IconButton>
                  </Flex>
                  <Text p="2" fontSize="sm">{user?.user?.address}, {user?.user?.districtCity}, {user?.user?.stateUt}, {user?.user?.country}, Pincode-{user?.user?.pincode} </Text>
                </Box>
              )}
              
              <Box p="">
                <Flex p="2" align="center" justify="space-between">
                  <Text fontSize="lg" fontWeight="600" >Wallet</Text>
                  <IconButton onClick={() => props.history.push(`/wallet/${user?.user?.defaultWallet}`)} bg="none" icon={<BiChevronRight size="20px" color="black" />} aria-label="Edit user details"></IconButton>
                </Flex>
                <Stack>
                  {user?.user?.wallets?.map((wallet: any) => {
                    return (
                    <Box onClick={() => props.history.push(`/wallet/${user.user?.defaultWallet}`)} p="2" key={wallet}shadow="card" rounded="ld">
                      <Text p="2" fontSize="xs">Wallet Address: {wallet}</Text>
                    </Box>
                    )
                  })} 
                </Stack>
              </Box>
              <Box m="">
                <Flex p="2" align="center" justify="space-between">
                  <Text fontSize="lg" fontWeight="600" >My NFTs</Text>
                  <IconButton onClick={uploadNftOpen} bg="none" icon={<BsUpload size="15px" color="black" />} aria-label="Edit user details"></IconButton>
                </Flex>
                {uploadNftModal ? (
                  <Box m="2" rounded="md" shadow="card">
                    <DragAndDropUploader />
                  </Box>
                ) : (
                  <>
                    {artist?.nfts?.length !== 0 && (
                      <SimpleGrid p="2"  w="100%" minW="0" minH="0" gap="2" columns={[2, 4]}>
                        {artist?.nfts?.map((nft: Record<string, any>) => (
                          <Box align="center" p="" key={nft?.id} rounded="md" shadow="card" onClick={() => props.history.push(`/nft/${nft?.id}`)} >
                            {isLoading ? (
                              <LoadingBox></LoadingBox>
                            ) : isError ? (
                              <MessageBox message={isError}></MessageBox>
                            ) : (
                              <ThumbnailCard nft={nft} />
                            )}
                          </Box>
                        ))}
                      </SimpleGrid>
                    )}
                  </>
                )}
              </Box>
            </Stack>
          )}
        </Box>
      
    </Box>
  )
}
