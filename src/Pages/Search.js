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
import Map from "./admin/Map";
import Picture from "./layouts/Picture";
import SchoolLogo from "./layouts/SchoolLogo";
import arapalogo from "../images/arapalogo.png";
function Search(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState(location.state.data);
  const [longitude, setLongitude] = useState();
  const [marker, setMarker] = useState(true);
  const [latitude, setLatitude] = useState();
  const [markerdrag, setMarkerdrag] = useState(false);

  return (
    <>
      <div className="header">
        <Box float={"left"} p="2">
          <Flex>
            <Image
              style={{ width: "40px" }}
              borderRadius="full"
              src={arapalogo}
              alt="Dan Abramov"
              border="4px solid #0a1a4d"
            />

            <Text fontSize="2xl" marginLeft={1}>
              Arapa
            </Text>
          </Flex>

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
        {console.log(data.length)}
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
                          <SchoolLogo logo={row.data.contents.Logo} />
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
                        {row.data.contents.Facebook ? (
                          <Flex mb={2}>
                            <Text>Facebook : </Text>
                            <Spacer />
                            <Text fontWeight={"bold"}>
                              {row.data.contents.Facebook}
                            </Text>
                          </Flex>
                        ) : (
                          ""
                        )}

                        {row.data.contents.Instagram ? (
                          <Flex mb={2}>
                            <Text>Instagram : </Text>
                            <Spacer />
                            <Text fontWeight={"bold"}>
                              {row.data.contents.Instagram}
                            </Text>
                          </Flex>
                        ) : (
                          ""
                        )}

                        {row.data.contents.Website ? (
                          <Flex mb={2}>
                            <Text>Website : </Text>
                            <Spacer />
                            <Text fontWeight={"bold"}>
                              {row.data.contents.Website}
                            </Text>
                          </Flex>
                        ) : (
                          ""
                        )}

                        {row.data.contents.OtherSites ? (
                          <Flex mb={2}>
                            <Text>Other Sites : </Text>
                            <Spacer />
                            <Text fontWeight={"bold"}>
                              {row.data.contents.OtherSites}
                            </Text>
                          </Flex>
                        ) : (
                          ""
                        )}

                        {row.data.contents.ContactNo ? (
                          <Flex mb={2}>
                            <Text>Other Contact No: </Text>
                            <Spacer />
                            <Text fontWeight={"bold"}>
                              {row.data.contents.ContactNo}
                            </Text>
                          </Flex>
                        ) : (
                          ""
                        )}
                        <Box>
                          <Stack>
                            <Text>Description : </Text>
                            <Box p={5} bg={"blue.100"}>
                              <Text>{row.data.contents.Description}</Text>
                            </Box>

                            <Text>Requirements : </Text>
                            <Box p={5} bg={"blue.100"}>
                              <Text>{row.data.contents.requirements && row.data.contents.requirements}</Text>
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
                        <Picture
                          Files={row.data.contents.Files}
                          IDpicture={row.data.contents.IdPicture}
                        />
                      </Box>
                    </Container>
                  </GridItem>
                  <GridItem colSpan={[12, 12, 12, 6]}>
                    <Box bg={"gray.600"} height={550}>
                      <Map
                        viewOnly={true}
                        longitude={row.data.contents.Map[0].Lng}
                        setLongitude={setLongitude}
                        latitude={row.data.contents.Map[0].Lat}
                        setLatitude={setLatitude}
                        // marker={marker}
                        // setMarker={setMarker}
                        // markerdrag={markerdrag}
                        // setMarkerdrag={setMarkerdrag}
                        readonly={true}
                      />
                    </Box>
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
