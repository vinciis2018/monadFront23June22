import React, {useEffect, useCallback, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { getWalletDetails, createWallet, editWallet, transferTokens } from '../../Actions/walletActions';
import { ReactNode, useMemo, memo } from "react";
import { useDropzone } from "react-dropzone";

import {Link as RouterLink, useHistory} from 'react-router-dom';
import { Box, Heading, Slider, SliderTrack, SliderMark, SliderFilledTrack, SliderThumb, FormControl, Select, FormLabel, Input, Center, Link, Flex, Stack, SimpleGrid, VStack, Text, Button, IconButton, HStack } from "@chakra-ui/react";

import { useArtist } from "api/hooks";
import { NftFeaturedCard } from "components/cards";

import {LoadingBox, MessageBox} from 'components/helpers';
import { detailsUser } from '../../Actions/userActions';

import { WALLET_EDIT_RESET, WALLET_CREATE_RESET } from '../../Constants/walletConstants';
import { USER_ATOMIC_NFT_UPLOAD_RESET, TOKENS_TRANSFER_RESET } from '../../Constants/walletConstants';
import { signout } from '../../Actions/userActions';

import { DragAndDropUploader } from 'components/widgets';
import { CopyableAddress, EmptyState, ErrorState } from "components/ui";

import {BiChevronDown, BiChevronUp, BiTransfer, BiWallet} from 'react-icons/bi';
import {ArrowBackIcon, ArrowDownIcon, ArrowUpIcon, EditIcon, InfoIcon, CalendarIcon, TimeIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons"
import {AiOutlineSetting} from 'react-icons/ai';
import { BsGear, BsCloudUpload, BsArrowUpRight, BsArrowDownLeft, BsArrowUpRightCircle } from 'react-icons/bs';
import { useFinnie } from 'components/finnie';
import { arweaveWalletConnect } from 'api/arweaveWallet';
import { ArweaveIcon, KoiiIcon, RatIcon } from 'components/icons';
import { getExhangeRate, getHistoricalData } from 'api/sdk';
import { useWallet } from 'components/contexts';

export function Wallet(props: any) {

  const walletAddAr = props.match.params.id;
  const navigate = useHistory();

  const [keyModal, setKeyModal] = useState<any>(false)
  const [toWallet, setToWallet] = useState<any>("");
  const [quantity, setQuantity] = useState<any>("");
  const [ticker, setTicker] = useState<any>("AR");

  const [tokenHistory, setTokenHistory] = useState<any>([]);

  const [walletId, setWalletId] = useState<any>("");
  const [walletName, setWalletName] = useState<any>('');
  const [defaultWallet, setDefaultWallet] = useState<any>('');
  // const [walletAddAr, setWalletAddAr] = useState<any>('');
  const [exchangeValue, setExchangeValue] = useState<any>("1");


  const [anftModalVisible, setAnftModalVisible] = useState<any>(false);
  const [transferModalVisible, setTransferModalVisible] = useState<any>(false);
  const [editWalletModalVisible, setEditWalletModalVisible] = useState<any>(false);
  const [openADUModal, setOpenADUModal] = useState<any>(false);

  const [txnDetailModal, setTxnDetailModal] = useState<any>(false);

  const onDropAccepted = useCallback(async acceptedFiles => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useState({ data: { file: acceptedFiles[0], fileThumbnail: URL.createObjectURL(acceptedFiles[0]) } });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDropAccepted, accept: "json/*", multiple: false, maxSize: 15728640 });
  
  const [jwk, setJwk] = useState<any>(null)
  const [lastTrxn, setLastTrxn] = useState<any>(null);
  const [allTrxn, setAllTrxn] = useState<any>([]);


  const userSignin = useSelector((state: any) => state.userSignin);
  const {loading: loadingUser, error: errorUser, userInfo} = userSignin;

  const walletDetails = useSelector((state: any) => state.walletDetails);
  const {
    loading: loadingWallet,
    error: errorWallet,
    wallet
  } = walletDetails;

  const walletEdit = useSelector((state: any) => state.walletEdit);
  const { 
    loading: loadingWalletEdit, 
    error: errorWalletEdit, 
    success: successWalletEdit 
  } = walletEdit;


  const tokensTransfer = useSelector((state: any) => state.tokensTransfer);
  const {
    loading: loadingTokensTransfer,
    error: errorTokensTransfer,
    success: successTokensTransfer,
  } = tokensTransfer;

  const { data: artist, isLoading, isError } = useArtist({ id: walletAddAr });

  const artistData = useMemo(() => {
    return {
      name: artist?.nfts?.[0]?.name,
      description: artist?.nfts?.[0]?.description,
      pieces: artist?.nfts?.length
    };
  }, [artist]);

  /* Finnie */
  const {
    state: { connectFinnie, walletAddress, isLoading: finnieLoading, walletBalance, isFinnieConnected, walletPrice, xchangeRate, lastTxn, tokenHis },
  } = useFinnie();
  console.log("walletPrice", lastTxn)

  const { getArweavePublicAddress,  } = useWallet();


  const redirect = props?.location?.search
    ? props?.location?.search.split('=')[1]
    : '/signin';

  const dispatch = useDispatch();
  useEffect(() => {
    const walletAdd = getArweavePublicAddress();
    console.log(walletAdd)
    if(!walletAdd) {
      navigate.push("/login")
    }

    if(userInfo) {
      setWalletId(walletAdd)
      dispatch(detailsUser({userId: userInfo._id, walletAddress: walletAddress}));
      dispatch(getWalletDetails(walletAdd));
    } else {
      navigate.push(redirect);
    }

    if(walletAddress === walletAddAr) {
      navigate.push(`/wallet/${walletAddress}`);
    }

    if(wallet === null || undefined) {
      setWalletId(userInfo?.defaultWallet);
    }


    if(successWalletEdit) {
      dispatch({
        type: WALLET_EDIT_RESET
      })

      window.alert('Wallet edited, please login again to activate the changes');
      dispatch(signout());
    }

    if(successTokensTransfer) {
      setToWallet("");
      setQuantity("");
      setTicker("");
      dispatch({
        type: TOKENS_TRANSFER_RESET
      })
      window.alert(`${quantity} ${ticker} transferred to ${toWallet} successfully!`);
      setTransferModalVisible(false);
    }


  } , [
    dispatch,
    userInfo,
    walletAddAr,
    walletId,
    lastTxn,
    successTokensTransfer,
    toWallet,
    quantity,
    ticker
  ]);

  const submitTransferHandler = () => {
    console.log({toWallet, quantity, ticker});
    dispatch(transferTokens({
      walletId,
      toWallet,
      quantity,
      ticker,
    }))
  }


  const transferModalHandler = () => {
    // arweaveWalletConnect().then(res => {
    //   console.log("res", res)
    //   setJwk(res);
    // });
    setEditWalletModalVisible(false);
    setAnftModalVisible(false);
    setTransferModalVisible(!transferModalVisible);
  }

  const openADUModalHandler = () => {
    setOpenADUModal(!openADUModal);
  }

  return (
    <Box px="2" pt="20">
      {loadingUser ? (
        <LoadingBox></LoadingBox>
      ) : errorUser ? (
        <MessageBox message={errorUser}></MessageBox>
      ) : (
        <Box maxW="container.lg" mx="auto" pb="8">
          {!props.match.params.id ? (
            <Stack p="4">
              <Box onClick={() => navigate.push("/welcome")} p="2" rounded="lg" shadow="card" align="center">
                <Text fontSize="sm" >You don't have any default wallet, would you like to create a new one?</Text>
                {/* <Button width="100%" size="sm" fontSize="xs" bgGradient="linear-gradient(to left, #BC78EC, #7833B6)" onClick={() => createWalletHandler()}>Create Wallet</Button> */}
              </Box>
            </Stack>
          ) : (
            <Stack p="2" >
              <Stack align="center" p="2" direction="row" justify="space-between">
                <ArrowBackIcon onClick={() => props.history.goBack()}/>
                <Text fontWeight="600">Wallet Details</Text>
                <IconButton as={RouterLink} to={`/setting`} bg="none" icon={<AiOutlineSetting size="20px" color="black" />} aria-label="Edit Screen Details"></IconButton>
              </Stack>
              {isFinnieConnected ? (
                <Stack>
                  <Box p="4" rounded="lg" shadow="card" >
                    <Flex align="center" justify="space-between">
                      <Text fontWeight="600" fontSize="sm">Wallet Address: </Text>
                      <CopyableAddress address={props?.match?.params?.id} w="100%" maxW="200px" />
                    </Flex>
                    <Flex align="center" justify="space-between">
                      <Text fontWeight="600" fontSize="sm">AD-Credits: </Text>
                      <Flex align="center" justify="space-between">
                        <Text p="2" fontWeight="600" fontSize="sm">₹ {(walletBalance?.ar) + (walletBalance?.koii) + (walletBalance?.ratData)}</Text>
                        <InfoIcon onClick={openADUModalHandler} fontSize="15px" color="green.500" />
                      </Flex>
                    </Flex>
                    {openADUModal && (
                      <Box p="4">
                        <hr />
                        <Text p="1" align="center" fontSize="xs" fontWeight="600">AD Credits are our in-app credits needed for interaction with our platform.</Text>
                        <Text p="1" align="center" fontSize="xs" fontWeight="600">For more information, please refer our white paper or contact us...</Text>
                      </Box>
                    )}
                  </Box>
                  {transferModalVisible ? (
                    <Box p="4" shadow="card" rounded="lg">
                      <FormControl id="toWallet">
                        <FormLabel fontSize="xs">Recipient Wallet</FormLabel>
                        <Stack direction="row" align="center">
                          <Input 
                            id="toWallet"
                            onChange={(e) => setToWallet(e.target.value)} 
                            placeholder={toWallet} 
                            value={toWallet}
                            type="text"  
                          />
                        </Stack>
                      </FormControl>
                      <FormControl id="quantity">
                        <FormLabel fontSize="xs">Transfer Value</FormLabel>
                        <Stack direction="row" align="center">
                          <Input 
                            id="quantity"
                            onChange={(e) => setQuantity(e.target.value)} 
                            placeholder={quantity} 
                            value={quantity}
                            type="number"  
                          />
                        </Stack>
                      </FormControl>
                      <FormControl id="ticker">
                        <FormLabel fontSize="xs">Tranfer Token</FormLabel>
                        <Stack direction="row" align="center">
                          <Select
                            id="ticker"
                            value={ticker}
                            onChange={(e) => setTicker(e.target.value)}
                          >
                            <option key={0} value="rat">RAT</option>
                            <option key={1} value="KOII">KOII</option>
                            <option key={2} value="AR">AR</option>
                          </Select>
                        </Stack>
                      </FormControl>
                      {/* <Center flexDir="column" w="100%" bg="gray.100" border="1px dashed" p="2" borderColor="blue.500" rounded="md" cursor="pointer" {...getRootProps()}>
                        <input 
                          title="inputHere" 
                          {...getInputProps()} 
                          value={jwk} 
                          onChange={(e) => setJwk(e.target.value)}
                        />
                        <Box direction="column" maxW="500px" mx="auto">
                          <Text fontWeight="600" fontSize="2xl">
                            Your JWK key here
                          </Text>
                          <Text fontSize="sm">Click or drag n' drop here to upload. </Text>
                        </Box>
                      </Center> */}
                      {loadingTokensTransfer ? (
                        <LoadingBox></LoadingBox>
                      ) : errorTokensTransfer ? (
                        <MessageBox variant="danger">{errorTokensTransfer}</MessageBox>
                      ) : (
                      <SimpleGrid p="2" gap="2" columns={[2]}>
                          <Button 
                            bgGradient="linear-gradient(to left, #BC78EC, #7833B6)"
                            onClick={submitTransferHandler}
                          >Submit Transfer</Button>
                          <Button 
                            variant="outline"
                            color="violet.500"
                            onClick={() => setTransferModalVisible(false)}
                          >Cancel Transfer</Button>
                      </SimpleGrid>
                      )}
                    </Box>
                  ) : (
                      
                    <SimpleGrid bgGradient="linear-gradient(to bottom, #BC78EC20, #7833B660)" p="4" rounded="lg" shadow="card" columns={[2]} gap="0">
                      <Box onClick={transferModalHandler} align="center" borderRight="1px" borderColor="gray.200">
                        <Text p="2" fontWeight="600" fontSize="sm">Send Tokens</Text>
                        <BsArrowUpRightCircle />
                      </Box>
                      <Box align="center" borderLeft="1px" borderColor="gray.200">
                        <Text p="2" fontWeight="600" fontSize="sm">Add Tokens</Text>
                        <BiWallet />
                      </Box>
                    </SimpleGrid>
                    
                  )}
                  <Box p="4" shadow="card" rounded="lg">
                    <Flex align="center" justify="space-between">
                      <Text p="2" fontWeight="600" fontSize="sm">Tokens</Text>
                      <Text p="2" fontWeight="600" fontSize="xs">see more</Text>
                    </Flex>
                    <SimpleGrid gap="4" columns={[2, 3]}>
                      <Box p="4" shadow="card" rounded="lg" align="center">
                        <ArweaveIcon m="2" color="black" boxSize="30px" />
                        <Text fontWeight="600" fontSize="sm">{walletBalance?.ar?.toFixed?.(5)}</Text>
                        <Flex align="center" justify="space-between">
                          <Text fontWeight="600" fontSize="xs">̥₹ {((walletBalance?.ar) * (walletPrice?.arPrice) * exchangeValue).toFixed?.(5)}</Text>
                          <Text fontWeight="600" fontSize="xs">$ {((walletBalance?.ar) * (walletPrice?.arPrice)).toFixed?.(5)}</Text>
                        </Flex>
                      </Box>
                      <Box p="4" shadow="card" rounded="lg" align="center">
                        <KoiiIcon m="2" color="black" boxSize="30px" />
                        <Text fontWeight="600" fontSize="sm">{walletBalance?.koii?.toFixed?.(5)}</Text>
                        <Flex align="center" justify="space-between">
                          {/* <Text fontWeight="600" fontSize="xs">̥₹ {((walletBalance?.koii) * (walletPrice?.koiiPrice) * exchangeValue).toFixed?.(3)} *</Text> */}
                          {/* <Text fontWeight="600" fontSize="xs">$ {((walletBalance?.koii) * (walletPrice?.koiiPrice)).toFixed?.(3)} *</Text> */}
                        </Flex>
                      </Box>
                  
                      <Box p="4" shadow="card" rounded="lg" align="center">
                        <RatIcon m="2" color="black" boxSize="30px" />
                        <Text fontWeight="600" fontSize="sm">{walletBalance?.ratData?.toFixed?.(3)}</Text>
                        <Flex align="center" justify="space-between">
                          {/* <Text fontWeight="600" fontSize="xs">̥₹ {((walletBalance?.ratData) * (walletPrice?.ratPrice)).toFixed?.(3)} *</Text> */}
                          {/* <Text fontWeight="600" fontSize="xs">$ {((walletBalance?.ratData)/exchangeValue).toFixed?.(3)} *</Text> */}
                        </Flex>
                      </Box>
                    </SimpleGrid>
                  </Box>
                  <Box p="4" shadow="card" rounded="lg">
                    <Flex align="center" justify="space-between">
                      <Text p="2" fontWeight="600" fontSize="sm">Transactions</Text>
                      <Text p="2" fontWeight="600" fontSize="xs">{txnDetailModal ? "see less" : "see more"}
                        <IconButton onClick={() => setTxnDetailModal(!txnDetailModal)} bg="none" 
                          icon={txnDetailModal ? <BiChevronUp  size="20px" color="black" /> : <BiChevronDown  size="20px" color="black" />} 
                          aria-label="Edit Advert Details">
                        </IconButton>
                      </Text>
                    </Flex>
                    {lastTxn?.lastTxn && lastTxn?.txnDetail?.transactions && !txnDetailModal && (
                        <Box p="4" my="2" shadow="card" rounded="lg" align="center">
                          <Text fontWeight="600" fontSize="xs">{new Date(lastTxn?.txnDetail?.transactions?.edges?.[0]?.node?.block?.timestamp * 1000).toString()?.split("GMT+0530")}</Text>
                          <Box align="left">
                            <Flex align="center" justify="space-between">
                              <Text fontWeight="600" fontSize="sm">{(lastTxn?.txnDetail?.transactions?.edges?.[0]?.node.tags.length > 0) ? "SmartContract Action" : "AR Transfer"}</Text>
                              <Flex align="center" justify="space-between">
                                <Text p="2" fontWeight="600" fontSize="xs">Cost: {(Number(lastTxn?.txnDetail?.transactions?.edges?.[0]?.node?.quantity?.ar) + Number(lastTxn?.txnDetail?.transactions?.edges?.[0]?.node?.fee?.ar))?.toFixed?.(3)} AD Credits</Text>
                                {(lastTxn?.txnDetail?.transactions?.edges?.[0]?.node?.recipient === walletAddAr) ? (
                                  <BsArrowDownLeft color="green" size="15px" />
                                ) : (
                                  <BsArrowUpRight color="red" size="15px" />
                                )}
                              </Flex>
                            </Flex>
                            <>
                                {(lastTxn?.txnDetail?.transactions?.edges?.[0]?.node?.recipient === walletAddAr) ? (
                                  <>
                                    <Text fontWeight="" fontSize="xs">From: {lastTxn?.txnDetail?.transactions?.edges?.[0]?.node?.owner?.address}</Text>
                                    <Text fontWeight="" fontSize="xs">Amount: {lastTxn?.txnDetail?.transactions?.edges?.[0]?.node?.quantity?.ar} AD Credits</Text>
                                  </>
                                ) : (
                                  <>
                                    <Text fontWeight="" fontSize="xs">{lastTxn?.txnDetail?.transactions?.edges?.[0]?.node?.recipient === "" ? null : `To: ${lastTxn?.txnDetail?.transactions?.edges?.[0]?.node?.recipient}`}</Text>
                                    <Text fontWeight="" fontSize="xs">Amount: {lastTxn?.txnDetail?.transactions?.edges?.[0]?.node?.recipient === "" ? lastTxn?.txnDetail?.transactions?.edges?.[0]?.node?.fee?.ar : lastTxn?.txnDetail?.transactions?.edges?.[0]?.node?.quantity?.ar} AD Credits</Text>

                                  </>
                                )}
                              <Text onClick={() => window.open(`https://viewblock.io/arweave/tx/${lastTxn?.txnDetail?.transactions?.edges?.[0]?.node?.id}`)} fontWeight="600" fontSize="xs">Tx: {lastTxn?.txnDetail?.transactions?.edges?.[0]?.node?.id}</Text>
                              <Text fontWeight="600" fontSize="xs">Fee: {lastTxn?.txnDetail?.transactions?.edges?.[0]?.node?.fee?.ar} AD Credits</Text>
                            </>
                          </Box>
                        </Box>
                    )}
                    <hr />

                    {allTrxn?.sort((a: any, b: any) => {
                      return b?.node?.block?.timestamp - a?.node?.block?.timestamp
                    })?.map((txn: any) => {
                      return (
                        <Box onClick={() => setTxnDetailModal(!txnDetailModal)} key={txn?.node?.id} p="4" shadow="card" rounded="lg" align="center">
                          <Text fontWeight="600" fontSize="xs" color="gray.500">{new Date(txn?.node?.block?.timestamp * 1000).toString()?.split("GMT+0530")}</Text>
                          <Box align="left">
                            <Flex align="center" justify="space-between">
                              {txn?.node?.tags.length === 0 && (
                                <Flex>
                                  <ArweaveIcon m="2" p="1" bgColor="gray.500" color="white" rounded="2xl" boxSize="30px" />
                                </Flex>
                              )}
                              {txn?.node?.tags.length === 4 && (
                                <Flex>
                                  <KoiiIcon m="2" p="1" bgColor="blue.300" color="white" rounded="2xl" boxSize="30px" />*
                                </Flex>
                              )}
                              {txn?.node?.tags.length === 8 && (
                                <Flex>
                                  <KoiiIcon m="2" p="1" bgColor="blue.300" color="white" rounded="2xl" boxSize="30px" />*
                                </Flex>
                              )}
                              {txn?.node?.tags.length === 6 && (
                                <Flex>
                                  <RatIcon m="2" color="violet.900" rounded="2xl" boxSize="30px" />
                                </Flex>
                              )}
                              <Text fontWeight="600" fontSize="sm">{(txn?.node.tags.length > 0) ? "SmartContract Action" : "AR Transfer"}</Text>
                              <Flex align="center" justify="space-between">
                                <Text p="2" fontWeight="600" fontSize="xs">Cost: {(Number(txn?.node?.quantity?.ar) + Number(txn?.node?.fee?.ar))?.toFixed?.(5)} Ad Credits</Text>
                                {(txn?.node?.recipient === walletAddAr) ? (
                                  <BsArrowDownLeft color="green" size="15px" />
                                ) : (
                                  <BsArrowUpRight color="red" size="15px" />
                                )}
                              </Flex>
                            </Flex>
                            {txnDetailModal && (
                              <Stack key={txn?.node?.id}>
                                {(txn?.node?.recipient === walletAddAr) ? (
                                  <>
                                    <Text fontWeight="" fontSize="xs">From: {txn?.node?.owner?.address}</Text>
                                    <Text fontWeight="" fontSize="xs">Amount: {txn?.node?.quantity?.ar} Ad Credits</Text>
                                  </>
                                ) : (
                                  <>
                                    <Text fontWeight="" fontSize="xs">{txn?.node?.recipient === "" ? null : `To: ${txn?.node?.recipient}`}</Text>
                                    <Text fontWeight="" fontSize="xs">Amount: {txn?.node?.recipient === "" ? txn?.node?.fee?.ar : txn?.node?.quantity?.ar} Ad Credits</Text>

                                  </>
                                )}
                                <Text onClick={() => window.open(`https://viewblock.io/arweave/tx/${txn?.node?.id}`)} fontWeight="600" fontSize="xs">Tx: {txn?.node?.id}</Text>
                                <Text fontWeight="600" fontSize="xs">Tx Fee: {txn?.node?.fee?.ar} Ad Credits</Text>
                              </Stack>
                            )}
                            
                          </Box>
                        </Box>
                      )
                    })}
                  </Box>
                </Stack>
              ) : (
                <Box p="4" rounded="lg" shadow="card" >
                  <Text>Connecting to finnie wallet...</Text>
                </Box>
              )}
              
            </Stack>
          )}
        </Box>
      )}
    </Box>
      // <HStack p="10px" justify="space-between" >
      //   <Heading fontSize="">Wallet Details</Heading>
      //   <Flex width="100px" p="5px" justify="space-between">
      //     <BiTransfer
      //       fontSize="20" 
      //       aria-label='Transfer Tokens'
      //       onClick={transferModalHandler}
      //     />
      //     <BsCloudUpload
      //       fontSize="20" 
      //       aria-label='Upload Atomic NFT'
      //       onClick={uploadModalHandler}
      //     />
      //     <BsGear 
      //       fontSize="20" 
      //       aria-label="Edit Wallet Details"
      //       onClick={editWalletModalHandler}
      //     />
      //   </Flex>
      // </HStack>
      // <Button bgColor="black" onClick={() => arweaveWalletConnect()}>connect</Button>
      // <Button bgColor="black" onClick={() => disconnectArweaveWallet()}>disconnect</Button>
      // <hr />
      // {loadingWallet ? (
      //   <LoadingBox></LoadingBox>
      // ) : errorWallet ? (
      //   <MessageBox variant="danger">{errorWallet}</MessageBox>
      // ) : ( 
      //   <Box>
      //     {anftModalVisible && (
      //       <Stack shadow="card" width="100%"  justify="space-between">
      //           <DragAndDropUploader />
      //       </Stack>
      //     )}
      //     
      //     {editWalletModalVisible && (
      //       <Stack>
      //         {loadingWalletEdit ? (
      //           <LoadingBox></LoadingBox>
      //         ) : errorWalletEdit ? (
      //           <MessageBox>{errorWalletEdit}</MessageBox>
      //         ) : (
      //           <Stack shadow="card" p="10px">
      //             <Heading textAlign="center" fontSize="">My wallet</Heading>
      //             <hr />
      //             <FormControl id="walletName">
      //               <FormLabel>Wallet Name</FormLabel>
      //               <Stack direction="row" align="center">
      //                 <Input 
      //                   id="walletName"
      //                   onChange={(e) => setWalletName(e.target.value)} 
      //                   placeholder={walletName} 
      //                   value={walletName}
      //                   type="text"  
      //                 />
      //               </Stack>
      //             </FormControl>
      //             <Flex justify="space-between">
      //               <Text fontSize="">{wallet?.balanceRAT} RAT</Text>
      //               <Text fontSize="">{wallet?.balanceKOII} KOII</Text>
      //               <Text fontSize="">{wallet?.balanceAR} AR</Text>
      //             </Flex>
      //             {wallet?.defaultWallet === true && <Text fontSize="">Default Wallet</Text>}
      //             {wallet?.defaultWallet === false && <Text fontSize="">Not A Default Wallet</Text>}
      //             <FormControl id="defaultWallet">
      //               {/* <FormLabel>Default Wallet?</FormLabel> */}
      //               <Stack direction="row" align="center">
      //                 <select
      //                   title="defaultWallet"
      //                   value={defaultWallet}
      //                   onChange={(e) => setDefaultWallet(e.target.value)}
      //                 >
      //                   <option value="">Deselect Wallet</option>
      //                   <option value="default">Default Wallet</option>
      //                   <option value="">Deselect Wallet</option>
      //                 </select>
      //               </Stack>
      //             </FormControl>
      //             <Button type="submit" onSubmit={submitHandler}>Update Wallet</Button>
      //           </Stack>
      //         )}
      //       </Stack>
      //     )}
      //     <Stack p="10px">
      //       <Box shadow="card" p="10px">
      //         <Flex justify="space-between">
      //           <Heading fontSize="">{wallet?.walletAddAr}</Heading>
      //           <Heading fontSize="">{wallet?.walletName}</Heading>
      //         </Flex>
      //         <Flex justify="space-between">
      //           <Text fontSize="">{wallet?.user}</Text>
      //           <Text fontSize="">{wallet?._id}</Text>
      //         </Flex>
      //         <hr />
      //         <Flex p="10px" justify="space-between" fontSize=""> Wallet Balance : 
      //           <strong>{wallet?.balanceRAT} RAT</strong>
      //           <strong>{wallet?.balanceKOII} KOII</strong>
      //           <strong>{wallet?.balanceAR} AR</strong>
      //         </Flex>
      //         {wallet?.defaultWallet === true && <Text fontSize="70%">Default wallet</Text>}
      //         {wallet?.defaultWallet === false && <Text fontSize="70%">Not default</Text>}
      //       </Box>
      //       <hr />
      //       {wallet?.pendingTransactions?.length !== 0 ? (
      //         <Box shadow="card" p="10px">
      //           <Heading fontSize="">Pending Transactions</Heading>
      //           <hr />
      //           {wallet?.pendingTransactions?.map((tx: any) => (
      //             <Stack  key={tx.txId} onClick={() => props.history.push(`/viewblock/tx/${tx.txId}`)}> 
      //               <Heading fontSize="">{tx.txId}</Heading>
      //               <Flex justify="space-between">
      //                 <Text fontSize="">{tx.txType.type}</Text>
      //                 <Text fontSize="">Status: {tx.body.status}</Text>
      //               </Flex>
      //             </Stack>
      //           ))}
      //         </Box>
      //       ) : (
      //         <Text>No pending transactions for you</Text>
      //       )}
      //       <hr />

      //       <SimpleGrid gap="8" columns={[1, 2]}>
      //         <Stack>
      //           {wallet?.recievedTransactions?.length === 0 ? (
      //             <Text fontSize="">No Transactions</Text>
      //           ) : (
      //             <Box shadow="card" p="10px" >
      //               <Heading fontSize="">Recieved Transactions</Heading>
      //               <hr />
      //               {wallet?.recievedTransactions?.map((tx: any) => (
      //                 <Stack key={tx.txId} onClick={() => props.history.push(`/viewblock/tx/${tx.txId}`)}>
      //                   <Heading fontSize="">{tx.txId}</Heading>
      //                   <Flex justify="space-between">
      //                     <Text fontSize="">{tx.txType.type}</Text>
      //                     <Text fontSize="">Status: {tx.body.status}</Text>
      //                   </Flex>
      //                 </Stack>
      //                 ))}
      //             </Box>
      //           )}
      //         </Stack>
      //         <Stack>
      //           {wallet?.transactions?.length === 0 ? (
      //             <Text fontSize="">No Transactions</Text>
      //           ): (
      //             <Box shadow="card" p="10px">
      //               <Heading fontSize="">Complete Transactions</Heading>
      //               <hr />
      //               {wallet?.transactions?.map((tx: any) => (
      //                 <Stack key={tx.txId} onClick={() => props.history.push(`/viewblock/tx/${tx.txId}`)}>
      //                   <Heading fontSize="">{tx.txId}</Heading>
      //                   <Flex justify="space-between">
      //                     <Text fontSize="">{tx.txType.type}</Text>
      //                     <Text fontSize="">Status: {tx.body.status}</Text>
      //                   </Flex>
      //                 </Stack>
      //                 ))}
      //             </Box>
      //           )}
      //         </Stack>
      //       </SimpleGrid>
      //     </Stack>

      //   </Box>
      // )}

  )
}
