/* eslint-disable react-hooks/rules-of-hooks */
import {useEffect, useState} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Center, Box, Button, Stack } from "@chakra-ui/react";
import { triggerPort } from "services/utils";
import { 
  screenVideosList, 
  // screenPlaylistDetail, 
  detailsScreen 
} from '../../Actions/screenActions';
import { LoadingBox, MessageBox, Rating } from "components/helpers";

export function ScreenPlayer (props: any) {
  const screenId = props.match.params.id;
  const [screenName, setScreenName] = useState("")

  const userSignin = useSelector((state: any) => state.userSignin);
  const {loading: loadingUser, error: errorUser, userInfo} = userSignin;

  const screenDetails = useSelector((state: any) => state.screenDetails);
  const {
    loading: loadingScreen,
    error: errorScreen,
    screen
  } = screenDetails;

  const screenVideos = useSelector((state: any) => state.screenVideos);
  const { 
    loading, 
    error,
    videos
  } = screenVideos;

  const [index, setIndex] = useState(1);
  

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsScreen(screenId));
    dispatch(screenVideosList(screenId));
    if(screen) {
      setScreenName(screen.name)
    }
  }, [
    dispatch,
    screenId,
  ])

  const looping = (e : any) => {
    if(videos.length > 0) {
      if(index === videos.length) {
        setIndex(1)
      } else {
        setIndex(index + 1)
      }
      e.target.src = videos.map((video: any) => video.video)[index-1]
      
      e.target.play();
      // dispatch(screenPlaylistDetail({video: e.target.src, screenId }))
      triggerPort(e.target.src.split('/').slice(-1))
    }
  }

  const updateScreen = async () => {
    console.log(screenName);
    fetch(`${process.env.REACT_APP_BLINDS_SERVER}/api/screens/${screenName}/screenName`)
    .then(res => console.log(res.json()))
  }
  return (
    <Center align="center" justify="center" width="100%" height="1080px">
      {loadingUser && loadingScreen ? (
        <LoadingBox></LoadingBox>
      ) : errorUser && errorScreen ? (
        <MessageBox variant="danger">{errorUser && errorScreen}</MessageBox>
      ) : (
        <Stack>
          <Button
            onClick={updateScreen}
          >
            Get Screen
          </Button>
          {screen?.master === userInfo?.defaultWallet}   
          <Box>
            {loading ? (
              <LoadingBox></LoadingBox>
            ) : error ? (
              <MessageBox variant="danger">{error}</MessageBox>
            ) : (
              <video
                autoPlay
                muted
                
                // src="https://arweave.net/DGcP1bUjPZ5BKRegD5PFb94C_wO4HPZ2mq236p6Il70"
                onEnded={(e) => looping(e)}
                poster="https://arweave.net/pziELbF_OhcQUgJbn_d1j_o_3ASHHHXA3_GoTdJSnlg"
                width="100%"
              >
                {/* <source src="https://arweave.net/DGcP1bUjPZ5BKRegD5PFb94C_wO4HPZ2mq236p6Il70"/> */}
                {videos.map((video: any) => (
                  <source key={video._id} src={video.video}/>
                ))}

              </video>
            )}
          </Box>
        </Stack>

       )}
      
    </Center>
  )
}