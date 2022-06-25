/* eslint-disable react-hooks/rules-of-hooks */
import {useEffect, useState} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import { Center, SimpleGrid } from "@chakra-ui/react";
import { getMediaType, triggerPort } from "services/utils";

import { screenVideosList } from '../../Actions/screenActions';

import { LoadingBox, MessageBox, Rating } from "components/helpers";

export function ScreenPlayer (props: any) {
  const screenId = props.match.params.id;

  const [index, setIndex] = useState(1);
  const [nfts, setNfts] = useState<any>([])
  const screenVideos = useSelector((state: any) => state.screenVideos);
  const { 
    videos, 
    loading: loadingScreenVideos, 
    error: errorScreenVideos 
  } = screenVideos;


  const dispatch = useDispatch();

  useEffect(() => {
    if(videos) {
      setNfts(videos.map((video : any) => {
        // return video.video.split('/').slice(-1)
        return video.video

      }))
      console.log(nfts)
    }
    dispatch(screenVideosList(screenId));

  }, [
    screenId,
    nfts,
  ])

  const looping = (e : any) => {
    if(index === nfts.length) {
      setIndex(1)
    } else {
      setIndex(index + 1)
    }
    e.target.src = nfts.map((nft: any) => nft)[index-1]
    triggerPort(e.target.src.split('/').slice(-1))
    e.target.play();

  }

  return (
    <Center align="center" justify="center">
      {loadingScreenVideos ? (
        <LoadingBox></LoadingBox>
      ) : errorScreenVideos ? (
        <MessageBox variant="danger">{errorScreenVideos}</MessageBox>
      ) : (
        <video 
          autoPlay
          controls
          src={"https://arweave.net/DGcP1bUjPZ5BKRegD5PFb94C_wO4HPZ2mq236p6Il70"}
          onEnded={(e) => looping(e)}
          poster="https://arweave.net/pziELbF_OhcQUgJbn_d1j_o_3ASHHHXA3_GoTdJSnlg"
          width="100%"
          />
      )}
    </Center>
  )
}