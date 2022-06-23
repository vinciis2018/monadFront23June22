// ui
import { Stack, Button, useDisclosure, ButtonGroup, StackProps } from "@chakra-ui/react";
import { ReportModal, ShareModal, TipArtistModal } from "components/modals";

/* Footbar */
interface Props extends StackProps {
  nft: Record<string, any>;
}

export const NftFootbar = ({ nft, ...restProps }: Props) => {
  /* Modal */
  const { isOpen: isShareModalOpen, onOpen: openShareModal, onClose: closeShareModal } = useDisclosure();
  const { isOpen: isTipModalOpen, onOpen: openTipModal, onClose: closeTipModal } = useDisclosure();

  return (
    <>
      {/* Modals */}
      {isShareModalOpen && <ShareModal isOpen={isShareModalOpen} onClose={closeShareModal} nftId={nft?.id} nftTitle={nft?.title} />}
      {isTipModalOpen && <TipArtistModal isOpen={isTipModalOpen} onClose={closeTipModal} artistAddress={nft?.owner || nft?.creator} artistName={nft?.name} />}

      <Stack direction="row" p="2" roundedBottom="md" bg="violet.50" color="white" zIndex="3" {...restProps}>
        <ButtonGroup
          w="100%"
          size="xs"
          isAttached
          onClick={e => {
            e.preventDefault();
          }}
        >
          <Button bgGradient="linear-gradient(to left, #BC78EC, #7833B6)" aria-label="tip" children="Tip Artist" onClick={openTipModal} />
          <Button  variant="outline" color="violet" aria-label="tip" children="Share" onClick={openShareModal} />
        </ButtonGroup>
      </Stack>
    </>
  );
};
