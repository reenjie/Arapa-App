import {
  Stack,
  Flex,
  Center,
  Text,
  Image,
  Avatar,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import logo from "../../images/zcmc_logo.png";
export default function Zcmc_info(props) {
  const Info = () => {
    switch (props.usertype) {
      case "admin":
        return (
          <Text fontSize="xs" id="usertype">
            Administrator
          </Text>
        );
        break;
      case "assessor":
        return (
          <>
            <Text fontSize="xs" id="usertype">
              Assessor
            </Text>
            <Text fontSize="xs" color={"blackAlpha.700"}>
              Services
            </Text>
            <Text fontSize="xs" color={"green.500"}>
              Mechanical Works
            </Text>
          </>
        );
        break;
      case "requestor":
        return (
          <>
            <Text fontSize="xs" id="usertype">
              Job Requestor
            </Text>
            <Text fontSize="xs" color={"blue.500"}>
              WareHouse
            </Text>
          </>
        );
        break;
    }
  };

  return (
    <Stack mb={3}>
     
      <Center mt='10'>
        <Avatar
          size="xl"
          name="Arapa Admin"
          src=""
          mt={2}
          mb={2}
        />
        <Flex mb={5} mt={2}>
          <Box ml="3">
            <Text fontWeight="bold" color={"blackAlpha.700"}>
            Arapa Admin
            </Text>
            <Info />
          </Box>
        </Flex>
      </Center>

      <Menu>
        <MenuButton
          textAlign={"right"}
          fontSize={13}
          variant="link"
          as={Button}
          paddingRight="15px"
        >
          PROFILE
        </MenuButton>
        <MenuList
          bg={"gray.300"}
          color="grey"
          fontSize={14}
          letterSpacing="10px"
          id="menulist"
        >
          <MenuItem>
            <i className="fas fa-user-circle"></i>
            <Text fontSize="sm" ml={2}>
              Manage Account
            </Text>
          </MenuItem>
          <MenuItem>
            <i className="fas fa-lock"></i>
            <Text fontSize="sm" ml={2}>
              Change Password
            </Text>
          </MenuItem>
          <MenuItem>
            <i className="fas fa-door-open"></i>
            <Text fontSize="sm" ml={2}>
              Logout
            </Text>
          </MenuItem>
        </MenuList>
      </Menu>
    </Stack>
  );
}
