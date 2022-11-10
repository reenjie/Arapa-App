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
import { SearchIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import logo from "../images/home.jpg";
import { Link } from "react-router-dom";
import Signout from "./auth/Signout";
import Userdata from "./auth/Userdata";
import RedirectifAuth from "./auth/RedirectifAuth";
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

function Account() {
  const redirect = RedirectifAuth();
  const [userId, setUserid] = useState(Userdata().id);
  const [data, setData] = useState(Userdata().data);
  const [school, setSchool] = useState([]);

  const fetchSchool = async () => {
    const firestoreData = await getDocs(collection(db, "Schools"));
    firestoreData.forEach((doc) => {
      if (doc.id == data.SchooliD) {
        setSchool([
          {
            data: {
              id: doc.id,
              data: data,
            },
          },
        ]);
      }
    });
  };

  useEffect(() => {
    fetchSchool();
  }, []);

  console.log(school);

  const handleChange = async (e) => {};

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

      {/* <div className="accbody">
        <Box>
          <SimpleGrid minChildWidth="300px" columns={2} spacing="10px">
            <Box>
              <Heading mb="5" color={"teal.400"} as="h3" size="lg">
                {school[0].data.data.Name}
              </Heading>
              <Box>
                <Text size={"md"} fontSize="16">
                  School Name :
                </Text>
              </Box>
              <Box mb={2}>
                <Input
                  defaultValue={school[0].data.data.Name}
                  variant={"outline"}
                  borderColor={"transparent"}
                  data-type="name"
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
                  defaultValue={school[0].data.data.Address}
                  variant={"outline"}
                  borderColor={"transparent"}
                />
              </Box>
              <Box>
                <Text size={"md"} fontSize="16">
                  Website :
                </Text>
              </Box>
              <Box mb={2}>
                <Input
                  defaultValue={school[0].data.data.Weblink}
                  variant={"outline"}
                  borderColor={"transparent"}
                />
              </Box>
              <Box>
                <Text size={"md"} fontSize="16">
                  Description :
                </Text>
              </Box>
              <Box mb={2}>
                <Textarea
                  defaultValue={school[0].data.data.Description}
                  variant={"outline"}
                  borderColor={"transparent"}
                />
              </Box>

              <Box>
                <Text size={"md"} fontSize="16">
                  Courses Open
                </Text>
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
                      />
                    </Box>

                    <Box>
                      <Text size={"sm"} fontSize="16">
                        Change Password :
                      </Text>
                    </Box>
                    <Box mb={2}>
                      <Stack direction={"row"}>
                        <Input placeholder="Enter New Password  " size="sm" />{" "}
                        <Button
                          variant="outline"
                          colorScheme={"facebook"}
                          size="sm"
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
      </div> */}
    </>
  );
}

export default Account;
