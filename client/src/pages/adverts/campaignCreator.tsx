import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import { Box, Image, Heading, Text, Stack, Center, Flex, Button, SimpleGrid } from "@chakra-ui/react";
import { LoadingBox, MessageBox } from "components/helpers";

import {InfoIcon, ArrowForwardIcon} from "@chakra-ui/icons"
import { AiOutlineFundProjectionScreen, AiOutlineSetting, AiOutlineHome } from "react-icons/ai";
import { RiGlobeLine, RiWallet3Line, RiSearch2Line, RiUserSmileLine, RiAdvertisementLine, RiLogoutBoxRLine } from "react-icons/ri";


export function CampaignCreator(props: any) {

  return (
    <Box px="2" pt="20">
      {/* Container */}
      <Box maxW="container.lg" mx="auto" pb="8">

      </Box>
    </Box>
  );
}
