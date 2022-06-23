import { useCallback, useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { useLogin, useWallet } from "components/contexts";
import HLoading from "components/atoms/HLoading";
import { getUniqueRandomNumbersArray, splitArrayIntoHalf } from "utils/util";
import styled from "styled-components";

import { Box, Tooltip, FormControl, Image, FormLabel, Input, Center, Link, Flex, Stack, SimpleGrid, VStack, Text, Button, IconButton, HStack } from "@chakra-ui/react";
import { KeyPhraseItem } from "./components/KeyPhraseItem";
import { LoadingBox, MessageBox } from "components/helpers";
import {
  icon_back2,
  icon_close,
  icon_warning_triangle,
  warning_red_icon,
  bk_key_part1, icon_back, icon_check, warning_icon
} from "assets/svgs";
import {createWallet, editWallet} from "../../../Actions/walletActions";
import {signout } from "../../../Actions/userActions";

const hiddenKeyPhrasesKeys = getUniqueRandomNumbersArray(3, 11);

export function KeyConfirm() {
  const { mnemonics, isLoading, getArweavePublicAddress } = useWallet();
  const navigate = useHistory();
  const { setSeedPhraseSaved } = useLogin();
  const [mnemonicsArray, setMnemonicsArray] = useState<string[]>([]);
  const [error, setErr] = useState("");

  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();

  const [hiddenPhrasesValues, setHiddenPhrasesValues] = useState(
    hiddenKeyPhrasesKeys.reduce<Record<string, string>>(
      (acc, hiddenWordIndex) => ({ ...acc, [hiddenWordIndex]: "" }),
      {}
    )
  );

  useEffect(() => {
    if (mnemonics) {
      setMnemonicsArray(mnemonics.split(" "));
    } else {
      navigate.push("/key-management");
    }
  }, [mnemonics]);

  const phrasesPairsMatches = useCallback(() => {
    const withMatchedPhrases = mnemonicsArray.map((mnemonic, index) => {
      if (hiddenKeyPhrasesKeys.includes(index)) {
        return hiddenPhrasesValues[index];
      }
      return mnemonic;
    });

    return withMatchedPhrases.join(" ") === mnemonics;
  }, [mnemonicsArray, mnemonics, hiddenPhrasesValues]);

  const onConfirm = async () => {
    if (phrasesPairsMatches()) {
      console.log("done")
      const defWallet = getArweavePublicAddress();
      console.log(defWallet)
      if(userInfo?.defaultWallet === undefined || null || "") {
        dispatch(createWallet(defWallet));
      }
      if(userInfo?.defaultWallet !== defWallet) {
        dispatch(editWallet({
          defWallet
        }))
      }
      navigate.push("/upload");
      await setSeedPhraseSaved();
      console.log("done")
    } else {
      setErr("Please input matched characters");
    }
  };

  const { firstHalf: leftRowMnemonics, secondHalf: rightRowMnemonics } =
    useMemo(() => splitArrayIntoHalf(mnemonicsArray), [mnemonicsArray]);

  const renderKeyPhrase = (keyword: string, itemIndex: number) => {
    const isInput = hiddenKeyPhrasesKeys.includes(itemIndex);
    const inputValue = hiddenPhrasesValues[itemIndex];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
      setHiddenPhrasesValues({
        ...hiddenPhrasesValues,
        [itemIndex]: e.target.value,
      });

    return (
      <KeyPhraseItem
        key={keyword}
        keyword={keyword}
        isInput={isInput}
        label={`${itemIndex + 1}`}
        inputValue={inputValue}
        onInputChange={handleInputChange}
      />
    );
  };

  return (
    <Box px="2" pt="20">
      <Center maxW="container.lg" minH="600" mx="auto" pb="8">
        <Stack p="8" rounded="lg" shadow="card">
          <Flex p="4" justify="space-between" align="center">
            <img
              onClick={() => navigate.push("/key-management")}
              src={icon_back2}
              alt="back"
            />
            <Text fontSize="lg" fontWeight="600" >
              Welcome to Finnie
            </Text>
            <img
              onClick={() => navigate.push("/setting")}
              src={icon_close}
              alt="close"
            />
          </Flex>
          <hr />
          <Text textAlign="center" p="2" fontSize="sm">
              Store your recovery phrase somewhere safe. 
              <br />
              This phrase makes it easy to restore your account.
          </Text>
          <Text textAlign="center" p="2" fontSize="">
            Never disclose your recovery phrase.
            <br /> 
            Anyone with this phrase can steal from your wallet.
          </Text>
          <HLoading loading={isLoading} />
          <KeyConfirmContainer>
            {isLoading  && <LoadingBox></LoadingBox>}
            {error && <MessageBox>{error}</MessageBox>}
            <Box flex={1}>
              {leftRowMnemonics.map((keyword, index) => {
                return renderKeyPhrase(keyword, index);
              })}
            </Box>
            <Box flex={1}>
              {rightRowMnemonics.map((keyword, index) => {
                // moving 6 positions, as this is second half of the array
                index = index + 6;
                return renderKeyPhrase(keyword, index);
              })}
            </Box>
            <Button variant="outline" color="violet.500" onClick={onConfirm}>Continue</Button>
          </KeyConfirmContainer>
        </Stack>
      </Center>
    </Box>  
  );
}


export const KeyConfirmContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background: violet.500;
  padding: 20px;

  div {
    z-index: 1;
  }

  .bk-part1 {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    width: 100%;
    z-index: 0;
  }
  .bk-part2 {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 200px;
    z-index: 0;
  }
  .koii-large {
    margin-top: 150px;
  }
  .colorWhite {
    color: white !important;
  }
  .colorGreen {
    color: green.400!important;
  }
  @media (max-width: 321px) {
    width: 100vw;
  }
`;

