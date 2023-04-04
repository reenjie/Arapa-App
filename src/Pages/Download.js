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
  Flex,
} from "@chakra-ui/react";
import { SearchIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import logo from "../images/home.jpg";
import { Link } from "react-router-dom";
import arapalogo from "../images/arapalogo.png";
function Download(props) {
  const fileURl = 'https://drive.google.com/file/d/1XGRQ739TtU8d2mccHKwyWi46XDTkb6B5/view?usp=share_link';
  return (
    <>
      {" "}
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
              <a href={fileURl} download target="_blank">
                {" "}
                <Text variant={"link"} mt={10} fontSize="17px" color="blue.400">
                  <i className="fas fa-download"></i> Android [APK]
                </Text>
              </a>
            </Box>
          </Container>
        </Box>
      </div>
    </>
  );
}

export default Download;
