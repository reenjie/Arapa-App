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
function Search(props) {
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

      <div className="Body"></div>
      <div className="MainBody">
        <Box position={"relative"}></Box>
      </div>
    </>
  );
}

export default Search;
