/* eslint-disable no-console */
import { styled } from "@mui/system";
import ModalUnstyled from "@mui/base/ModalUnstyled";
import { Typography } from "@mui/material";
import {
  icon_back2,
  icon_close,
  icon_warning_triangle,
  warning_red_icon,
} from "assets/svgs";
import { useHistory } from "react-router-dom";
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Flex, Box } from "@chakra-ui/react";

import { AiOutlineArrowLeft } from "react-icons/ai";

interface Props {
  handleClose: (val: boolean) => void;
  open?: boolean;
}

export function BackupModal({ open = false, handleClose }: Props) {
  const navigate = useHistory();
  const onClickBackup = () => {
    handleClose(false);
  };
  const onClickLater = () => {
    // window.location.replace("/pin-create");
    navigate.push("/pin-create");

  };
  return (
    <Modal isOpen={open} onClose={() => handleClose(false)}>
      <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <AiOutlineArrowLeft fontSize="20px" />
            <Text align="center">Skip Backup</Text>
          </ModalHeader>
          <ModalCloseButton />
          <hr />
          <ModalBody>
            <Text align="justify" fontSize="">
              If you don’t back up your recovery
              phrase, you could lose your key
              and everything in it.
            </Text>
          </ModalBody>
          <ModalFooter justify="space-between" align="center">
            <Button variant="outline" color="violet.500"  onClick={onClickBackup}>Continue Backing Up</Button>
            <Button variant="outline" color="" onClick={onClickLater}>Back Up Later</Button>
          </ModalFooter>
        </ModalContent>
    </Modal>
  );
}
