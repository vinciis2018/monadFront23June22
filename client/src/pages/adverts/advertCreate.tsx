import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import { Box, Image, Heading, Text, Stack, FormControl, FormLabel, Select, Center, Flex, Button, SimpleGrid } from "@chakra-ui/react";
import {ArrowBackIcon, EditIcon } from "@chakra-ui/icons"
import {BsUpload} from 'react-icons/bs';

import { signout } from '../../Actions/userActions';
import { detailsScreen } from '../../Actions/screenActions';
import {uploadVideo} from '../../Actions/videoActions';

import { LoadingBox, MessageBox } from "components/helpers";

import { useNftData, useNft } from 'api/hooks/useNft';
import { NftMediaContainer } from 'components/common/NftMediaContainer/index';
import { useArtist } from "api/hooks";
import { useFinnie } from 'components/finnie';

export function AdvertCreate (props: any) {
  const screenId = props.match.params.screenId;
  const {
    state: { connectFinnie, walletAddress, isLoading: finnieLoading, walletBalance, isFinnieConnected }
  } = useFinnie();

  const { data: artist, 
    isLoading: isLoadingArtist, 
    isError: isErrorArtist 
  } = useArtist({ id: walletAddress });

  const txId = props.match.params.txId;
  const {data: nft, 
    isLoading: isLoadingNft, 
    isError: isErrorNft
  } = useNft({id: txId});

  // const {data: nftData } = useNftData({id: txId});
  console.log("nft", {nft})

  const [advert, setAdvert] = React.useState<any>(null);
  const [thumbnail, setThumbnail] = React.useState<any>(null);

  const [selectThumbnailPopup, setSelectThumbnailPopup] = React.useState<any>(false);
  const [selectAdvertPopup, setSelectAdvertPopup] = React.useState<any>(false);
  const [selectMediaPopup, setSelectMediaPopup] = React.useState<any>(false)

  const screenDetails = useSelector((state: any) => state.screenDetails);
  const {
    loading: loadingScreen,
    error: errorScreen,
    screen
  } = screenDetails;

  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo } = userSignin;

  const videoUpload = useSelector((state: any) => state.videoUpload);
  const {
    loading: loadingVideoSave,
    success: successVideoSave,
    error: errorVideoSave,
    uploadedVideo: uploadedVideo
  } = videoUpload;

  const redirect = props?.location?.search
    ? props?.location?.search.split('=')[1]
    : '/signin';

  const dispatch = useDispatch();
  React.useEffect(() => {

    if(!isFinnieConnected) {
      connectFinnie()
    }

    if(successVideoSave) {
      window.alert('Hey, you just uploaded you campaign media, please proceed to fill the campaig details...');
      props.history.push(`/editCampaign/${uploadedVideo._id}/${screenId}/${uploadedVideo?.video.split('/').slice(-1)[0]}`)
    }

    if(!userInfo) {
      props.history.push(redirect);
    }

  }, [
    dispatch,
    txId,
    successVideoSave,
    isFinnieConnected
  ])

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

  const videoUploadHandler = (e: any) => {
    e.preventDefault();
    dispatch(
      uploadVideo(screenId, {
        advert, 
        thumbnail
      })
    );
  };


  
  return (
    <Box px="2" pt="20">
      <Box maxW="container.lg" mx="auto" pb="8">
        <Stack align="center" p="2" direction="row" justify="space-between">
          <ArrowBackIcon  onClick={() => props.history.goBack()}/>
          <Text fontWeight="600">Create Campaign</Text>
          <EditIcon color="white" />
        </Stack>

        <Stack p="2" >
          {isFinnieConnected && (
            <Stack>
              {advert !== null && (
                <Stack>
                  <Text fontSize="sm" fontWeight="600">This is the advert media of your campaign</Text>
                  <Box p="2" align="center" >
                    <video 
                      height="50px"
                      width="50%"
                      autoPlay 
                      src={advert}
                      poster={advert}
                    />
                  </Box> 
                  <Flex align="center" justify="space-between">
                    <Text fontWeight="600">{selectAdvertPopup ? "Confirm Advert" : "Change Advert"}</Text>
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
                  <Text fontSize="sm" fontWeight="600">This is the Thumbnail media of your campaign</Text>
                  <Box p="2" align="center" >
                    <video 
                      height="50px"
                      width="50%"
                      autoPlay 
                      src={thumbnail}
                      poster={thumbnail}
                    />
                  </Box> 
                  <Flex align="center" justify="space-between">
                    <Text fontWeight="600">{selectThumbnailPopup ? "Confirm Thumbnail" : "Change Thumbnail"}</Text>
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
                      {isLoadingNft ? (
                        <LoadingBox></LoadingBox>
                      ) : isErrorNft ? (
                        <MessageBox variant="danger">{isErrorNft}</MessageBox>
                      ) : (
                        <Flex align="center" justify="space-between" rounded="md" p="1" >
                          <Box p="1">
                            <Text fontSize="md" fontWeight="600"> NFT ID</Text>
                            <Text fontSize="xs">{nft?.id}</Text>
                          </Box>
                          <Box rounded="md" width="50px">
                            <NftMediaContainer nft={nft} />
                          </Box>
                        </Flex>
                      )}
                    </Stack>
                  ))}
                </SimpleGrid>
              )}
              <Button bgGradient="linear-gradient(to left, #BC78EC, #7833B6)" width="100%" type="submit" onClick={videoUploadHandler}>Upload Campaign</Button>
              
            </Stack>
          )}
        </Stack>
      </Box>
    </Box>
  )
}