// ui
import { SimpleGrid } from "@chakra-ui/react";
import { NftFeaturedCard } from "components/cards";
import { EmptyState } from "components/ui";

interface Props {
  nfts: any[];
}

export function RenderNftsList({ nfts }: Props) {
  return (
    <>
      {nfts?.length !== 0 && (
        <SimpleGrid w="100%" minW="0" minH="0" gap="4" columns={[1, 2, 3]}>
          {nfts?.map((nft: Record<string, any>) => (
            <NftFeaturedCard nft={nft} key={nft?.id} />
          ))}
        </SimpleGrid>
      )}

      {nfts?.length === 0 && <EmptyState minH={{ base: "300px", md: "600px" }} />}
    </>
  );
}
