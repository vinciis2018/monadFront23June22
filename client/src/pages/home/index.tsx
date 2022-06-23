import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from "framer-motion";

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

import { Box, Image, Heading, Text, Stack, Center, Flex, Button, SimpleGrid } from "@chakra-ui/react";
import { LoadingBox, MessageBox } from "components/helpers";
import { listScreens } from '../../Actions/screenActions';
import { listAllVideos } from '../../Actions/videoActions';
import { triggerPort } from 'services/utils';
import {InfoIcon, ArrowForwardIcon} from "@chakra-ui/icons"
import { AiOutlineFundProjectionScreen, AiOutlineSetting, AiOutlineHome } from "react-icons/ai";
import { RiGlobeLine, RiWallet3Line, RiSearch2Line, RiUserSmileLine, RiAdvertisementLine, RiLogoutBoxRLine } from "react-icons/ri";
import { TopNftsContent } from 'components/widgets';
import { TimeFilter } from 'components/filters';

import { Advert, Screen } from "components/common";


export function Home(props: any) {

  const MotionFlex = motion(Flex);

  const [screensModal, setScreensModal] = React.useState(false);
  const [campaignsModal, setCampaignsModal] = React.useState(true);
  const [nftModal, setNftModal] = React.useState(false);

  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo } = userSignin;

  const screenList = useSelector((state: any) => state.screenList);
  const { loading: loadingScreens, error: errorScreens, screens: screens } = screenList;

  const videoListAll = useSelector((state: any) => state.videoListAll);
  const { 
    loading: loadingVideos, 
    error: errorVideos, 
    allVideos: allVideos
  } = videoListAll;

  
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(listScreens({}));
    dispatch(listAllVideos());

    // dispatch(listTopMasters());
    // dispatch(getAllPins());
  }, [
    dispatch
  ]);

  const modalHandler = () => {
    setNftModal(false);
    setScreensModal(false);
  }

  const screensModalHandler = () => {
    setScreensModal(true);
    setNftModal(false);
  }

  const nftsModalHandler = () => {
    setScreensModal(false);
    setNftModal(true);
  }


  return (
    <Box px="2" pt="20">
      {/* Container */}
      <Box maxW="container.lg" mx="auto" pb="8">
        {/* <DragAndDropUploader /> */}
        {/* Leaderboard */}
        <Stack  p="1" color="">
          {loadingScreens ? (
            <LoadingBox></LoadingBox>
          ) : errorScreens ? (
            <MessageBox variant="danger">{errorScreens}</MessageBox>
          ) : (
            <Center width="100%">
              {screens?.length === 0 && <MessageBox>No Screen Found</MessageBox>}
              <Carousel showArrows autoPlay showThumbs={false}>
                {screens?.map((screen: any) => (
                  <Box key={screen?._id} as={RouterLink} to={`/screen/${screen?._id}/${screen?.image.split("/").slice(-1)[0]}`} d="flex" flexDir="column" rounded="lg" bg="" shadow="card" flexBasis="100%">
                    <Image 
                      height="300px"
                      width="100%"
                      // shadow="card"
                      rounded="xl"
                      src={screen?.image}
                      onLoad={() =>  triggerPort(screen?.image.split("/").slice(-1)[0])}
                    />
                    <Text fontSize="" className="legend">{screen?.name}</Text>
                  </Box>
                ))}
              </Carousel>
            </Center>
          )}
           <SimpleGrid pt="5" gap="2" columns={[2]}>
              <Box onClick={() => props.history.push(`/screens`)} py="10" rounded="lg" shadow="card" bgColor="green.100" align="center">
                <AiOutlineFundProjectionScreen fontSize="50px" color="gray" />
                <Text p="2" fontSize="2xl" color="gray" fontWeight="600">Ad Screens</Text>
              </Box>
              <Box onClick={() => props.history.push(`/adverts`)} bgColor="teal.100" py="10" rounded="lg" shadow="card" align="center">
                <RiAdvertisementLine fontSize="50px" color="gray" />
                <Text p="2" fontSize="2xl" color="gray" fontWeight="600">Ad Campaigns</Text>
              </Box>
            </SimpleGrid>
            <Box p="" as={RouterLink} to={`/mapbox`} >
              <Flex px="10" py="10" rounded="lg" shadow="card" bgColor="violet.100" align="center" justify="center">
                <RiGlobeLine fontSize="50px" color="gray" />
                <Text p="2" fontSize="40px" color="gray" fontWeight="600">Ad Explorer</Text>
              </Flex>
            </Box>
            {userInfo && (
              <Text onClick={() => props.history.push(`/userProfile/${userInfo?.defaultWallet}`)} align="center" p="2" fontSize="md" fontWeight="600">Or you can simply upload an NFT here...
                <ArrowForwardIcon fontSize="20px" />
              </Text>
            )}
          <hr />
          <Stack >
            <Flex align="center" justify="space-between">
              <Box m="1" color={screensModal ? "gray.700" : ""} bgColor={screensModal ? "gray.200" : "gray.100"} onClick={screensModalHandler} width="100%">
                <Text fontSize="xs" p="2" align="center" fontWeight="600">Screens</Text>
              </Box>
              <Box m="1" color={(!screensModal && !nftModal) ? "gray.700" : ""} bgColor={(!screensModal && !nftModal) ? "gray.200" : "gray.100"} onClick={modalHandler} width="100%">
                <Text fontSize="xs" p="2" align="center" fontWeight="600">Campaigns</Text>
              </Box>
              <Box m="1" color={nftModal ? "gray.700" : ""} bgColor={nftModal ? "gray.200" : "gray.100"} onClick={nftsModalHandler} width="100%">
                <Text fontSize="xs" p="2" align="center" fontWeight="600">Wall</Text>
              </Box>
            </Flex>
            {screensModal ? (
              <>
                {loadingScreens ? (
                  <LoadingBox></LoadingBox>
                ) : errorScreens ? (
                  <MessageBox variant="danger">{errorScreens}</MessageBox>
                ) : (
                  <SimpleGrid gap="4" columns={[1, 2]} px="1">
                    {screens?.map((screen: any) => (
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
              </>
            ) : nftModal ? (
              <Stack>
                <TimeFilter />
                <hr />
                <TopNftsContent />
              </Stack>
            ) : (
              <Stack>
                {loadingVideos ? (
                  <LoadingBox></LoadingBox>
                ) : errorVideos ? (
                  <MessageBox variant="danger">{errorVideos}</MessageBox>
                ) : (
                  <SimpleGrid gap="4" columns={[1, 2]} px="1">
                    {allVideos?.map((video: any) => (
                      <MotionFlex
                        key={video._id}
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
          </Stack>
          
        </Stack>
      </Box>
    </Box>
  );
}
