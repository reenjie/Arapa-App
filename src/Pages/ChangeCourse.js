import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Text,
} from "@chakra-ui/react";
import db from "../firebase-config";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import swal from "sweetalert";
import { SearchIcon, ExternalLinkIcon, SettingsIcon } from "@chakra-ui/icons";
import AddCourse from "./auth/AddCourse";
function ChangeCourse({ setFetch, schoolid }) {
  const [courses, setCourses] = useState([]);
  const [coursesCount, setcoursesCount] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSave = async () => {
    const Schools = doc(db, "Schools", schoolid);

    await updateDoc(Schools, {
      Courses: courses,
    }).then(() => {
      swal(
        "Changed Successfully!",
        "Courses Information has Changed Successfully!",
        "success"
      ).then(() => {
        window.location.reload();
      });

      onClose();
    });
  };

  return (
    <>
      <Button
        onClick={onOpen}
        variant={"solid"}
        mt={5}
        size={"sm"}
        colorScheme={"red"}
      >
        Change Courses <SettingsIcon style={{ marginLeft: "5px" }} />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text fontSize={"16px"}>Change Courses </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddCourse
              courses={courses}
              coursesCount={coursesCount}
              setcoursesCount={setcoursesCount}
              setCourses={setCourses}
            />
          </ModalBody>

          <ModalFooter>
            <Button size={"sm"} colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button size={"sm"} onClick={handleSave} variant="ghost">
              Save Changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ChangeCourse;
