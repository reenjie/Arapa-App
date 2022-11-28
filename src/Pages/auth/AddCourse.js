import React, { useState, useEffect } from "react";
import {
  Image,
  Box,
  Center,
  Heading,
  Stack,
  Text,
  Button,
  Input,
  IconButton,
  Select,
  Avatar,
  Container,
  SimpleGrid,
  Textarea,
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import swal from "sweetalert";
function AddCourse({ courses, setCourses, setcoursesCount, coursesCount }) {
  const [tempkey, setTempkey] = useState();
  const [clear, setClear] = useState(false);

  const handleChanges = (e) => {
    const value = e.target.value;
    const key = e.currentTarget.dataset.key;

    if (courses.length >= 1) {
      if (courses.filter((x) => x.id === key).length == 1) {
        courses
          .filter((x) => x.id === key)
          .map((td) => {
            courses[td.id].value = value;
          });
      } else {
        courses.push({
          id: key,
          value: value,
        });
      }
    } else {
      courses.push({
        id: key,
        value: value,
      });
    }
  };

  const dInputs = [];

  for (let index = 0; index < coursesCount; index++) {
    dInputs.push(
      <>
        <Input
          placeholder="Course"
          size={"sm"}
          data-key={index}
          bg={"whiteAlpha.800"}
          onChange={handleChanges}
          id={index}
        />
      </>
    );
  }
  return (
    <div>
      <Input
        placeholder="Indicate Number of Courses here."
        value={coursesCount}
        onChange={(e) => {
          if (e.target.value > 40) {
            swal(
              "Maximum limit reach",
              "40 is the maximum count of courses to save.",
              "error"
            );
          } else {
            setcoursesCount(e.target.value);
            setCourses([]);
            setTempkey("");
            for (let index = 0; index < coursesCount; index++) {
              document.getElementById(index).value = "";
            }
          }
        }}
        type={"number"}
      />
      <Box p={10} bg={"gray.100"}>
        {coursesCount >= 1 ? (
          <Stack>
            <Text>Please Input Number of Courses</Text>
            {dInputs}

            {/* <Button
              onClick={() => {
                console.log(courses);
              }}
            >
              viewdata
            </Button> */}
          </Stack>
        ) : null}
      </Box>
    </div>
  );
}

export default AddCourse;
