import React, { useState } from "react";
import {
  Box,
  Stack,
  Image,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
function Picture({ Files }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [openimg, setOpenimg] = useState();
  return (
    <div>
      <Box mt={5}>
        <Text color={"teal.600"} mb={10} fontSize="16">
          School Pictures 2-3
        </Text>
        <Stack direction={"row"} spacing={4}>
          {Files.map((f) => {
            return (
              <>
                <Image
                  boxSize="100px"
                  onClick={() => {
                    onOpen();
                    setOpenimg(f.url);
                  }}
                  objectFit="cover"
                  src={f.url}
                  alt=""
                />
              </>
            );
          })}

          <Modal isOpen={isOpen} size="xl" onClose={onClose}>
            <ModalOverlay />
            <ModalContent zIndex={999999}>
              <ModalHeader></ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Image src={openimg} alt="" />
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Stack>
      </Box>
    </div>
  );
}

export default Picture;
