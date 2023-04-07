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
  Input,
  Center,
} from "@chakra-ui/react";
import swal from "sweetalert";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import db from "../../firebase-config";
import { AttachmentIcon } from "@chakra-ui/icons";
import { FiUpload } from "react-icons/fi";
import { useRef } from "react";
import { useToast } from "@chakra-ui/react";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase-config";
function Picture({ Files, IDpicture, dataid, user }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [openimg, setOpenimg] = useState();
  const [load, setLoad] = useState(false);
  const [change, setChange] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileLimit, setFileLimit] = useState(false);
  const [validate, setValidate] = useState(false);
  const [percent, setPercent] = useState(0);
  const toast = useToast();
  const fileRef = useRef();
  const [toupload, setToupload] = useState([]);

  const handleSavechanges = async () => {
    const School = doc(db, "Schools", dataid);
    setLoad(true);
    if (selectedFiles.length >= 1) {
      selectedFiles.map((f) => {
        const storageRef = ref(storage, f.name);
        const uploadTask = uploadBytesResumable(storageRef, f);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const percent = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            // update progress
            setPercent(percent);
          },
          (err) => console.log(err),
          () => {
            // download url
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              toupload.push({ url });
            });
          }
        );
      });
      setTimeout(async () => {
        await updateDoc(School, {
          Files: toupload,
        });
        onClose();
        setToupload("");
        setLoad(false);
        swal("Changes Saved", "Pictures changed successfully!", "success").then(
          () => {
            window.location.reload();
          }
        );
      }, 4000);
    } else {
      toast({
        title: `No selected Photo.`,
        description: `Please select image file to proceed`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      setLoad(false);
    }
  };

  const Max_Count = 3;
  const handleFileUpload = (files) => {
    const uploaded = [...selectedFiles];
    let limitExceeded = false;

    files.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file);
        if (uploaded.length === Max_Count) setFileLimit(true);
        if (uploaded.length > Max_Count) {
          toast({
            title: `File Upload Maximum limit Reached`,
            description: `The number of photo can be save is ${Max_Count}`,
            status: "error",

            duration: 9000,
            isClosable: true,
          });

          setFileLimit(false);
          limitExceeded = true;

          return true;
        }
      }
    });

    if (!limitExceeded) {
      setSelectedFiles(uploaded);
      setValidate(false);
    }
  };

  const handleFileEvent = (e) => {
    setSelectedFiles([]);
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    handleFileUpload(chosenFiles);
  };
  {
  }
  return (
    <div>
      <Box mt={5}>
        {/* <Text color={"teal.600"} mt={10} mb={10} fontSize="16">
          School ID
        </Text>
        <Image
          onClick={() => {
            onOpen();
            setOpenimg(IDpicture);
            setChange(false);
          }}
          boxSize="100px"
          objectFit="cover"
          src={IDpicture}
          alt=""
        /> */}

        <Text color={"teal.600"} mt={10} mb={10} fontSize="16">
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
                    setChange(false);
                  }}
                  objectFit="cover"
                  src={f.url}
                  alt=""
                />
              </>
            );
          })}

          {user == "user" && Files.length >= 1 && (
            <>
              <Button
                onClick={() => {
                  setChange(true);
                  onOpen();
                }}
                colorScheme={"gray"}
                variant={"solid"}
              >
                Change Photo
              </Button>
            </>
          )}

          <Modal isOpen={isOpen} size={change ? "sm" : "xl"} onClose={onClose}>
            <ModalOverlay />
            <ModalContent zIndex={999999}>
              <ModalHeader></ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {change ? (
                  <>
                    <h5>Change Photos</h5>
                    <Input
                      type="file"
                      display={"none"}
                      accept="image/*"
                      onChange={handleFileEvent}
                      ref={fileRef}
                      multiple={true}
                    />
                    <Box
                      p={5}
                      bg={"green.50"}
                      cursor={"pointer"}
                      onClick={() => {
                        fileRef.current.click();
                        setSelectedFiles([]);
                      }}
                    >
                      <Center>
                        <FiUpload />
                        <Text fontSize={13}>
                          {selectedFiles.length >= 1
                            ? "Reselect Photo"
                            : "Upload Photo "}{" "}
                        </Text>
                      </Center>
                    </Box>
                    <grid direction={"row"} spacing={4}>
                      {selectedFiles.map((file) => {
                        return (
                          <>
                            <Box
                              w={"50"}
                              bg="teal.100"
                              p="3"
                              borderRadius={10}
                              border={"1px solid gray"}
                            >
                              <AttachmentIcon /> {file.name}
                            </Box>
                          </>
                        );
                      })}
                    </grid>
                    <Button
                      onClick={handleSavechanges}
                      colorScheme="teal"
                      float={"right"}
                      mt={10}
                      isLoading={load}
                    >
                      Save Changes
                    </Button>
                  </>
                ) : (
                  <Image src={openimg} alt="" />
                )}
              </ModalBody>

              <ModalFooter>
                {change ? (
                  ""
                ) : (
                  <Button colorScheme="blue" mr={3} onClick={onClose}>
                    Close
                  </Button>
                )}
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Stack>
      </Box>
    </div>
  );
}

export default Picture;
