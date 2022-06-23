import React from 'react'

import { Box, Heading, Slider, SliderTrack, SliderMark, SliderFilledTrack, SliderThumb, FormControl, Select, FormLabel, Input, Center, Link, Flex, Stack, SimpleGrid, VStack, Text, Button, IconButton, HStack } from "@chakra-ui/react";
import {ArrowBackIcon, EditIcon, InfoIcon, CalendarIcon, TimeIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons"

export function Payment() {
  return (
    <Box px="2">
      <Box maxW="container.lg" mx="auto" pb="8">
        <Stack p="2" direction="row" justify="space-between">
          <ArrowBackIcon />
          <Text fontWeight="600">Payment Options</Text>
          <EditIcon color="white" />
        </Stack>
        
      </Box>
    </Box>
  
  )
}
