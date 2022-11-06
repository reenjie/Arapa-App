import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/layouts/admin_layout";
import Sidebar from "./Sidebar";
import {
  Heading,
  Container,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
  Badge,
  Button,
  Stack,
  SimpleGrid,
  Text,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import db from "../../firebase-config";
import swal from "sweetalert";
import { Link, useLocation, useNavigate } from "react-router-dom";

function RenderPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [ID, setID] = useState(location.state.id);
  const [data, setData] = useState(location.state.data);

  const [users, setUsers] = useState(
    location.state.user.filter((x) => x.data.SchooliD == ID)
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const School = doc(db, "Schools", ID);
    const User = doc(db, "Users", users[0].id);

    await updateDoc(School, {
      Email: e.target.schoolemail.value,
      Address: e.target.schooladdress.value,
      Contact: e.target.usercontact.value,
      Description: e.target.schooldescription.value,
      Name: e.target.schoolname.value,
      Weblink: e.target.schoolwebsite.value,
    });

    await updateDoc(User, {
      Contact: e.target.usercontact.value,
      Name: e.target.username.value,
    }).then((e) => {
      swal(
        "Updated Successfully",
        "Data has been updated Successfully!",
        "success"
      ).then(() => {
        navigate("/Admin/Schools");
      });
    });
  };

  return (
    <div>
      <Container mt={10} maxW="2xxl">
        <form method="post" onSubmit={handleSubmit}>
          <Box shadow={"md"} p="10" bg="white" mt={10} mb={20}>
            <SimpleGrid minChildWidth="300px" columns={2} spacing="10px">
              <Box>
                <Stack direction={"column"}>
                  <Box bg={"blackAlpha.500"} w="100%" height="300px">
                    Map Heere
                  </Box>
                  <Box w="100%">
                    <Stack direction={"column"} width="100%" columns={2}>
                      <Box>
                        <Text size={"md"} fontSize="16">
                          Email Address :
                        </Text>
                      </Box>
                      <Box>
                        <Input
                          required
                          placeholder=""
                          defaultValue={data.Email}
                          size="sm"
                          w={"100%"}
                          name="schoolemail"
                        />
                      </Box>
                    </Stack>

                    <Box mt={5}>
                      <Text color={"teal.600"} mb={10} fontSize="16">
                        School IDs (For Verification)
                      </Text>
                      <Stack direction={"row"} spacing={4}>
                        <Box bg="tomato" height={"80px"} p="10"></Box>
                        <Box bg="tomato" height={"80px"} p="10"></Box>
                      </Stack>
                    </Box>
                  </Box>
                </Stack>
              </Box>
              <Box>
                <Box>
                  <Text size={"md"} fontSize="16">
                    School Name :
                  </Text>
                </Box>
                <Box mb={2}>
                  <Input
                    placeholder=""
                    defaultValue={data.Name}
                    size="sm"
                    w={"100%"}
                    required
                    name="schoolname"
                  />
                </Box>

                <Box>
                  <Text size={"md"} fontSize="16">
                    School Address :
                  </Text>
                </Box>
                <Box mb={2}>
                  <Input
                    placeholder=""
                    defaultValue={data.Address}
                    size="sm"
                    w={"100%"}
                    required
                    name="schooladdress"
                  />
                </Box>
                <Box>
                  <Text size={"md"} fontSize="16">
                    Website :
                  </Text>
                </Box>
                <Box mb={2}>
                  <Input
                    placeholder=""
                    defaultValue={data.Weblink}
                    size="sm"
                    w={"100%"}
                    required
                    name="schoolwebsite"
                  />
                </Box>
                <Box>
                  <Text size={"md"} fontSize="16">
                    Description :
                  </Text>
                </Box>
                <Box mb={2}>
                  <Textarea
                    placeholder="Type description here.."
                    resize={"none"}
                    defaultValue={data.Description}
                    required
                    name="schooldescription"
                  />
                </Box>

                <Box>
                  <Text size={"md"} fontSize="16">
                    User Full name :
                  </Text>
                </Box>
                <Box mb={2}>
                  <Input
                    placeholder=""
                    defaultValue={users[0].data.Name}
                    size="sm"
                    w={"100%"}
                    required
                    name="username"
                  />
                </Box>

                <Box>
                  <Text size={"md"} fontSize="16">
                    Contact :
                  </Text>
                </Box>
                <Box mb={2}>
                  <Input
                    placeholder=""
                    defaultValue={users[0].data.Contact}
                    size="sm"
                    w={"100%"}
                    required
                    name="usercontact"
                  />
                </Box>

                <Box mt={5}>
                  <Text color={"teal.600"} mb={10} fontSize="16">
                    School Pictures 2-3
                  </Text>
                  <Stack direction={"row"} spacing={4}>
                    <Box bg="tomato" height={"80px"} p="10"></Box>
                    <Box bg="tomato" height={"80px"} p="10"></Box>
                    <Box bg="tomato" height={"80px"} p="10"></Box>
                  </Stack>
                </Box>

                <Box mt="5" float={"right"}>
                  <Button
                    size={"sm"}
                    variant={"solid"}
                    colorScheme="teal"
                    type="submit"
                  >
                    Save
                  </Button>
                  <Button
                    size={"sm"}
                    ml={2}
                    variant={"solid"}
                    colorScheme="teal"
                    type="button"
                    onClick={() => {
                      navigate("/Admin/Schools");
                    }}
                  >
                    Back
                  </Button>
                </Box>
              </Box>
            </SimpleGrid>
          </Box>
        </form>
      </Container>
    </div>
  );
}
function SchoolInfo(props) {
  return (
    <>
      <AdminLayout
        Sidebar_elements={<Sidebar selected={props.selected} />}
        Page_Contents={<RenderPage />}
        Page_title="School-Info"
      />
    </>
  );
}

export default SchoolInfo;
