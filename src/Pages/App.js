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
  InputGroup,
  InputRightElement,
  Grid,
  Flex,
  GridItem,
} from "@chakra-ui/react";
import { SearchIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import logo from "../images/home.jpg";
import { Link, useNavigate } from "react-router-dom";
import db from "../firebase-config";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

const App = () => {
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();

    const school = e.target.school.value;
    const stype = e.target.schooltype.value;

    const data = [];
    const firestorePData = await getDocs(collection(db, "Schools"));

    firestorePData.forEach((doc) => {
      data.push({
        data: {
          id: doc.id,
          contents: doc.data(),
        },
      });
    });

    const fetchResults = data.filter(
      (x) =>
        x.data.contents.Name.toLowerCase().includes(school.toLowerCase()) &&
        x.data.contents.SchoolType.toLowerCase().includes(stype.toLowerCase())
    );

    if (fetchResults.length >= 1) {
      navigate("Searchkey/Results", {
        state: {
          data: fetchResults,
          searchkey: school,
        },
      });
    } else {
      navigate("Searchkey/Results", {
        state: {
          data: [],
          searchkey: school,
          searchType: stype,
        },
      });
    }
  };

  return (
    <>
      <div className="header">
        <Box float={"left"} p="2">
          <Flex>
            <Image
              style={{ width: "40px" }}
              borderRadius="full"
              src=" https://th.bing.com/th/id/OIP.c-bqtmQi_cnQ4u78eArURAHaFj?pid=ImgDet&rs=1"
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
        <Box float={"right"} p="2">
          <Link to="/DownloadApp">
            {" "}
            <Button size={"sm"} fontWeight="normal" borderRadius={0}>
              <i
                className="fas fa-download"
                style={{
                  backgroundColor: "maroon",
                  padding: "5px",
                  color: "white",
                  borderRadius: "4px",
                  marginRight: "5px",
                }}
              ></i>{" "}
              Download App
            </Button>
          </Link>
        </Box>
      </div>

      <div className="Body"></div>
      <div className="MainBody">
        <Box position={"relative"}>
          <Center>
            <Box boxSize="sm">
              <Stack direction={"row"}>
                <Box>
                  <Image
                    id="logo"
                    src="https://www.logolynx.com/images/logolynx/85/855e3a35356cbeee726ad8539e92d180.png"
                    alt="Logo"
                  />
                </Box>
                <Text fontSize="5xl" id="titlefont">
                  Arapa - App
                </Text>
              </Stack>
              <Stack>
                <form onSubmit={handleSearch}>
                  <InputGroup size="md" mt={4}>
                    <Input
                      pr="4.5rem"
                      type={"text"}
                      bg={"whiteAlpha.700"}
                      placeholder="Search for Schools"
                      required
                      name="school"
                    />
                    <InputRightElement width="5rem">
                      <Button
                        h="1.75rem"
                        size="sm"
                        variant={"solid"}
                        colorScheme={"green"}
                        mr={2}
                        type="submit"
                      >
                        Search <SearchIcon style={{ marginLeft: "5px" }} />
                      </Button>
                    </InputRightElement>
                  </InputGroup>

                  <Select
                    placeholder="-- Select Type --"
                    bg={"whiteAlpha.400"}
                    color={"blue.600"}
                    textAlign={"center"}
                    borderRadius={3}
                    borderWidth={1}
                    required
                    size={"sm"}
                    name="schooltype"
                    mt={2}
                  >
                    <option value="Primary">Primary</option>
                    <option value="High School">High School</option>
                    <option value="Senior High School">
                      Senior High School
                    </option>
                    <option value="College">College</option>
                  </Select>
                </form>
              </Stack>

              <Center>
                <Box mt="10">
                  <Link to="/login">
                    {" "}
                    <Button variant={"link"} color="teal.500">
                      LOGIN <ExternalLinkIcon ml={1} />
                    </Button>
                  </Link>
                </Box>
              </Center>
            </Box>
          </Center>
          <Container></Container>
        </Box>
      </div>
    </>
  );
};

export default App;
