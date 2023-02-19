import React, { useState, useEffect } from "react";
import "../../css/App.css";
import {
  Box,
  Container,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Center,
  Button,
  Heading,
  InputGroup,
  InputRightElement,
  Avatar,
  Stack,
  Text,
  SimpleGrid,
  Image,
  Badge,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/20944480.jpg";
import db from "../../firebase-config";
import { useToast } from "@chakra-ui/react";
import RedirectifAuth from "./RedirectifAuth";
import { collection, query, where, getDocs } from "firebase/firestore";
import swal from "sweetalert";
function Login() {
  const toast = useToast();
  const redirect = RedirectifAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = React.useState(false);
  const [error, setError] = useState(false);
  const handleClick = () => setShow(!show);
  useEffect(() => {}, [redirect]);
  function handleInputChange(e) {
    const value = e.target.value;
    const type = e.target.name;

    switch (type) {
      case "email":
        setEmail(value);
        break;

      case "password":
        setPassword(value);
        break;
    }

    setError(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const q = query(
      collection(db, "Users"),
      where("Email", "==", email),
      where("Password", "==", password)
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.size >= 1) {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        const token = { id: doc.id, data: doc.data() };

        if (doc.data().status == 1) {
          //user Blocked
          swal("Account Blocked!", "Your Account has been Blocked", "error");
        } else {
          localStorage.setItem("Userauth", JSON.stringify(token));
          if (doc.data().usertype == 1) {
            navigate("/Admin/Dashboard");
          } else {
            navigate("/Account/Info");
          }
        }
      });
    } else {
      setPassword("");
      setError(true);
    }
  };
  return (
    <>
      <Stack>
        <Container>
          <Box id="login_box">
            <Center h="100vh" color="white" ml="3">
              <Box id="login" shadow={"xl"} borderWidth="2px">
                <form method="post" onSubmit={handleSubmit}>
                  <FormControl isInvalid={error ? true : false}>
                    <Stack>
                      <Center mt={4}>
                        <Text ml={4} fontSize="4xl">
                          <Link to="/">
                            {" "}
                            <Button variant={"link"} fontSize="4xl">
                              Arapa App
                            </Button>{" "}
                          </Link>
                          <Badge ml={2} variant="outline" colorScheme="green">
                            Sign in
                          </Badge>
                        </Text>
                      </Center>
                    </Stack>

                    {error ? (
                      <>
                        <Alert status="error">
                          <AlertIcon />
                          Entered Credentials does not match our Records.
                        </Alert>
                      </>
                    ) : (
                      ""
                    )}

                    <FormLabel mt={"20px"}>Email</FormLabel>
                    <Input
                      type="email"
                      borderRadius={"3px"}
                      required
                      name="email"
                      placeholder="Enter Email"
                      onChange={handleInputChange}
                      autoFocus
                      value={email}
                    />

                    <FormLabel mt={5}>Password</FormLabel>
                    <InputGroup size="md">
                      <Input
                        pr="4.5rem"
                        type={show ? "text" : "password"}
                        placeholder="Enter password"
                        name="password"
                        required
                        onChange={handleInputChange}
                        id="password"
                        value={password}
                      />
                      <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                          {show ? "Hide" : "Show"}
                        </Button>
                      </InputRightElement>
                    </InputGroup>

                    <Button
                      type="submit"
                      colorScheme="blue"
                      w="100%"
                      mt={5}
                      mb={"10px"}
                    >
                      Log in
                    </Button>

                    <FormHelperText>
                      No Account?
                      <Link to={"../register"}>
                        {" "}
                        <Button ml={2} colorScheme="teal" variant="link">
                          Register here
                        </Button>
                      </Link>
                    </FormHelperText>
                  </FormControl>
                </form>
              </Box>
            </Center>
          </Box>
        </Container>
      </Stack>
    </>
  );
  /*   return (
    <Container id="login_container" maxW="md" mt={340} color="#262626">
      <Center h="100px" color="white">
        <Box id="login">
          <form>
            <FormControl>
              <Stack>
                <Center mt={4}>
                  <Avatar w={"100px"} h={"100px"} src="" />
                  <Text ml={4} fontSize="4xl">
                    J.O Request
                    <Text fontSize="sm">Sign In</Text>
                  </Text>
                </Center>
              </Stack>

              <FormLabel mt={"20px"}>Email</FormLabel>
              <Input
                type="email"
                borderRadius={"3px"}
                required
                name="email"
                placeholder="Enter Email"
                onChange={handleInputChange}
                autoFocus
              />

              <FormLabel mt={5}>Password</FormLabel>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Enter password"
                  name="password"
                  required
                  onChange={handleInputChange}
                  id="password"
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>

              <Button
                type="submit"
                colorScheme="blue"
                w="100%"
                mt={5}
                mb={"10px"}
              >
                Log in
              </Button>

          

              <FormHelperText>
                No Account?
                <Link to={"../register"}>
                  {" "}
                  <Button ml={2} colorScheme="teal" variant="link">
                    Register here
                  </Button>
                </Link>
              </FormHelperText>
            </FormControl>
          </form>
        </Box>
      </Center>
    </Container>
  ); */
}

export default Login;
