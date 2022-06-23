import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

// context
import { useFinnie } from "components/finnie";
import { signout } from '../../../Actions/userActions';

import {useWindowSize} from "components/utils";
// ui
import { Button, Badge, Center, Box, Flex, useDisclosure , Drawer, DrawerHeader, DrawerOverlay, DrawerBody, DrawerContent, Heading, Stack, Menu, MenuButton, MenuList, MenuItem, Text, IconButton, Tooltip, Image } from "@chakra-ui/react";
// icons
import { IoRemoveCircle } from "react-icons/io5";
import { ArweaveIcon, KoiiIcon, RatIcon } from "components/icons";
import { RiGlobeLine, RiWallet3Line, RiSearch2Line, RiUserSmileLine, RiAdvertisementLine, RiLogoutBoxRLine } from "react-icons/ri";
import { AiOutlineFundProjectionScreen, AiOutlineSetting, AiOutlineCamera } from "react-icons/ai";
import { CgNotifications } from 'react-icons/cg';
// assets
import Logo from "assets/logo.png";
import Name from "assets/name.png";

import { LoadingBox, MessageBox } from "components/helpers";
import { useLogin, useWallet } from "components/contexts";
import { LoginHelper } from "components/helpers";
import { editWallet } from "../../../Actions/walletActions";

