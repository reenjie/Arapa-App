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
} from "@chakra-ui/react";
import { SearchIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import logo from "../images/home.jpg";
import { Link } from "react-router-dom";
function App() {
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
                <Image
                  id="logo"
                  src="https://www.logolynx.com/images/logolynx/85/855e3a35356cbeee726ad8539e92d180.png"
                  alt="Logo"
                />
                <Text fontSize="5xl" id="titlefont">
                  Arapa - App
                </Text>
              </Stack>
            </Box>
          </Center>
          <Container>
            <Stack direction={"rows"} spacing="0" mt="-60">
              <Input
                placeholder="Search for Schools, Location"
                size="lg"
                backgroundColor={"white"}
                mr={2}
                autoFocus
              />

              <Select
                placeholder="Select option"
                backgroundColor={"white"}
                borderRadius={0}
                width="240px"
                borderWidth={2}
              >
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
              <IconButton
                borderRadius={0}
                colorScheme="red"
                aria-label="Search database"
                icon={<SearchIcon />}
              />
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
          </Container>
        </Box>
      </div>
    </>
  );
}

export default App;
