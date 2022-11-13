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
  Select,
} from "@chakra-ui/react";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import db from "../../firebase-config";
import swal from "sweetalert";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Map from "./Map";

function RenderPage({ ID, data, type, readonly, users }) {
  const [longitude, setLongitude] = useState(data.Map[0].Lng);
  const [marker, setMarker] = useState(true);
  const [latitude, setLatitude] = useState(data.Map[0].Lat);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const School = doc(db, "Schools", ID);
    const User = doc(db, "Users", users[0].id);

    const Map = [
      {
        Lat: latitude,
        Lng: longitude,
      },
    ];

    await updateDoc(School, {
      Email: e.target.schoolemail.value,
      Address: e.target.schooladdress.value,
      Contact: e.target.usercontact.value,
      Description: e.target.schooldescription.value,
      Name: e.target.schoolname.value,
      Weblink: e.target.schoolwebsite.value,
      Map: Map,
      SchoolType: e.target.schooltype.value,
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
                    <Map
                      viewOnly={readonly ? true : false}
                      longitude={longitude}
                      setLongitude={setLongitude}
                      latitude={latitude}
                      setLatitude={setLatitude}
                      marker={marker}
                      setMarker={setMarker}
                      readonly={readonly}
                    />
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
                          readOnly={readonly ? true : false}
                          cursor={readonly ? "default" : "text"}
                        />
                      </Box>

                      <Box p={5}>
                        <Text fontWeight={"bold"}>Courses Offered</Text>
                        <ul>
                          {data.Courses
                            ? data.Courses.map((row) => {
                                return (
                                  <>
                                    <li>{row.value}</li>
                                  </>
                                );
                              })
                            : null}
                        </ul>
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
                    readOnly={readonly ? true : false}
                    cursor={readonly ? "default" : "text"}
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
                    readOnly={readonly ? true : false}
                    cursor={readonly ? "default" : "text"}
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
                    readOnly={readonly ? true : false}
                    cursor={readonly ? "default" : "text"}
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
                    readOnly={readonly ? true : false}
                    cursor={readonly ? "default" : "text"}
                  />
                </Box>

                <Box mb={2}>
                  <Select
                    placeholder="-- Select Type --"
                    backgroundColor={"white"}
                    borderRadius={0}
                    borderWidth={2}
                    required
                    name="schooltype"
                    defaultValue={data.SchoolType}
                    disabled={readonly ? true : false}
                    cursor={readonly ? "default" : "text"}
                  >
                    <option value="Primary">Primary</option>
                    <option value="High School">High School</option>
                    <option value="Senior High School">
                      Senior High School
                    </option>
                    <option value="College">College</option>
                  </Select>
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
                    readOnly={readonly ? true : false}
                    cursor={readonly ? "default" : "text"}
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
                    readOnly={readonly ? true : false}
                    cursor={readonly ? "default" : "text"}
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
                  {type == "viewonly" ? null : (
                    <Button
                      size={"sm"}
                      variant={"solid"}
                      colorScheme="teal"
                      type="submit"
                    >
                      Save
                    </Button>
                  )}

                  <Button
                    size={"sm"}
                    ml={2}
                    variant={"solid"}
                    colorScheme="teal"
                    type="button"
                    onClick={() => {
                      navigate(-1);
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
  const location = useLocation();
  const [ID, setID] = useState(location.state.id);
  const [data, setData] = useState(location.state.data);

  const [pendingdata, setpendingData] = useState([]);
  const [type, setType] = useState(location.state.type);
  const [readonly, setReadonly] = useState(location.state.readonly);
  const [fetch, setFetch] = useState(false);
  const [users, setUsers] = useState(
    location.state.user.filter((x) => x.data.SchooliD == ID)
  );
  const display = async () => {
    const firestoreData = await getDocs(
      query(collection(db, "Schools"), where("status", "==", 0))
    );
    setpendingData(firestoreData);
  };
  useEffect(() => {
    display();
    setFetch(false);
  }, [fetch]);
  return (
    <>
      <AdminLayout
        Sidebar_elements={
          <Sidebar selected={props.selected} pending={pendingdata} />
        }
        Page_Contents={
          <RenderPage
            ID={ID}
            data={data}
            type={type}
            readonly={readonly}
            users={users}
            setFetch={setFetch}
          />
        }
        Page_title="School-Info"
      />
    </>
  );
}

export default SchoolInfo;
