/* eslint-disable no-console */
import { useState } from "react";
// hooks
import { useUpload } from "components/contexts";
import { styled, useTheme } from "@mui/material/styles";
import Calendar from "react-calendar";
import { icon_check, icon_back2, icon_close } from "assets/svgs";
import { useHistory } from "react-router-dom";
import HChip from "components/atoms/HChip";
import DateTimePicker from "react-datetime-picker";
import { getTimestamp } from "utils/util";
import { Box, Tooltip, Checkbox, FormControl, Image, FormLabel, Slider, SliderTrack, SliderMark, SliderFilledTrack, SliderThumb, Input, Center, Link, Flex, Stack, SimpleGrid, VStack, Text, Button, IconButton, HStack } from "@chakra-ui/react";
import { MessageBox } from "components/helpers";

export function UploadDelay() {
  const theme = useTheme();
  const navigate = useHistory();
  const [date, setDate] = useState(new Date());
  const [hours, setHours] = useState(0);
  const [err, setErr] = useState("");

  const { imageUrl, tags, title, description, updateReleaseDate, releaseDate } =
    useUpload();
  const [delayOption, setDelayOption] = useState("slider");

  const onChangeCalendar = (date: Date) => {
    setDate(date);
    const formattedDate = getTimestamp(date); //Math.floor(date.getTime() / 1000);
    updateReleaseDate("date", formattedDate);
  };

  const onClickConfirm = () => {
    // check validation
    let error = "";
    if (!releaseDate) {
      updateReleaseDate("date", getTimestamp(date));
    }
    if (error !== "") {
      setErr(error);
    } else {
      setErr("");
      navigate.push("/upload-confirm");
    }
  };

  return (
    <Box px="2" pt="20">
      <Center maxW="container.lg" minH="600" mx="auto" pb="8">
        <Stack p="8" rounded="lg" shadow="card">
          <Flex p="4" justify="space-between" align="center">
            <img
              onClick={() => navigate.push("/upload-tags")}
              src={icon_back2}
              alt="back"
            />
            <Text fontSize="lg" fontWeight="600" >
              NFT Creation
            </Text>
            <img
              onClick={() => navigate.push("/upload")}
              src={icon_close}
              alt="close"
            />
          </Flex>
          <hr />
          <SimpleGrid columns={[1, 2]} gap="2">
            <Box>
              <Stack p="4" align="center">
                <Image rounded="lg" src={imageUrl} alt="icon" height="360px" />
              </Stack>
              < hr />
            </Box>
            <Box>
              <Stack p="2">
                <Text fontSize="" fontWeight="600">Title: {title} </Text>
                <Text fontSize="sm">Description: {description} </Text>
                {tags && tags.length > 0 ? (
                  <Flex
                    align="center"
                    justify="space-between"
                  >
                    {tags
                      .filter((_tag, _i) => _i < 3)
                      .map((_tag, _i) =>
                        _tag ? (
                          <SimpleGrid key={_i}>
                            <HChip title={_tag} />
                          </SimpleGrid>
                        ) : (
                          <div key={_i}></div>
                        )
                      )}
                    {tags.length > 3 && (
                      <SimpleGrid>
                        <HChip title={`${tags.length - 3}+`} closable={false} />
                      </SimpleGrid>
                    )}
                  </Flex>
                ) : (
                  <></>
                )}
                <hr />
                {delayOption !== "confirm" && (
                  <Stack>
                    <Text fontWeight="600" > Delayed Release </Text>
                    <Text fontSize="xs">
                      You choose when your content can be viewed by the public.
                      <br /> If you want it to be released immediately, select NOW on the left.
                    </Text>
                  </Stack>
                )}
                <hr />
                {delayOption === "slider" && (
                  <Stack>
                    <Box>
                      <Flex pt="8" pb="2" justify="space-around">
                        <Slider
                          id='slotsPerDay'
                          min={0}
                          max={72} 
                          colorScheme='purple'
                          aria-label='slotsPerDay'
                          value={hours}

                          onChange={(hours) => {
                            setHours(hours);
                            updateReleaseDate("time", hours);
                          }}
                        >
                          <SliderMark
                            value={hours}
                            textAlign='center'
                            bg='purple.400'
                            color='white'
                            rounded="md"
                            mt='-10'
                            mx="-7"
                            p="2"
                          >
                            {`${hours} hours`}
                          </SliderMark>
                          <SliderTrack>
                            <SliderFilledTrack />
                          </SliderTrack>
                          <SliderThumb />
                        </Slider>
                      </Flex>
                    </Box>
                    <hr />
                    <Text fontSize="xs" fontWeight="600" onClick={() => setDelayOption("calendar")}>
                      Click here to select a specific date
                    </Text>
                  </Stack>
                )}
                {delayOption === "calendar" && (
                  <Stack>
                    <Text fontSize="xs" fontWeight="600" onClick={() => setDelayOption("slider")} >
                      Click here to select from the slider
                    </Text>
                    <StyledDate
                      onChange={onChangeCalendar}
                      value={date}
                      calendarIcon={null}
                      clearIcon={null}
                      disableCalendar={true}
                      disableClock={true}
                      format={`dd MMMM yyyy HH:mm AEST`}
                      autoFocus={false}
                    />
                    <StyledCalendar onChange={onChangeCalendar} value={date} />
                  </Stack>
                )}
                 {delayOption === "confirm" && (
                    <Stack>
                      <Text > Will be published on March 8, 20223 </Text>
                      <hr />
                      <Text > Archive Content. Permanently </Text>
                      <Text > Any files registered to Arweave using can never
                        <br /> be removed or censored.
                      </Text>
                      <Text >  Estimated Costs: </Text>
                      <Text >1 KOII</Text>
                      <Text >0.0005 AR</Text>
                      <Text > Storage Fee </Text>
                    </Stack>
                  )}
                  {err && <MessageBox>{err}</MessageBox>}              
                  
                  <Button variant="outline" color="violet.500" onClick={onClickConfirm}>Confirm</Button>
                  <Box>
                    {delayOption && (
                      <MessageBox>
                        {delayOption === "slider"
                          ? "You need to select a time frame"
                          : delayOption === "calendar"
                          ? "Select a release time."
                          : ""}
                      </MessageBox>
                    )}

                  </Box>
              </Stack>
            </Box>
          </SimpleGrid>
        </Stack>
      </Center>
    </Box>
   
  );
}

