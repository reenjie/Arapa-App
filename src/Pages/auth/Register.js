import React, { useState, useRef, useEffect } from "react";
import "../../css/App.css";
import { storage } from "../../firebase-config";
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
  Textarea,
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { AttachmentIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import db from "../../firebase-config";
import { v4 as uuid } from "uuid";
import swal from "sweetalert";
import AddCourse from "./AddCourse";
import Map from "../admin/Map";
import { FiUpload } from "react-icons/fi";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function Register() {
  const fileRef = useRef();
  const logoref = useRef();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [coursesCount, setcoursesCount] = useState();
  const [longitude, setLongitude] = useState();
  const [marker, setMarker] = useState(false);
  const [latitude, setLatitude] = useState();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [validate, setValidate] = useState(false);
  const [fileLimit, setFileLimit] = useState(false);
  const [percent, setPercent] = useState(0);
  const toast = useToast();
  const [toupload, setToupload] = useState([]);
  const [load, setLoad] = useState(false);
  const [logo, setLogo] = useState("");
  const [lgpath, setPath] = useState();
  const [svlogo, setSvlogo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);

    const school_unique_id = uuid();
    const user_unique_id = uuid();

    const userpass = e.target.userpassword.value;
    const reenterpass = e.target.userreenterpassword.value;

    const Map = [
      {
        Lat: latitude,
        Lng: longitude,
      },
    ];
    if (!longitude && !latitude) {
      toast({
        title: "Map Location is Required!",
        description: "Please pin your location in the MAP",
        status: "error",

        duration: 9000,
        isClosable: true,
      });
      setLoad(false);
    } else if (userpass == reenterpass) {
      const upl = [];
      if (selectedFiles.length >= 1 && logo != "") {
        selectedFiles.map((f) => {
          const storageRef = ref(storage, f.name);
          const uploadTask = uploadBytesResumable(storageRef, f);

          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const percent = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );

              // update progress
              setPercent(percent);
            },
            (err) => console.log(err),
            () => {
              // download url
              getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                toupload.push({ url });
              });
            }
          );
        });

        setTimeout(async () => {
          const result = await setDoc(doc(db, "Schools", school_unique_id), {
            Logo: svlogo,
            Address: e.target.schooladdress.value,
            Contact: e.target.usercontact.value,
            Description: e.target.schooldescription.value,
            Email: e.target.schoolemail.value,
            Name: e.target.schoolname.value,
            Weblink: e.target.schoolwebsite.value,
            Map: Map,
            SchoolType: e.target.stype.value,
            Courses: courses,
            Files: toupload,
            mapID: "",
            status: 0,
          }).then(() => {
            //school_unique_id

            setDoc(doc(db, "Users", user_unique_id), {
              Contact: e.target.usercontact.value,
              Email: e.target.useremail.value,
              Name: e.target.username.value,
              Password: e.target.userpassword.value,
              SchooliD: school_unique_id,
              usertype: 0,
            }).then(() => {
              swal(
                "Registered Successfully",
                "You are Registered Successfully!",
                "success"
              ).then(() => {
                navigate("/Account/Info");
              });
            });
          });
          setToupload("");
          setLoad(false);
        }, 4000);
      } else {
        toast({
          title: "IMAGE REQUIRED!",
          description: "Upload atleast 1 or more Images. Maximum upload : 3",
          status: "error",

          duration: 9000,
          isClosable: true,
        });

        setLoad(false);
      }
    } else {
      swal(
        "Password Does not Match!",
        "Please make sure Reentered password match your first password",
        "error"
      ).then(() => {
        setLoad(false);
      });
    }
  };

  const Max_Count = 3;
  const handleFileUpload = (files) => {
    const uploaded = [...selectedFiles];
    let limitExceeded = false;

    files.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file);
        if (uploaded.length === Max_Count) setFileLimit(true);
        if (uploaded.length > Max_Count) {
          toast({
            title: `File Upload Maximum limit Reached`,
            description: `The number of photo can be save is ${Max_Count}`,
            status: "error",

            duration: 9000,
            isClosable: true,
          });

          setFileLimit(false);
          limitExceeded = true;

          return true;
        }
      }
    });

    if (!limitExceeded) {
      setSelectedFiles(uploaded);
      setValidate(false);
    }
  };

  const handleFileEvent = (e) => {
    setSelectedFiles([]);
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    handleFileUpload(chosenFiles);
  };

  const handleschoolLogo = (path) => {
    setPath(URL.createObjectURL(path.target.files[0]));
    setLogo(path.target.files[0]);

    const logostore = ref(storage, path.target.files[0].name);
    const uploadlogo = uploadBytesResumable(logostore, path.target.files[0]);

    uploadlogo.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadlogo.snapshot.ref).then((url) => {
          setSvlogo(url);
        });
      }
    );
  };

  return (
    <>
      <form method={"post"} onSubmit={handleSubmit}>
        <div className="header">
          <Box float={"left"} p="2">
            <Text fontSize="2xl">Arapa</Text>
          </Box>
          <Box float={"right"} p="2"></Box>
        </div>

        <div className="accbody">
          <Box>
            <SimpleGrid minChildWidth="300px" columns={2} spacing="10px">
              <Box>
                <Heading mb="5" color={"gray.500"} as="h3" size="lg">
                  Register
                </Heading>

                <Input
                  type={"file"}
                  ref={logoref}
                  accept="image/png, image/jpeg"
                  display={"none"}
                  onChange={handleschoolLogo}
                />
                {logo ? (
                  <>
                    <Center>
                      <Box>
                        <Image
                          borderRadius="full"
                          boxSize="150px"
                          src={lgpath}
                          alt=""
                        />
                        <br />
                        <Center>
                          <Button
                            size={"sm"}
                            onClick={() => {
                              setLogo("");
                            }}
                          >
                            change Logo
                          </Button>
                        </Center>
                      </Box>
                    </Center>
                  </>
                ) : (
                  <Box>
                    <Center>
                      <Box
                        p={30}
                        w={100}
                        h={100}
                        borderRadius={50}
                        bg={"gray.400"}
                        cursor={"pointer"}
                        onClick={() => {
                          logoref.current.click();
                        }}
                      >
                        <Center>
                          <FiUpload
                            style={{
                              fontSize: "25px",
                              color: "white",
                              textAlign: "center",
                            }}
                          />
                        </Center>
                      </Box>
                    </Center>
                    <Text textAlign={"center"}>School Logo</Text>
                  </Box>
                )}

                <Text
                  mt={4}
                  fontWeight={"bold"}
                  color={"gray.600"}
                  textAlign={"center"}
                >
                  School Information
                </Text>
                <Box>
                  <Text size={"md"} fontSize="16">
                    School Name :
                  </Text>
                </Box>
                <Box mb={2}>
                  <Input size={"sm"} name="schoolname" autoFocus required />
                </Box>

                <Box>
                  <Text size={"md"} fontSize="16">
                    School Address :
                  </Text>
                </Box>
                <Box mb={2}>
                  <Input size={"sm"} name="schooladdress" required />
                </Box>

                <Box>
                  <Text size={"md"} fontSize="16">
                    School Email :
                  </Text>
                </Box>
                <Box mb={2}>
                  <Input size={"sm"} name="schoolemail" required />
                </Box>
                <Box>
                  <Text size={"md"} fontSize="16">
                    Website :
                  </Text>
                </Box>
                <Box mb={2}>
                  <Input size={"sm"} name="schoolwebsite" required />
                </Box>
                <Box>
                  <Text size={"md"} fontSize="16">
                    Description :
                  </Text>
                </Box>
                <Box mb={2}>
                  <Textarea size={"sm"} name="schooldescription" required />
                </Box>

                <Box mb={2}>
                  <Select
                    placeholder="-- Select Type --"
                    backgroundColor={"white"}
                    borderRadius={0}
                    borderWidth={2}
                    required
                    name="stype"
                  >
                    <option value="Primary">Primary</option>
                    <option value="High School">High School</option>
                    <option value="Senior High School">
                      Senior High School
                    </option>
                    <option value="College">College</option>
                  </Select>
                </Box>

                <Box mb={2}>
                  <AddCourse
                    courses={courses}
                    coursesCount={coursesCount}
                    setcoursesCount={setcoursesCount}
                    setCourses={setCourses}
                  />
                </Box>

                <Box mt={5}>
                  <Input
                    type="file"
                    display={"none"}
                    accept="image/*"
                    onChange={handleFileEvent}
                    ref={fileRef}
                    multiple={true}
                  />
                  <Box
                    p={5}
                    bg={"green.50"}
                    cursor={"pointer"}
                    onClick={() => {
                      fileRef.current.click();
                      setSelectedFiles([]);
                    }}
                  >
                    <Center>
                      <FiUpload />
                      <Text fontSize={13}>
                        {selectedFiles.length >= 1
                          ? "Reselect Photo"
                          : "Upload Photo "}{" "}
                      </Text>
                    </Center>
                  </Box>
                  <Text color={"teal.600"} mb={10} fontSize="16">
                    School Pictures 2-3
                  </Text>

                  <Stack direction={"row"} spacing={4}>
                    {selectedFiles.map((file) => {
                      return (
                        <>
                          <Box
                            w={"50"}
                            bg="teal.100"
                            p="3"
                            borderRadius={10}
                            border={"1px solid gray"}
                          >
                            <AttachmentIcon /> {file.name}
                          </Box>
                        </>
                      );
                    })}
                    {/* 
                    <Box bg="tomato" height={"80px"} p="10"></Box>
                    <Box bg="tomato" height={"80px"} p="10"></Box> */}
                  </Stack>
                </Box>
              </Box>

              <Box>
                <Stack direction={"column"}>
                  <Box bg={"blackAlpha.500"} w="100%" height="300px">
                    <Map
                      viewOnly={false}
                      longitude={longitude}
                      setLongitude={setLongitude}
                      latitude={latitude}
                      setLatitude={setLatitude}
                      marker={marker}
                      setMarker={setMarker}
                    />
                  </Box>
                  <Box w="100%">
                    {/*   <Stack mt={2} direction={"row"} width="100%" columns={2}>
                    <Box width="25%">
                      <Text size={"md"} fontSize="16">
                        Password :
                      </Text>
                    </Box>
                    <Box width="80%">
                      <Input placeholder="" size="sm" w={"100%"} />
                    </Box>
                  </Stack> */}
                    <Text
                      mt={4}
                      fontWeight={"bold"}
                      color={"gray.600"}
                      textAlign={"center"}
                    >
                      User Information
                    </Text>

                    <Box mt={3}>
                      <Box>
                        <Text size={"sm"} fontSize="16">
                          Name:
                        </Text>
                      </Box>
                      <Box mb={2}>
                        <Input size={"sm"} name="username" required />
                      </Box>
                      <Box>
                        <Text size={"md"} fontSize="16">
                          Contact:
                        </Text>
                      </Box>
                      <Box mb={2}>
                        <Input size={"sm"} name="usercontact" required />
                      </Box>
                      <Box>
                        <Text size={"md"} fontSize="16">
                          Email:
                        </Text>
                      </Box>
                      <Box mb={2}>
                        <Input size={"sm"} name="useremail" required />
                      </Box>

                      <Box>
                        <Text size={"sm"} fontSize="16">
                          Password :
                        </Text>
                      </Box>
                      <Box>
                        <Input
                          placeholder="Enter New Password  "
                          size="sm"
                          required
                          name="userpassword"
                          type={"password"}
                        />
                      </Box>
                      <Box>
                        <Text size={"sm"} fontSize="16">
                          ReEnter Password :
                        </Text>
                      </Box>
                      <Box>
                        <Input
                          type={"password"}
                          placeholder="ReEnter Password  "
                          size="sm"
                          required
                          name="userreenterpassword"
                        />
                      </Box>
                      <Box mb={2}>
                        <Stack direction={"row"} mt={5}>
                          <Button
                            variant="solid"
                            colorScheme={"facebook"}
                            size="md"
                            type={"submit"}
                            isLoading={load}
                          >
                            Register
                          </Button>
                        </Stack>
                      </Box>
                    </Box>
                  </Box>
                </Stack>
              </Box>
            </SimpleGrid>
          </Box>
        </div>
      </form>
    </>
  );
}

export default Register;
