/* eslint-disable no-console */

import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";

interface Props {
  onClose: (val: boolean) => void;
  onSecureMyAccountClick: () => void;
  open?: boolean;
}

export function KeyPhraseSaveModal({ open = true, onClose, onSecureMyAccountClick, }: Props) {

  if (!open) return null;
  return (
    <Modal isOpen={open} onClose={() => onClose(false)}>
      <ModalOverlay />
        <ModalContent>
          <ModalHeader align="center" fontSize="" fontWeight="600">Keep your finnie wallet secure</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text align="justify" fontSize="sm">
              This phrase is the <strong>only</strong> way to
              recover your account. Grab a pen and paper, and store it somewhere
              safe. Keep it off any internet-connected device.
            </Text>
            <Text pt="4" >Send me as an email</Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onSecureMyAccountClick} autoFocus variant="outline" color="violet.500">
              Secure My Account Now
            </Button>
          </ModalFooter>
        </ModalContent>
    </Modal>
  );
}
