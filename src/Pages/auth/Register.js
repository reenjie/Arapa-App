import React, { useState } from "react";
import "../../css/App.css";
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
import { Link, useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import db from "../../firebase-config";
import { v4 as uuid } from "uuid";
import swal from "sweetalert";
import AddCourse from "./AddCourse";
function Register() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [coursesCount, setcoursesCount] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const school_unique_id = uuid();
    const user_unique_id = uuid();

    const userpass = e.target.userpassword.value;
    const reenterpass = e.target.userreenterpassword.value;

    if (userpass == reenterpass) {
      const result = await setDoc(doc(db, "Schools", school_unique_id), {
        Address: e.target.schooladdress.value,
        Contact: e.target.usercontact.value,
        Description: e.target.schooldescription.value,
        Email: e.target.schoolemail.value,
        Name: e.target.schoolname.value,
        Weblink: e.target.schoolwebsite.value,
        SchoolType: e.target.stype.value,
        Courses: courses,
        mapID: "",
        status: 0,
      }).then(() => {
        //school_unique_id

        setDoc(doc(db, "Users", user_unique_id), {
          Contact: e.target.usercontact.value,
          Email: e.target.useremail.value,
          Name: e.target.username.value,
          Password: e.target.userpassword.value,
          SchooliD: school_unique_id,
          usertype: 0,
        }).then(() => {
          swal(
            "Registered Successfully",
            "You are Registered Successfully!",
            "success"
          ).then(() => {
            navigate("/Account/Info");
          });
        });
      });
    } else {
      swal(
        "Password Does not Match!",
        "Please make sure Reentered password match your first password",
        "error"
      ).then(() => {});
    }
  };

  return (
    <>
      <form method={"post"} onSubmit={handleSubmit}>
        <div className="header">
          <Box float={"left"} p="2">
            <Text fontSize="2xl">Arapa</Text>
          </Box>
          <Box float={"right"} p="2"></Box>
        </div>

        <div className="accbody">
          <Box>
            <SimpleGrid minChildWidth="300px" columns={2} spacing="10px">
              <Box>
                <Heading mb="5" color={"gray.500"} as="h3" size="lg">
                  Register
                </Heading>

                <Text
                  mt={4}
                  fontWeight={"bold"}
                  color={"gray.600"}
                  textAlign={"center"}
                >
                  School Information
                </Text>
                <Box>
                  <Text size={"md"} fontSize="16">
                    School Name :
                  </Text>
                </Box>
                <Box mb={2}>
                  <Input size={"sm"} name="schoolname" autoFocus required />
                </Box>

                <Box>
                  <Text size={"md"} fontSize="16">
                    School Address :
                  </Text>
                </Box>
                <Box mb={2}>
                  <Input size={"sm"} name="schooladdress" required />
                </Box>

                <Box>
                  <Text size={"md"} fontSize="16">
                    School Email :
                  </Text>
                </Box>
                <Box mb={2}>
                  <Input size={"sm"} name="schoolemail" required />
                </Box>
                <Box>
                  <Text size={"md"} fontSize="16">
                    Website :
                  </Text>
                </Box>
                <Box mb={2}>
                  <Input size={"sm"} name="schoolwebsite" required />
                </Box>
                <Box>
                  <Text size={"md"} fontSize="16">
                    Description :
                  </Text>
                </Box>
                <Box mb={2}>
                  <Textarea size={"sm"} name="schooldescription" required />
                </Box>

                <Box mb={2}>
                  <Select
                    placeholder="-- Select Type --"
                    backgroundColor={"white"}
                    borderRadius={0}
                    borderWidth={2}
                    required
                    name="stype"
                  >
                    <option value="Primary">Primary</option>
                    <option value="High School">High School</option>
                    <option value="Senior High School">
                      Senior High School
                    </option>
                    <option value="College">College</option>
                  </Select>
                </Box>

                <Box mb={2}>
                  <AddCourse
                    courses={courses}
                    coursesCount={coursesCount}
                    setcoursesCount={setcoursesCount}
                    setCourses={setCourses}
                  />
                </Box>

                <Box mt={5}>
                  <Text color={"teal.600"} mb={10} fontSize="16">
                    School Pictures 2-3
                  </Text>
                  <Stack direction={"row"} spacing={4}>
                    <Box bg="tomato" height={"80px"} p="10"></Box>
                    <Box bg="tomato" height={"80px"} p="10"></Box>
                    <Box bg="tomato" height={"80px"} p="10"></Box>
                  </Stack>
                </Box>
              </Box>

              <Box>
                <Stack direction={"column"}>
                  <Box bg={"blackAlpha.500"} w="100%" height="300px">
                    Map Heere
                  </Box>
                  <Box w="100%">
                    <Button variant={"solid"} bg="blue.300" size={"sm"}>
                      Pin Location
                    </Button>

                    {/*   <Stack mt={2} direction={"row"} width="100%" columns={2}>
                    <Box width="25%">
                      <Text size={"md"} fontSize="16">
                        Password :
                      </Text>
                    </Box>
                    <Box width="80%">
                      <Input placeholder="" size="sm" w={"100%"} />
                    </Box>
                  </Stack> */}
                    <Text
                      mt={4}
                      fontWeight={"bold"}
                      color={"gray.600"}
                      textAlign={"center"}
                    >
                      User Information
                    </Text>

                    <Box mt={3}>
                      <Box>
                        <Text size={"sm"} fontSize="16">
                          Name:
                        </Text>
                      </Box>
                      <Box mb={2}>
                        <Input size={"sm"} name="username" required />
                      </Box>
                      <Box>
                        <Text size={"md"} fontSize="16">
                          Contact:
                        </Text>
                      </Box>
                      <Box mb={2}>
                        <Input size={"sm"} name="usercontact" required />
                      </Box>
                      <Box>
                        <Text size={"md"} fontSize="16">
                          Email:
                        </Text>
                      </Box>
                      <Box mb={2}>
                        <Input size={"sm"} name="useremail" required />
                      </Box>

                      <Box>
                        <Text size={"sm"} fontSize="16">
                          Password :
                        </Text>
                      </Box>
                      <Box>
                        <Input
                          placeholder="Enter New Password  "
                          size="sm"
                          required
                          name="userpassword"
                          type={"password"}
                        />
                      </Box>
                      <Box>
                        <Text size={"sm"} fontSize="16">
                          ReEnter Password :
                        </Text>
                      </Box>
                      <Box>
                        <Input
                          type={"password"}
                          placeholder="ReEnter Password  "
                          size="sm"
                          required
                          name="userreenterpassword"
                        />
                      </Box>
                      <Box mb={2}>
                        <Stack direction={"row"} mt={5}>
                          <Button
                            variant="solid"
                            colorScheme={"facebook"}
                            size="md"
                            type={"submit"}
                          >
                            Register
                          </Button>
                        </Stack>
                      </Box>
                    </Box>
                  </Box>
                </Stack>
              </Box>
            </SimpleGrid>
          </Box>
        </div>
      </form>
    </>
  );
}

export default Register;
