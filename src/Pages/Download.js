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
} from "@chakra-ui/react";
import { SearchIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import logo from "../images/home.jpg";
import { Link } from "react-router-dom";
function Download(props) {
  return (
    <>
      {" "}
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
          <Link to="/">
            {" "}
            <Button
              color={"teal.500"}
              size={"sm"}
              fontWeight="normal"
              borderRadius={0}
            >
              <i className="fas fa-home"></i>
            </Button>
          </Link>
        </Box>
      </div>
      <div className="Body"></div>
      <div className="MainBody">
        <Box position={"relative"}>
          <Container bg={"whiteAlpha.500"} shadow="md" p={4}>
            <Heading color={"blackAlpha.600"}>Download Arapa-App</Heading>
            <Text fontSize="20px" color="tomato">
              Android : Supported Version :
              <br />
            </Text>
            <Box textAlign={"right"}>
              <Link to="">
                {" "}
                <Text variant={"link"} mt={10} fontSize="17px" color="blue.400">
                  <i className="fas fa-download"></i> Android [APK]
                </Text>
              </Link>
            </Box>
          </Container>
        </Box>
      </div>
    </>
  );
}

export default Download;
