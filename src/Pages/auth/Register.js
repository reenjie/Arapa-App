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
import { Link } from "react-router-dom";

function Register() {
  /* const [email, setEmail] = useState(""); */

  function handleSubmit() {}

  return (
    <>
      <form>
        <div className="header">
          <Box float={"left"} p="2">
            <Text fontSize="2xl">Arapa</Text>
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
                  <Input size={"sm"} autoFocus />
                </Box>

                <Box>
                  <Text size={"md"} fontSize="16">
                    School Address :
                  </Text>
                </Box>
                <Box mb={2}>
                  <Input size={"sm"} />
                </Box>
                <Box>
                  <Text size={"md"} fontSize="16">
                    Website :
                  </Text>
                </Box>
                <Box mb={2}>
                  <Input size={"sm"} />
                </Box>
                <Box>
                  <Text size={"md"} fontSize="16">
                    Description :
                  </Text>
                </Box>
                <Box mb={2}>
                  <Textarea size={"sm"} />
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
                        <Input size={"sm"} />
                      </Box>
                      <Box>
                        <Text size={"md"} fontSize="16">
                          Contact:
                        </Text>
                      </Box>
                      <Box mb={2}>
                        <Input size={"sm"} />
                      </Box>
                      <Box>
                        <Text size={"md"} fontSize="16">
                          Email:
                        </Text>
                      </Box>
                      <Box mb={2}>
                        <Input size={"sm"} />
                      </Box>

                      <Box>
                        <Text size={"sm"} fontSize="16">
                          Password :
                        </Text>
                      </Box>
                      <Box>
                        <Input placeholder="Enter New Password  " size="sm" />
                      </Box>
                      <Box>
                        <Text size={"sm"} fontSize="16">
                          ReEnter Password :
                        </Text>
                      </Box>
                      <Box>
                        <Input placeholder="ReEnter Password  " size="sm" />
                      </Box>
                      <Box mb={2}>
                        <Stack direction={"row"} mt={5}>
                          <Button
                            variant="solid"
                            colorScheme={"facebook"}
                            size="md"
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
