import React, { useState } from "react";
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
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import logo from '../../images/20944480.jpg';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

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
  }

  function handleSubmit() {}
return(
  <>
 <Stack >
  <Container>
  <Box  id="login_box" >
  <Center h="100vh" color="white"  ml='3'>
        <Box id="login" shadow={'xl'} borderWidth='2px'>
          <form>
            <FormControl>
              <Stack>
                <Center mt={4} >
                 
                  <Text ml={4} fontSize="4xl" >
                <Link to='/'>  <Button variant={'link'} fontSize='4xl'>Arapa App</Button>  </Link>
                    <Badge ml={2} variant='outline' colorScheme='green'>
                  Sign in
                  </Badge>
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
