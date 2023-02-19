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
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import db from "../../firebase-config";
import { useEffect, useState } from "react";
import logo from "../../images/zcmc_logo.png";
import Signout from "../../Pages/auth/Signout";
import { Profilemodal } from "./profilemodal";
import { Manage, ChangePass } from "../../Pages/admin/Manage";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
export default function Zcmc_info(props) {
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [oldpass, setOldpass] = useState();
  const [newpass, setNewpass] = useState();
  const [repass, setRepass] = useState();
  const [defnm, setDefnm] = useState(false);
  const [notmatch, setNotmatch] = useState(false);

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [contact, setContact] = useState();

  useEffect(() => {
    if (localStorage.getItem("Userauth") == null) {
      nav("/login");
    }
  }, []);

  const user = localStorage.getItem("Userauth")
    ? JSON.parse(localStorage.getItem("Userauth")).data
    : [];

  const SaveChanges = async () => {
    const id = localStorage.getItem("Userauth")
      ? JSON.parse(localStorage.getItem("Userauth")).id
      : null;
    const Users = doc(db, "Users", id);
    await updateDoc(Users, {
      Name: name,
      Email: email,
      Contact: contact,
    });

    const token = {
      id: id,
      data: {
        usertype: user.usertype,
        Name: name,
        Email: email,
        Contact: contact,
      },
    };
    localStorage.setItem("Userauth", JSON.stringify(token));
    swal("Changes Saved!", "", "success").then(() => {
      setOpen1(false);
    });
  };
  const SavePassword = async () => {
    if (user.Password == oldpass) {
      setDefnm(false);
      if (newpass == repass) {
        const id = localStorage.getItem("Userauth")
          ? JSON.parse(localStorage.getItem("Userauth")).id
          : null;
        const Users = doc(db, "Users", id);
        await updateDoc(Users, {
          Password: newpass,
        });

        swal(
          "Password Changed!",
          "Your password has changed successfully! You will be ask to relogin again!",
          "success"
        ).then(() => {
          Signout();
        });
      } else {
        setNotmatch(true);
      }
    } else {
      setDefnm(true);
    }
  };
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
      <Center mt="10">
        <Avatar size="xl" name="Arapa Admin" src="" mt={2} mb={2} />
        <Flex mb={5} mt={2}>
          <Box ml="3">
            <Text fontWeight="bold" color={"blackAlpha.700"}>
              Arapa Admin
            </Text>
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
            <Profilemodal
              modalTitle={"Manage Account"}
              modalcontent={
                <Manage
                  userdata={user}
                  name={name}
                  setName={setName}
                  email={email}
                  setEmail={setEmail}
                  contact={contact}
                  setContact={setContact}
                />
              }
              savechanges={SaveChanges}
              open={open1}
              setOpen={setOpen1}
              Btnopen={
                <>
                  {" "}
                  <div
                    onClick={() => {
                      setOpen1(true);
                    }}
                    style={{ display: "flex" }}
                  >
                    <i className="fas fa-user-circle"></i>
                    <Text fontSize="sm" ml={2}>
                      Manage Account
                    </Text>
                  </div>
                </>
              }
            />
          </MenuItem>
          <MenuItem>
            <Profilemodal
              modalTitle={"Change Password"}
              modalcontent={
                <ChangePass
                  setNotmatch={setNotmatch}
                  notmatch={notmatch}
                  defnm={defnm}
                  setDefnm={setDefnm}
                  oldpass={oldpass}
                  setOldpass={setOldpass}
                  newpass={newpass}
                  setNewpass={setNewpass}
                  repass={repass}
                  setRepass={setRepass}
                />
              }
              savechanges={SavePassword}
              open={open}
              setOpen={setOpen}
              Btnopen={
                <>
                  {" "}
                  <div
                    onClick={() => {
                      setOpen(true);
                    }}
                    style={{ display: "flex" }}
                  >
                    <i className="fas fa-lock"></i>
                    <Text fontSize="sm" ml={2}>
                      Change Password
                    </Text>
                  </div>
                </>
              }
            />
          </MenuItem>
          <MenuItem onClick={Signout}>
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