export function Nav(props: any) {
  const { width } = useWindowSize();
  const navigate = useHistory();

  const style = {
    bgColor: "gray.100",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    position: "fixed",
    left: "0",
    top: "0",
    width: "100%",
    zIndex: "10"
  };
  const [modalOpen, setModalOpen] = React.useState<Boolean>(false);
  /* Finnie */
  const {
    state: { connectFinnie, disconnectFinnie, walletAddress, walletBalance },
  } = useFinnie();
  console.log(walletAddress)

  const {
    isUnlocked, lock: lockMyWallet, getArweavePublicAddress, isLoading, isConnected
  } = useWallet();

  const [myWallet, setMyWallet] = React.useState<String>(getArweavePublicAddress());

  const { logout, lock } = useLogin();

  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userSignin = useSelector((state: any) => state.userSignin);
  const { 
    loading: loadingUserInfo,
    error: errorUserInfo,
    userInfo 
  } = userSignin;

  React.useEffect(() => {
    const walletAdd = getArweavePublicAddress();
    console.log(walletAdd)
    const isUn = isUnlocked();

    if(userInfo?.defaultWallet === walletAdd) {
      setMyWallet(walletAdd);
      connectFinnie();
    } else {
      dispatch(editWallet({ walletAdd }))
    }

    if (isConnected) {
      setModalOpen(false)
      getArweavePublicAddress(),
      connectFinnie();
    }
  },[
    dispatch,
    userInfo,
    getArweavePublicAddress(),
    walletAddress
  ]);

  const signoutHandler = () => {
    disconnectFinnie();
    logout();
    lock();
    lockMyWallet();
    dispatch(signout());
  }

  const lockWallet = () => {
    lock();
    logout();
    lockMyWallet();
    navigate.push("/login")

  }

  const onClick = () => {
    if(!userInfo) {
      navigate.push("/signin")
    }
  }

  const loginHandler = () => {
    isUnlocked();
  }

  const isModalOpen = () => {
      setModalOpen(!modalOpen);
  }

  return (
    <Box __css={style} bg="white" px="4" color="white" shadow="card">
      {loadingUserInfo ? (
        <LoadingBox></LoadingBox>
      ) : errorUserInfo ? (
        <MessageBox>{errorUserInfo}</MessageBox>
      ) : (
        <Box>
          {width > 500 && (
            <Flex mx="auto" maxW="container.lg" justify="space-between" align="center" py="3">
              <Stack as={Link} to="/" direction="row" align="center">
                <Image width={{ base: 30, lg: "50px" }} src={Logo} />
                <Image width={{ base: 70, lg: "100px" }} src={Name} />
                {/* <Heading color="black" size="md">{config?.companyName}</Heading> */}
              </Stack>
              {!userInfo ? (
                <Button bgGradient="linear-gradient(to left, #BC78EC, #7833B6)" as={Link} to={`/signin`} size="sm" fontSize="xs">
                  Please Signin
                </Button>
              ) : (
                <Stack direction="row" align="center" spacing="1">
                  <IconButton as={Link} to={`/artist/${userInfo?.defaultWallet}`} icon={<RiSearch2Line size="20px" color="black" />} aria-label="search-what-you-are-looking-for" bg="none" rounded="md" h="33px" />
                  <Center onClick={onOpen} bg="gray.100" border="1px solid white" shadow="card" mx="auto" rounded="full" color="blue.100" boxSize="50px" flexBasis="50px" flexShrink="0">
                    <Image  width="100%" rounded="full" src={userInfo?.avatar} />
                  </Center>
                  <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
                    <DrawerOverlay />
                    <DrawerContent>
                      <DrawerHeader align="center" borderBottomWidth='1px'>
                        <Center onClick={onOpen} bg="gray.100" border="1px solid white" shadow="card" mx="auto" rounded="full" >
                          <Image  width="100%" rounded="full" src={userInfo?.avatar} />
                        </Center>
                        <Text fontSize="sm" >Hey {userInfo?.name}, here is your menu...</Text>
                      </DrawerHeader>
                      <DrawerBody p="1">
                        <Flex p="2" as={Link} to={`/mapbox`} align="center" shadow="card" rounded="lg">
                          <RiGlobeLine size="20px" />
                          <Text p="2" fontWeight="600">Explore</Text>
                        </Flex>
                        <Flex p="2" as={Link} to={`/screens`} align="center" shadow="card" rounded="lg">
                          <AiOutlineFundProjectionScreen size="20px" />
                          <Text p="2" fontWeight="600">Screens</Text>
                        </Flex>
                        <Flex p="2" as={Link} to={`/adverts`} align="center" shadow="card" rounded="lg">
                          <RiAdvertisementLine size="20px" />
                          <Text p="2" fontWeight="600">Adverts</Text>
                        </Flex>
                        <Flex p="2" as={Link} to={`/pleaBucket`} align="center" shadow="card" rounded="lg">
                          <CgNotifications size="20px" />
                          <Text p="2" fontWeight="600">Notifications</Text>
                        </Flex>
                        <Flex p="2" as={Link} to={`/userProfile/${userInfo?.defaultWallet}`} align="center" shadow="card" rounded="lg">
                          <RiUserSmileLine size="20px" />
                          <Text p="2" fontWeight="600">Profile</Text>
                        </Flex>
                        <Flex p="2" as={Link} to={`/wallet/${userInfo?.defaultWallet}`} align="center" shadow="card" rounded="lg">
                          <RiWallet3Line size="20px" />
                          <Text p="2" fontWeight="600">Wallet</Text>
                        </Flex>
                        <Flex p="2" as={Link} to={`/upload-camera`} align="center" shadow="card" rounded="lg">
                          <AiOutlineCamera size="20px" />
                          <Text p="2" fontWeight="600">Camera</Text>
                        </Flex>
                        <Flex p="2" as={Link} to={`/setting`} align="center" shadow="card" rounded="lg">
                          <AiOutlineSetting size="20px" />
                          <Text p="2" fontWeight="600">Settings</Text>
                        </Flex>
                        <Flex p="2" onClick={lockWallet} align="center" shadow="card" rounded="lg">
                          <IoRemoveCircle size="20px" />
                          <Text p="2" fontWeight="600">Disconnect</Text>
                        </Flex>
                        <Flex p="2" onClick={signoutHandler} align="center" shadow="card" rounded="lg">
                          <RiLogoutBoxRLine size="20px" />
                          <Text p="2" fontWeight="600">LogOut</Text>
                        </Flex>
                      </DrawerBody>
                    </DrawerContent>
                  </Drawer>
                  {isConnected ? (
                    <Badge onClick={isModalOpen} variant="outline" colorScheme="black" rounded="full">
                      <Menu>
                        <MenuButton>
                        <Tooltip bg="violet.500" color="white" hasArrow placement="bottom" label="Click for Menu">
                          <Text p="2" lineHeight="1"  fontWeight="600" >AD Credits: {myWallet ? (walletBalance?.ar) + ( walletBalance?.koii) + (walletBalance?.ratData) : "wallet locked"}</Text>
                        </Tooltip>
                        </MenuButton>
                        <MenuList  align="center" >
                          <RiWallet3Line size="20px" />
                          <MenuItem>
                            <Box align="center" p="2">
                              <Text fontSize="sm" fontWeight="600">AD Credits = RAT + AR + KOII</Text>
                              <Text fontSize="10px">You need AD Credits for interaction with our platform.</Text>
                              <Text fontSize="10px">For more details on AD Credits, please read out white paper, or contact us.</Text>
                            </Box>
                          </MenuItem>
                          <MenuItem color="black" align="center">
                            <Stack align="center" direction="row" spacing="4" cursor="pointer" px="2" py="1" rounded="full" fontSize="sm" fontWeight="600">
                              {/* Rat balance */}
                              <Stack direction="row" align="center">
                                <RatIcon color="black" boxSize="20px" />
                                <Text fontSize="xs" lineHeight="1">{walletBalance?.ratData?.toFixed?.(3)}</Text>
                              </Stack>
                              {/* Koii balance */}
                              <Stack direction="row" align="center">
                                <KoiiIcon color="black" boxSize="22px" />
                                <Text fontSize="xs" lineHeight="1">{walletBalance?.koii?.toFixed?.(2)}</Text>
                              </Stack>
                              {/* Arweave balance */}
                              <Stack direction="row" align="center">
                                <ArweaveIcon color="black" boxSize="20px" />
                                <Text fontSize="xs" lineHeight="1">{walletBalance?.ar?.toFixed?.(3)}</Text>
                              </Stack>
                            </Stack>
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </Badge>
                  ) : (
                    <>
                      <IconButton onClick={loginHandler} aria-label=""
                        bg={isLoading ? "red.200" : "red.500"}
                        icon={<RiWallet3Line color="black" size="20px"/>}
                      />
                    </>
                  )}
                  
                </Stack>
              )}
              
            </Flex>
          )}
          {width <= 500 && (
            <Flex mx="auto" maxW="container.lg" justify="space-between" align="center" py="3">
              {!userInfo ? (
                <>
                  <Button bgGradient="linear-gradient(to left, #BC78EC, #7833B6)" as={Link} to={`/signin`} size="sm" fontSize="xs">
                    Please Signin
                  </Button>
                </>
              ) : (
                <Flex align="center">
                  <Menu>  
                    <MenuButton>
                      <Tooltip bg="violet.500" color="white" hasArrow placement="bottom" label="Click for Menu">
                        <Center as={Link} to="/" bg="gray.100" border="1px solid white" shadow="card" mx="auto" rounded="full" color="blue.100" boxSize="50px" flexBasis="50px" flexShrink="0">
                          <Image width="100%" rounded="full" src={userInfo?.avatar} />
                        </Center>
                      </Tooltip>
                    </MenuButton>
                    <MenuList>
                      <MenuItem as={Link} to={`/mapbox`} color="black" icon={<RiGlobeLine size="20px" />}>
                        Explore                    
                      </MenuItem>
                      <MenuItem as={Link} to={`/screens`} color="black" icon={<AiOutlineFundProjectionScreen size="20px" />}>
                        Screens                    
                      </MenuItem>
                      <MenuItem as={Link} to={`/adverts`} color="black" icon={<RiAdvertisementLine size="20px" />}>
                        Adverts                    
                      </MenuItem>
                      <MenuItem as={Link} to={`/pleaBucket`} color="black" icon={<CgNotifications size="20px" />}>
                        Notifications                    
                      </MenuItem>
                      <MenuItem as={Link} to={`/userProfile/${userInfo?.defaultWallet}`} color="black" icon={<RiUserSmileLine size="20px" />}>
                        Profile                    
                      </MenuItem>
                      <MenuItem as={Link} to={`/wallet/${userInfo?.defaultWallet}`} color="black" icon={<RiWallet3Line size="20px" />}>
                        Wallet
                      </MenuItem>
                      <MenuItem as={Link} to={`/upload-camera`} color="black" icon={<AiOutlineCamera size="20px" />}>
                        Camera
                      </MenuItem>
                      <MenuItem as={Link} to={`/setting`} color="black" icon={<AiOutlineSetting size="20px" />}>
                        Settings
                      </MenuItem>
                      <MenuItem onClick={() => lock()} color="black" icon={<IoRemoveCircle size="20px" />}>
                        Disconnect
                      </MenuItem>
                      <MenuItem onClick={signoutHandler} color="black" icon={<RiLogoutBoxRLine size="20px" />}>
                        Logout
                      </MenuItem>
                    </MenuList>
                  </Menu>  
                  {isConnected ? (
                    <Badge onClick={isModalOpen} borderRadius='full' px='4' py="2" variant="outline" colorScheme='black'>
                      <Flex align="center" justify="space-between">
                        <Text lineHeight="1" p="1">{myWallet ? (walletBalance?.ar) + (walletBalance?.koii) + (walletBalance?.ratData) : "wallet locked"}</Text>
                        <RiWallet3Line size="15px" color="black"/>
                      </Flex>
                    </Badge>
                  ) : (
                    <IconButton onClick={onClick} aria-label="Connect"
                      bg={isLoading ? "red.200" : "red.500"}
                      icon={<RiWallet3Line color="black" size="20px"/>}
                    />
                  )}
                </Flex>
              )}
              <IconButton as={Link} to={`/artist/${userInfo?.defaultWallet}`} icon={<RiSearch2Line size="20px" color="black" />} aria-label="search-what-you-are-looking-for" bg="none" rounded="sm" h="33px" />
            </Flex>
          )}
          {modalOpen && (
            <LoginHelper />
          )}
        </Box>
      )}
    </Box>
  );
}
