import React from "react";
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
} from "@chakra-ui/react";
import { SearchIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import logo from "../images/home.jpg";
import { Link } from "react-router-dom";
function Account(props) {
  return (
    <>
      <div className="header">
        <Box float={"left"} p="2">
          <Text fontSize="2xl">Arapa</Text>

          {/*  <Image
        src="https://th.bing.com/th/id/OIP.PPmPYp9tRFPxurMFYv4zdQHaGl?pid=ImgDet&rs=1"
        alt="Logo"
        width={20}
      /> */}
        </Box>
        <Box float={"right"} p="2">
          <Button size={"sm"} fontWeight="normal" borderRadius={0}>
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

      <div className="accbody">
        <Box>
          <SimpleGrid minChildWidth="300px" columns={2} spacing="10px">
            <Box>
              <Heading mb="5" color={"teal.400"} as="h3" size="lg">
                San Beda University
              </Heading>
              <Box>
                <Text size={"md"} fontSize="16">
                  School Name :
                </Text>
              </Box>
              <Box mb={2}>
                <Editable defaultValue="Editable">
                  <EditablePreview />
                  <EditableInput borderRadius={0} />
                </Editable>
              </Box>

              <Box>
                <Text size={"md"} fontSize="16">
                  School Address :
                </Text>
              </Box>
              <Box mb={2}>
                <Editable defaultValue="Editable">
                  <EditablePreview />
                  <EditableInput borderRadius={0} />
                </Editable>
              </Box>
              <Box>
                <Text size={"md"} fontSize="16">
                  Website :
                </Text>
              </Box>
              <Box mb={2}>
                <Editable defaultValue="Editable">
                  <EditablePreview />
                  <EditableInput borderRadius={0} />
                </Editable>
              </Box>
              <Box>
                <Text size={"md"} fontSize="16">
                  Description :
                </Text>
              </Box>
              <Box mb={2}>
                <Editable defaultValue="Editable">
                  <EditablePreview />
                  <EditableTextarea borderRadius={0} resize="none" />
                </Editable>
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

                  <Box mt={5}>
                    <Box>
                      <Text size={"md"} fontSize="16">
                        Email:
                      </Text>
                    </Box>
                    <Box mb={2}>
                      <Editable defaultValue="Editable">
                        <EditablePreview />
                        <EditableInput borderRadius={0} />
                      </Editable>
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
      </div>
    </>
  );
}

export default Account;
