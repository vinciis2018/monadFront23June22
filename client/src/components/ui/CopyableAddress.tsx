// ui
import { Stack, Code, Tooltip, IconButton, useClipboard, StackProps } from "@chakra-ui/react";
// icons
import { RiCheckFill } from "react-icons/ri";
import { MdOutlineContentCopy } from "react-icons/md";

interface Props extends StackProps {
  address: string;
}

export const CopyableAddress = ({ address, ...restProps }: Props) => {
  const { hasCopied, onCopy } = useClipboard(address);
  return (
    <Stack spacing="0" p="1" rounded="md" direction="row" align="center" {...restProps}>
      <Code bgColor="" noOfLines={1} w="100%" flexBasis="100%" fontWeight="600" fontSize="sm" h="32px" lineHeight="32px" color="black">
        {address}
      </Code>
      <Tooltip bg="violet.500" hasArrow placement="top" isOpen={hasCopied} label="Copied!">
        <IconButton
          flexBasis="32px"
          flexShrink="0"
          size="sm"
          aria-label="copy-wallet-address"
          roundedLeft="0px"
          // colorScheme="gray"
          color="gray.500"
          variant="ghost"
          icon={hasCopied ? <RiCheckFill size="20px" /> : <MdOutlineContentCopy size="18px" />}
          onClick={onCopy}
        />
      </Tooltip>
    </Stack>
  );
};
