/* eslint-disable react-hooks/rules-of-hooks */
import {useEffect, useState} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Center, Box } from "@chakra-ui/react";
import { triggerPort } from "services/utils";

import { screenVideosList } from '../../Actions/screenActions';

import { LoadingBox, MessageBox, Rating } from "components/helpers";

export function ScreenPlayer (props: any) {
  const screenId = props.match.params.id;

  const screenVideos = useSelector((state: any) => state.screenVideos);
  const { 
    loading, 
    error,
    videos
  } = screenVideos;

  const [index, setIndex] = useState(1);
  

  const dispatch = useDispatch();

  useEffect(() => {
   
    dispatch(screenVideosList(screenId));

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
      triggerPort(e.target.src.split('/').slice(-1))
    }
  }

  return (
    <Center align="center" justify="center" width="100%" height="1080px">
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Box>
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
            
        </Box>
      )}
    </Center>
  )
}