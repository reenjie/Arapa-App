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
import Map from "./admin/Map";
import Picture from "./layouts/Picture";

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
  const [longitude, setLongitude] = useState();
  const [marker, setMarker] = useState(true);
  const [latitude, setLatitude] = useState();
  const [courses, setCourses] = useState([]);
  const [markerdrag, setMarkerdrag] = useState(false);

  const fetchSchool = async () => {
    const firestoreData = await getDocs(collection(db, "Schools"));
    setSchool(firestoreData);
  };

  const dData = [];
  const schdata = [];
  useEffect(() => {
    fetchSchool();
  }, [fetch]);

  const UpdateMap = async () => {
    const TheSchoolid = data.SchooliD;
    const Map = [
      {
        Lat: latitude,
        Lng: longitude,
      },
    ];
    const Schools = doc(db, "Schools", TheSchoolid);
    await updateDoc(Schools, {
      Map: Map,
    });
  };
  useEffect(() => {
    UpdateMap();
    setMarkerdrag(false);
  }, [markerdrag]);

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

                      <Box>
                        <Text size={"md"} fontSize="16">
                          Requirements :
                        </Text>
                      </Box>
                      <Box mb={2}>
                        <Textarea
                          defaultValue={doc.data().requirements? doc.data().requirements:""}
                          variant={"outline"}
                          borderColor={"transparent"}
                          data-type="requirements"
                          data-id={doc.id}
                          onChange={handleChange}
                        />
                      </Box>

                      <Box>
                        <Text size={"md"} fontSize="20">
                          Additional info | Links
                        </Text>
                      </Box>

                      <Box>
                        <Text size={"md"} fontSize="16">
                          Facebook :
                        </Text>
                      </Box>
                      <Box mb={2}>
                        <Textarea
                          defaultValue={
                            doc.data().Facebook ? doc.data().Facebook : null
                          }
                          variant={"outline"}
                          borderColor={"transparent"}
                          data-type="Facebook"
                          data-id={doc.id}
                          onChange={handleChange}
                        />
                      </Box>

                      <Box>
                        <Text size={"md"} fontSize="16">
                          Instagram :
                        </Text>
                      </Box>
                      <Box mb={2}>
                        <Textarea
                          defaultValue={
                            doc.data().Instagram ? doc.data().Instagram : null
                          }
                          variant={"outline"}
                          borderColor={"transparent"}
                          data-type="Instagram"
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
                        <Textarea
                          defaultValue={
                            doc.data().Website ? doc.data().Website : null
                          }
                          variant={"outline"}
                          borderColor={"transparent"}
                          data-type="Website"
                          data-id={doc.id}
                          onChange={handleChange}
                        />
                      </Box>

                      <Box>
                        <Text size={"md"} fontSize="16">
                          Other Sites :
                        </Text>
                      </Box>
                      <Box mb={2}>
                        <Textarea
                          defaultValue={
                            doc.data().OtherSites ? doc.data().OtherSites : null
                          }
                          variant={"outline"}
                          borderColor={"transparent"}
                          data-type="OtherSites"
                          data-id={doc.id}
                          onChange={handleChange}
                        />
                      </Box>

                      <Box>
                        <Text size={"md"} fontSize="16">
                          Contact Number:
                        </Text>
                      </Box>
                      <Box mb={2}>
                        <Textarea
                          defaultValue={
                            doc.data().ContactNo ? doc.data().ContactNo : null
                          }
                          variant={"outline"}
                          borderColor={"transparent"}
                          data-type="ContactNo"
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
                            {doc.data().Courses
                              ? doc.data().Courses.map((row) => {
                                  return (
                                    <>
                                      <li>{row.value}</li>
                                    </>
                                  );
                                })
                              : null}
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
                      <Picture
                        Files={doc.data().Files}
                        IDpicture={doc.data().IdPicture}
                        dataid={doc.id}
                        user="user"
                      />
                    </Box>

                    <Box>
                      <Stack direction={"column"}>
                        <Box bg={"blackAlpha.500"} w="100%" height="300px">
                          <Map
                            viewOnly={false}
                            longitude={doc.data().Map[0].Lng}
                            setLongitude={setLongitude}
                            latitude={doc.data().Map[0].Lat}
                            setLatitude={setLatitude}
                            marker={marker}
                            setMarker={setMarker}
                            markerdrag={markerdrag}
                            setMarkerdrag={setMarkerdrag}
                          />
                        </Box>
                        <Box w="100%">
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
