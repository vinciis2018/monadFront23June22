import { useQuery } from "react-query";
import axios from "services/axios";

interface Props {
  id: string;
}

const fetchNft = async (id: string) => {
  try {
    if (!id) return undefined;
    const { data } = await axios.get(`/attention/nft?id=${id}`);
    return data;
  } catch (error) {
    return undefined;
  }
};

export function useNft({ id }: Props) {
  return useQuery(`nft-${id}`, () => fetchNft(id), {
    staleTime: 60 * 1000 * 60, // 1hr cache, since the nft details does not change.
    refetchOnWindowFocus: undefined
  });
}

const getRealAttention = async (id: String) => {
  try{
    const {data} = await axios.get(`https://mainnet.koii.live/attention/realtime-attention?id=${id}`)
    console.log("data", data?.count)
    return data;
  } catch (error) {
    console.log("error", error)
    return undefined;
  }
}

export function useNftData({id}: Props){
  return useQuery(`nftData-${id}`, () => getRealAttention(id), {
    staleTime: 60 * 1000 * 60, // 1hr cache, since the nft details does not change.
    refetchOnWindowFocus: undefined
  })
}