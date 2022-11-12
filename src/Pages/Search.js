import React, { useState } from "react";
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
  Grid,
  GridItem,
  InputGroup,
  InputRightElement,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import { SearchIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import logo from "../images/home.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import db from "../firebase-config";
import notfound from "../images/notfound.svg";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
function Search(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState(location.state.data);

  console.log(data);
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
        <Box float={"right"} p="2"></Box>
      </div>

      <div className="searchmain"></div>
      <div className="searchBody">
        <Container maxW={"container.xll"} mb={2}>
          <Button
            variant={"solid"}
            size={"sm"}
            colorScheme={"red"}
            fontWeight={"normal"}
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </Button>
        </Container>
        {data.length >= 1 ? (
          data.map((row) => {
            return (
              <>
                <Grid templateColumns="repeat(12, 1fr)" mb={20} gap={0}>
                  <GridItem colSpan={[12, 12, 12, 6]}>
                    <Container maxW={"container.lg"}>
                      <Box
                        bg={"whiteAlpha.700"}
                        shadow={"md"}
                        borderRadius={5}
                        p={5}
                      >
                        <Stack direction={"row"}>
                          <Image
                            boxSize="100px"
                            objectFit="cover"
                            src="https://bit.ly/dan-abramov"
                            alt="Dan Abramov"
                          />

                          <Heading size={"md"} marginLeft={5}>
                            {row.data.contents.Name}
                            <br />
                            <span
                              style={{
                                fontSize: "15px",
                                fontWeight: "normal",
                              }}
                            >
                              {row.data.contents.SchoolType}
                            </span>
                            <br />
                          </Heading>
                        </Stack>
                        <Button
                          mt={2}
                          colorScheme={"blue"}
                          w={"100%"}
                          variant={"solid"}
                          onClick={() => {
                            // row.data.contents.Weblink
                            window.open(
                              `https:\\${row.data.contents.Weblink}`,
                              "_blank"
                            );
                          }}
                        >
                          Enroll Now
                        </Button>
                      </Box>

                      <Box
                        bg={"whiteAlpha.700"}
                        shadow={"md"}
                        mt={2}
                        borderRadius={5}
                        p={5}
                      >
                        <Flex mb={2}>
                          <Text>Name : </Text>
                          <Spacer />
                          <Text fontWeight={"bold"}>
                            {row.data.contents.Name}
                          </Text>
                        </Flex>
                        <Flex mb={2}>
                          <Text>Email : </Text>
                          <Spacer />
                          <Text fontWeight={"bold"}>
                            {" "}
                            {row.data.contents.Email}
                          </Text>
                        </Flex>
                        <Flex mb={2}>
                          <Text>Contact : </Text>
                          <Spacer />
                          <Text fontWeight={"bold"}>
                            {row.data.contents.Contact}
                          </Text>
                        </Flex>
                        <Flex mb={2}>
                          <Text>Address : </Text>
                          <Spacer />
                          <Text fontWeight={"bold"}>
                            {row.data.contents.Address}
                          </Text>
                        </Flex>

                        <Flex mb={2}>
                          <Text>WebSite Link : </Text>
                          <Spacer />
                          <Text fontWeight={"bold"}>
                            {row.data.contents.Weblink}
                          </Text>
                        </Flex>

                        <Box>
                          <Stack>
                            <Text>Description : </Text>
                            <Box p={5} bg={"blue.100"}>
                              <Text>{row.data.contents.Description}</Text>
                            </Box>

                            <Box>
                              <Text>Courses Offer : </Text>
                              <Box p={5}>
                                <ul>
                                  {row.data.contents.Courses.map((x) => {
                                    return (
                                      <>
                                        <li>{x.value}</li>
                                      </>
                                    );
                                  })}
                                </ul>
                              </Box>
                            </Box>
                          </Stack>
                        </Box>
                      </Box>
                    </Container>
                  </GridItem>
                  <GridItem colSpan={[12, 12, 12, 6]}>
                    <Box bg={"gray.600"} p={5}></Box>
                  </GridItem>
                </Grid>
              </>
            );
          })
        ) : (
          <>
            <Center>
              <Stack>
                <Image src={notfound} alt="Not Found" width={450} />
                <Center>
                  <Text fontWeight={"bold"}>
                    No School Found
                    <br />
                    Searchkey :{" "}
                    <span style={{ color: "Red" }}>
                      {location.state.searchkey}
                    </span>
                    <br />
                    Search Type :{" "}
                    <span style={{ color: "Red" }}>
                      {location.state.searchType}
                    </span>
                  </Text>
                </Center>
              </Stack>
            </Center>
          </>
        )}
      </div>
    </>
  );
}

export default Search;
