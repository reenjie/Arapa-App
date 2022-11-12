import Sidebar from "./Sidebar";
import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/layouts/admin_layout";
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
  Grid,
  GridItem,
  Text,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import RedirectifAuth from "../auth/RedirectifAuth";
import { async } from "@firebase/util";
import db from "../../firebase-config";
import {
  CheckCircleIcon,
  RepeatClockIcon,
  StarIcon,
  InfoIcon,
} from "@chakra-ui/icons";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function RenderPage() {
  const redirect = RedirectifAuth();

  return (
    <div>
      <Container mt={10} maxW="2xxl">
        <Grid templateColumns="repeat(12, 1fr)" gap={3}>
          <GridItem colSpan={[12, 12, 6, 3]}>
            <Box
              padding={5}
              bg={"green.200"}
              borderRadius={10}
              shadow={"lg"}
              borderWidth={1}
              borderLeft={"5px solid #38A169"}
            >
              <Flex>
                <Box>
                  <Text fontWeight={"bold"} color={"green.600"}>
                    Approved Schools
                  </Text>
                  <Heading color={"green.700"}>5</Heading>
                </Box>
                <Spacer />
                <Text fontSize={35} color={"gray.500"}>
                  <CheckCircleIcon />
                </Text>
              </Flex>
            </Box>
          </GridItem>
          <GridItem colSpan={[12, 12, 6, 3]}>
            <Box
              padding={5}
              bg={"red.200"}
              borderRadius={10}
              shadow={"lg"}
              borderWidth={1}
              borderLeft={"5px solid #E53E3E"}
            >
              <Flex>
                <Box>
                  <Text fontWeight={"bold"} color={"red.600"}>
                    Pending Schools
                  </Text>
                  <Heading color={"red.700"}>20</Heading>
                </Box>
                <Spacer />
                <Text fontSize={35} color={"gray.500"}>
                  <RepeatClockIcon />
                </Text>
              </Flex>
            </Box>
          </GridItem>
          <GridItem colSpan={[12, 12, 6, 3]}>
            <Box
              padding={5}
              bg={"blue.200"}
              borderRadius={10}
              shadow={"lg"}
              borderWidth={1}
              borderLeft={"5px solid #3182CE"}
            >
              <Flex>
                <Box>
                  <Text fontWeight={"bold"} color={"blue.600"}>
                    School Registered
                  </Text>
                  <Heading color={"blue.700"}>20</Heading>
                </Box>
                <Spacer />
                <Text fontSize={35} color={"gray.500"}>
                  <InfoIcon />
                </Text>
              </Flex>
            </Box>
          </GridItem>
          <GridItem colSpan={[12, 12, 6, 3]}>
            <Box
              padding={5}
              bg={"teal.200"}
              borderRadius={10}
              shadow={"lg"}
              borderWidth={1}
              borderLeft={"5px solid #319795"}
            >
              <Flex>
                <Box>
                  <Text fontWeight={"bold"} color={"teal.600"}>
                    All Users
                  </Text>
                  <Heading color={"teal.700"}>20</Heading>
                </Box>
                <Spacer />
                <Text fontSize={35} color={"gray.500"}>
                  <StarIcon />
                </Text>
              </Flex>
            </Box>
          </GridItem>
        </Grid>
        {/* MAin */}
        <Box mt={10}>CHARTS</Box>
      </Container>
    </div>
  );
}

function Dashboard(props) {
  const [pendingdata, setpendingData] = useState([]);
  const [user, setUser] = useState([]);
  const [fetch, setFetch] = useState(false);
  const alluser = [];
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
        Page_Contents={<RenderPage />}
        Page_title="DASHBOARD"
      />
    </>
  );
}

export default Dashboard;
