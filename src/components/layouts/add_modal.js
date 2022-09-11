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
import { AddIcon } from "@chakra-ui/icons";
function Add_Modal(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        colorScheme="teal"
        mb={10}
        size={"sm"}
        fontSize={14}
        variant="outline"
        key={"xl"}
        m={4}
        onClick={onOpen}
      >
        <Text mr={2}> {props.btnTitle} </Text>
        <i className="fas fa-plus-circle"></i>
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

export default Add_Modal;