const StyledDate = styled(DateTimePicker)(({  }) => ({
  fontSize: "14px",
  height: "40px",
  borderRadius: "2px solid #5ED9D1",
  ".react-datetime-picker__wrapper": {
    ".react-datetime-picker__inputGroup": {
      width: 268,
      padding: "0 11px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      ".react-datetime-picker__inputGroup__month": {
        appearance: "none",
        width: "46px",
      },
      ".react-datetime-picker__inputGroup__input": {
        color: "gray",
        "&.react-datetime-picker__inputGroup__year": {
          marginRight: "auto",
        },
        "&:focus-visible": {
          outline: "unset",
        },
      },
    },
  },
}));
const StyledCalendar = styled(Calendar)(({  }) => ({
  backgroundColor: "gray.400",
  border: "none",
  borderRadius: "2px solid black",
  marginTop: 9,
  ".react-calendar__navigation": {
    borderRadius: "2px solid black",
    height: 67,
    ".react-calendar__navigation__arrow, .react-calendar__navigation__label": {
      color: "gray",
      fontSize: "14px",
    },
  },
  ".react-calendar__viewContainer": {
    ".react-calendar__month-view": {
      padding: "0 25px",
      fontSize: "10px",

      ".react-calendar__month-view__days": {
        ".react-calendar__tile": {
          color: "black",
          "&.react-calendar__tile--now": {
            background: "gray",
          },
          "&.react-calendar__tile--active": {
            background: "gray.500",
            outline: "1px solid black",
          },
        },
      },
    },
  },
}));
