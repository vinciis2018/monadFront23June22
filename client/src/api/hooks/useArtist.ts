import { useQuery } from "react-query";
// sdk
import * as kweb from "@_koi/sdk/web";
let koiSDK = new kweb.Web();
import arweaveGraphql,{ SortOrder, TagOperator } from 'arweave-graphql'

// utils
import { formatDigitNumber, getNftsStats } from "services/utils";

interface Props {
  id: string;
}

const fetchArtist = async (id: string) => {
  let nfts: any;
  try {
    if (!id) return undefined;
    const nftTxs = await getMyNfts(id);
    const koiiUserData = await koiSDK.getNftsByOwner(id);
    const nftKoii = koiiUserData.filter((nft: any) => nft.contentType !== "text/html")

    if(nftKoii.length === 0 ) {
      nfts = nftTxs
    } else {
      nfts = nftKoii.concat(nftTxs?.filter((tx) => {
        nftKoii.indexOf(tx) < 0
      }));
    }
    const [totalAttention, totalReward] = getNftsStats(nftKoii);
    const data: { nfts: any[]; totalAttention: string; totalReward: string | number } = { nfts, totalAttention, totalReward: formatDigitNumber(totalReward) };
    console.log(data)
    return data;
  } catch (error) {
    return undefined;
  }
};

export function useArtist({ id }: Props) {
  return useQuery(`artist-${id}`, () => fetchArtist(id), {
    staleTime: 60 * 1000 * 5, // 5min cache.
    refetchOnWindowFocus: undefined
  });
}

export async function getMyNfts(walletAddress : any) {
  try {
    const result = await arweaveGraphql('arweave.net/graphql').getTransactions({
      owners: [walletAddress],
      tags: [
        { name: 'App-Name', values: ['SmartWeaveContract'] },
        { name: 'Network', values: ['Koii'] },
        { name: 'Action', values: ['marketplace/Create']},
      ],
    })
    // console.log(result)
    const txs = result?.transactions?.edges.filter(edge => 
      {
        if(edge.node.tags.length === 8) return edge?.node?.id
      }
    );
      // console.log(txs)
    const data = txs.map((tx: any) => tx.node)
    console.log(data)
    return data;
  } catch (error) {
    console.log(error)
  }
   
}
