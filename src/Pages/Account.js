import React, { useEffect, useState } from "react";
import "../css/App.css";
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
  color,
} from "@chakra-ui/react";
import { SearchIcon, ExternalLinkIcon, SettingsIcon } from "@chakra-ui/icons";
import logo from "../images/home.jpg";
import { Link } from "react-router-dom";
import Signout from "./auth/Signout";
import Userdata from "./auth/Userdata";
import RedirectifAuth from "./auth/RedirectifAuth";
import ChangeCourse from "./ChangeCourse";

import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import db from "../firebase-config";
import { async } from "@firebase/util";
import swal from "sweetalert";

function Account() {
  const redirect = RedirectifAuth();
  const [userId, setUserid] = useState(Userdata().id);
  const [data, setData] = useState(Userdata().data);
  const [school, setSchool] = useState([]);
  const [newpass, setNewpass] = useState("");
  const [fetch, setFetch] = useState(false);

  const [courses, setCourses] = useState([]);

  const fetchSchool = async () => {
    const firestoreData = await getDocs(collection(db, "Schools"));
    setSchool(firestoreData);
  };

  const dData = [];
  useEffect(() => {
    fetchSchool();
  }, [fetch]);

  const handleChange = async (e) => {
    const typeofdata = e.currentTarget.dataset.type;
    const id = e.currentTarget.dataset.id;
    const table = e.currentTarget.dataset.table;

    if (table == "user") {
      const Users = doc(db, "Users", userId);

      await updateDoc(Users, {
        [typeofdata]: e.target.value,
      });
    } else {
      const Schools = doc(db, "Schools", id);

      await updateDoc(Schools, {
        [typeofdata]: e.target.value,
      });
    }
  };

  const handleChangePassword = async (e) => {
    if (newpass == "") {
      swal(
        "Password Field Empty!",
        "Please fill in the password Field!",
        "error"
      );
    } else {
      const Users = doc(db, "Users", userId);
      await updateDoc(Users, {
        Password: newpass,
      }).then(() => {
        swal(
          "Password Changed!",
          "You have Successfully Changed your password!",
          "success"
        );
        setNewpass("");
      });
    }
  };
  return (
    <>
      <div className="header">
        <Box float={"left"} p="2">
          <Text fontSize="2xl">Arapa</Text>
        </Box>
        <Box float={"right"} p="2">
          <Button
            size={"sm"}
            fontWeight="normal"
            borderRadius={0}
            onClick={Signout}
          >
            <i
              className="fas fa-logout"
              style={{
                backgroundColor: "maroon",
                padding: "5px",
                color: "white",
                borderRadius: "4px",
                marginRight: "5px",
              }}
            ></i>{" "}
            Logout
          </Button>
        </Box>
      </div>

      {school.forEach((doc) => {
        if (data.SchooliD == doc.id) {
          // setCourses(doc.data().Courses);
          dData.push(
            <>
              <div className="accbody">
                <Box>
                  <SimpleGrid minChildWidth="300px" columns={2} spacing="10px">
                    <Box>
                      <Heading mb="5" color={"teal.400"} as="h3" size="lg">
                        {doc.data().Name}
                      </Heading>
                      <Box>
                        <Text size={"md"} fontSize="16">
                          School Name :
                        </Text>
                      </Box>
                      <Box mb={2}>
                        <Input
                          defaultValue={doc.data().Name}
                          variant={"outline"}
                          borderColor={"transparent"}
                          data-type="Name"
                          data-id={doc.id}
                          onChange={handleChange}
                        />
                      </Box>

                      <Box>
                        <Text size={"md"} fontSize="16">
                          School Address :
                        </Text>
                      </Box>
                      <Box mb={2}>
                        <Input
                          defaultValue={doc.data().Address}
                          variant={"outline"}
                          borderColor={"transparent"}
                          data-type="Address"
                          data-id={doc.id}
                          onChange={handleChange}
                        />
                      </Box>
                      <Box>
                        <Text size={"md"} fontSize="16">
                          Website :
                        </Text>
                      </Box>
                      <Box mb={2}>
                        <Input
                          defaultValue={doc.data().Weblink}
                          variant={"outline"}
                          borderColor={"transparent"}
                          data-type="Weblink"
                          data-id={doc.id}
                          onChange={handleChange}
                        />
                      </Box>
                      <Box>
                        <Text size={"md"} fontSize="16">
                          Description :
                        </Text>
                      </Box>
                      <Box mb={2}>
                        <Textarea
                          defaultValue={doc.data().Description}
                          variant={"outline"}
                          borderColor={"transparent"}
                          data-type="Description"
                          data-id={doc.id}
                          onChange={handleChange}
                        />
                      </Box>

                      <Select
                        placeholder="-- Select Type --"
                        backgroundColor={"white"}
                        borderRadius={0}
                        borderWidth={2}
                        required
                        name="schooltype"
                        defaultValue={doc.data().SchoolType}
                        data-type="SchoolType"
                        data-id={doc.id}
                        onChange={handleChange}
                      >
                        <option value="Primary">Primary</option>
                        <option value="High School">High School</option>
                        <option value="Senior High School">
                          Senior High School
                        </option>
                        <option value="College">College</option>
                      </Select>

                      <Box>
                        <Text size={"md"} fontSize="16">
                          Courses Open
                        </Text>

                        <Box p={5}>
                          <ul>
                            {doc.data().Courses.map((row) => {
                              return (
                                <>
                                  <li>{row.value}</li>
                                </>
                              );
                            })}
                          </ul>

                          <ChangeCourse setFetch={setFetch} schoolid={doc.id} />
                        </Box>
                      </Box>
                      <Box mb={2}>
                        <Editable defaultValue="Editable">
                          <EditablePreview />
                          <EditableInput borderRadius={0} />
                        </Editable>
                      </Box>

                      <Alert status="success" variant="left-accent">
                        <AlertIcon />
                        To change Info just Click the data you wish to Update.
                      </Alert>
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

                          <Box mt={5}>
                            <Box>
                              <Text size={"md"} fontSize="16">
                                Email:
                              </Text>
                            </Box>
                            <Box mb={2}>
                              <Input
                                defaultValue={data.Email}
                                variant={"outline"}
                                borderColor={"transparent"}
                                data-type="Email"
                                data-table="user"
                                onChange={handleChange}
                              />
                            </Box>

                            <Box>
                              <Text size={"sm"} fontSize="16">
                                Change Password :
                              </Text>
                            </Box>
                            <Box mb={2}>
                              <Stack direction={"row"}>
                                <Input
                                  placeholder="Enter New Password  "
                                  size="sm"
                                  type={"password"}
                                  value={newpass}
                                  onChange={(e) => {
                                    setNewpass(e.target.value);
                                  }}
                                />{" "}
                                <Button
                                  variant="outline"
                                  colorScheme={"facebook"}
                                  size="sm"
                                  onClick={handleChangePassword}
                                >
                                  Save Password
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
            </>
          );
        }
      })}
      {dData}
    </>
  );
}

export default Account;
