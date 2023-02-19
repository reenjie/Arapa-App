import React, { useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

export const Profilemodal = ({
  Btnopen,
  modalcontent,
  modalTitle,
  savechanges,
  open,
  setOpen,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    open ? onOpen() : onClose();
  }, [open]);
  return (
    <>
      {Btnopen}

      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setOpen(false);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{modalcontent}</ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              size={"sm"}
              mr={3}
              onClick={() => {
                setOpen(false);
                onClose();
              }}
            >
              Close
            </Button>
            <Button size={"sm"} variant="ghost" onClick={savechanges}>
              Save Changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
