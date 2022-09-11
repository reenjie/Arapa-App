import React from "react";
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
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
function Edit_Modal(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        variant={"ghost"}
        size="sm"
        color="green.400"
        key={"xl"}
        m={4}
        onClick={onOpen}
      >
        <EditIcon />
      </Button>
      <Modal onClose={onClose} size={"xl"} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent userSelect={"none"}>
          <ModalHeader color={"blackAlpha.700"}>{props.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody color={"gray.600"}>{props.mbody}</ModalBody>
          <ModalFooter>
            <Button id="modalClose" display={"none"} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Edit_Modal;
