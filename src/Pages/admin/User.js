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
} from "@chakra-ui/react";
import RedirectifAuth from "../auth/RedirectifAuth";
import { async } from "@firebase/util";
import db from "../../firebase-config";
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
import swal from "sweetalert";
function RenderPage({ user, data, setFetch, allschools }) {
  const redirect = RedirectifAuth();
  const navigate = useNavigate();
  const dData = [];
  const dUser = [];

  return (
    <div>
      <Container mt={10} maxW="2xxl">
        <Box bg="white" mt={10}>
          <Container p={10} maxW="container.xxl">
            <TableContainer>
              <Table variant="striped" colorScheme="facebook" size={"md"}>
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Email</Th>
                    <Th>Contact</Th>
                    <Th>School</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {user.forEach((doc) => {
                    {
                      allschools.forEach((row) => {
                        if (row.id === doc.data().SchooliD) {
                          dUser.push({
                            school: {
                              id: row.id,
                              data: row.data(),
                            },
                          });
                        }
                      });
                    }

                    dData.push(
                      <Tr>
                        <Td>{doc.data().Name}</Td>
                        <Td> {doc.data().Email}</Td>
                        <Td> {doc.data().Contact}</Td>
                        <Td>
                          {dUser.map((row) => {
                            if (row.school.id == doc.data().SchooliD) {
                              return row.school.data.Name;
                            }
                          })}
                        </Td>
                      </Tr>
                    );
                  })}
                  {dData}
                </Tbody>
                <Tfoot>
                  <Tr>
                    <Th>Table Data</Th>
                  </Tr>
                </Tfoot>
              </Table>
            </TableContainer>
          </Container>
        </Box>
      </Container>
    </div>
  );
}
function User(props) {
  const [data, setData] = useState([]);
  const [user, setUser] = useState([]);
  const [fetch, setFetch] = useState(false);
  const alluser = [];
  const [allschools, setAllschools] = useState([]);
  const display = async () => {
    const firestoreData = await getDocs(
      query(collection(db, "Schools"), where("status", "==", 0))
    );
    setData(firestoreData);

    const firestoreAllschoolData = await getDocs(collection(db, "Schools"));
    setAllschools(firestoreAllschoolData);

    const firestoreUserData = await getDocs(
      query(collection(db, "Users"), where("usertype", "==", 0))
    );
    setUser(firestoreUserData);
  };

  useEffect(() => {
    display();
    setFetch(false);
  }, [fetch]);
  return (
    <>
      <AdminLayout
        Sidebar_elements={<Sidebar selected={props.selected} pending={data} />}
        Page_Contents={
          <RenderPage
            data={data}
            user={user}
            fetch={fetch}
            setFetch={setFetch}
            allschools={allschools}
          />
        }
        Page_title="PENDING"
      />
    </>
  );
}

export default User;
