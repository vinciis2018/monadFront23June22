
import React, {useState} from 'react'
// import * as IPFS_ from "ipfs-http-client";

import { Box, Link, Image, Center, Text, Stack, IconButton, Flex, Button, FormControl, Select, FormLabel, Input, SimpleGrid } from "@chakra-ui/react";

export function IPFS() {

  const [file, setFile] = useState(null);
  // let ipfs: IPFS_.IPFSHTTPClient | undefined;
  //   try {
  //     ipfs = IPFS_.create({
  //       url: "https://ipfs.infura.io:5001/api/v0"
  //     });
  //   } catch (error) {
  //     console.error("IPFS ERROR", error);
  //     ipfs = undefined;
  //   }


  return (
    <Box px="2" pt="20">
      <Center maxW="container.lg" mx="auto" pb="8">
        <Stack p="2" >
          {/* <Box>
            <Input />
            <Button>Upload</Button>
          </Box> */}
          {/* {!ipfs && (
            <Text>Oh oh,, Not connected to IPFS, checkout the logs for error</Text>
          )}
          {ipfs && (
            <>
            </>
          )} */}
        </Stack>
      </Center>
    </Box>
  )
}
