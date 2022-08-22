import { useState, useEffect } from "react";
// hooks
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useWallet, useLogin } from "components/contexts";
import { bk_welcome_part1, bk_welcome_part2, koii_large } from "assets/svgs";
import HPasswordInput from "components/atoms/HPasswordInput";
import { ERROR_IDS } from "utils/constants";
import { Box, Tooltip, FormControl, Image, FormLabel, Input, Center, Link, Flex, Stack, SimpleGrid, VStack, Text, Button, IconButton, HStack } from "@chakra-ui/react";
import { LoadingBox, MessageBox } from "components/helpers";

export function LoginHelper() {
  const navigate = useHistory();
  const searchParams = new URLSearchParams();
  const { loginUser } = useLogin();
  const [err, setErr] = useState("");
  const [pinFocus, setPinFocus] = useState(true);
  const [pin, setPin] = useState("");
  const [message, setMessage] = useState("");


  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  useEffect(() => {
    if (!userInfo) {
      navigate.push("/signin");
    }
  }, [userInfo]);

  const {
    unlock,
    checkAndTriggerSelfDestruct,
    generateAndSave,
    wipeTempSavedPin,
  } = useWallet();

  
  const onClick = () => {
    checkPin(pin);
  };

  const checkPin = (pincode: string) => {
    if (pincode !== "") {
      checkAndTriggerSelfDestruct(pincode).then((cleared) => {
        if (cleared) {
          // TODO: On Self Destruct App should be populated with safe content
          navigate.push("/");
        } else {
          unlock(pincode)
            .then(async (res) => {
              const expired = Math.floor(Date.now() / 1000) + 10 * 60; // 10 mins
              const status = await loginUser(expired);
            })
            .catch((error: Error) => {
              console.log(error)
              if (error.message.includes(ERROR_IDS.NO_CONTENT)) {
                wipeTempSavedPin().then(() => generateAndSave(pin));
                setErr("Please enter your pin")
              }

              if (error.message.includes(ERROR_IDS.INCORRECT_PIN)) {
                setPin("");
                setErr("PIN code is not match. Please try again.");
                console.log(err)
                return err;
              }
            });
            setMessage("Please wait for the confirmation")
            return message;
        }
      });
    } else {
      setErr("Please input PIN.");
      return err;
    }
  };

  const activeFocusArea = () => {
    setPinFocus(true);
  };

  const completedPin = (value: string) => {
    checkPin(value);
  };

  return (
    <Center maxW="container.lg" mx="auto">
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox>{error}</MessageBox>
      ) : (
        <Stack>
          {err && <MessageBox>{err}</MessageBox>}
          {message !== "" && <MessageBox>{message}</MessageBox>}
          <Box align="center" onClick={activeFocusArea}>
            <Text color="black" textAlign="center" px="4" pt="4" fontSize="xs" fontWeight="600">
              Enter your 6 digit secret pin to unlock
            </Text>
            <HPasswordInput
              label="Enter Access PIN"
              onChange={setPin}
              onComplete={completedPin}
              focused={pinFocus}
              labelAlign="center"
            />
            <Button mt="2" variant="outline" width="50%" color="violet.500" onClick={onClick}>Log In</Button>
          </Box>
        </Stack>
      )}
    </Center>
  );
}
