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
import { Link, useNavigate } from "react-router-dom";
import db from "../../firebase-config";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import swal from "sweetalert";
import { async } from "@firebase/util";
import RedirectifAuth from "../auth/RedirectifAuth";

function RenderPage() {
  const redirect = RedirectifAuth();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [user, setUser] = useState([]);
  const [fetch, setFetch] = useState(false);
  const alluser = [];
  const display = async () => {
    const firestoreData = await getDocs(
      query(collection(db, "Schools"), where("status", "==", 1))
    );
    setData(firestoreData);

    const firestoreUserData = await getDocs(collection(db, "Users"));
    setUser(firestoreUserData);
  };
  const dData = [];
  const dUser = [];

  useEffect(() => {
    display();
    setFetch(false);
  }, [fetch]);

  const handleDelete = async (e) => {
    const id = e.currentTarget.dataset.id;
    const userid = e.currentTarget.dataset.userid;

    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover it",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteDoc(doc(db, "Schools", id));
        deleteDoc(doc(db, "Users", userid)).then(() => {
          swal(
            "Deleted Successfully",
            "School and User data has been Deleted Successfully!",
            "success"
          ).then(() => {
            setFetch(true);
          });
        });
      }
    });
  };

  return (
    <div>
      <Stack>
        <Box bg="white" shadow={"md"} height={"250px"} p={10} mt={10}>
          Map here
        </Box>

        <Box bg="white" mt={10}>
          <Container p={10} maxW="container.xxl">
            {/*   <Button variant={'outline'} size='sm' colorScheme={'teal'} mb={3}>Add Range</Button> */}
            <TableContainer>
              <Table variant="striped" colorScheme="facebook" size={"md"}>
                <Thead>
                  <Tr>
                    <Th>Schools</Th>
                    <Th>Location</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.forEach((doc) => {
                    const datauser = user.forEach((element) => {
                      if (element.data().SchooliD == doc.id) {
                        dUser.push({ id: element.id, data: element.data() });
                      }
                    });
                    dData.push(
                      <Tr>
                        <Td>{doc.data().Name}</Td>
                        <Td> {doc.data().Address}</Td>
                        <Td>
                          <Button
                            variant={"ghost"}
                            size="sm"
                            color={"green.500"}
                            onClick={() => {
                              navigate("/Admin/Schoolinfo", {
                                state: {
                                  id: doc.id,
                                  data: doc.data(),
                                  user: dUser,
                                },
                              });
                            }}
                          >
                            <i className="fas fa-edit"></i>
                          </Button>

                          <Button
                            variant={"ghost"}
                            size="sm"
                            color={"red.500"}
                            data-id={doc.id}
                            data-userid={dUser
                              .filter((x) => x.data.SchooliD == doc.id)
                              .map((row) => {
                                return row.id;
                              })}
                            onClick={handleDelete}
                          >
                            <i className="fas fa-trash-can"></i>
                          </Button>
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
      </Stack>
    </div>
  );
}
function Schools(props) {
  return (
    <>
      <AdminLayout
        Sidebar_elements={<Sidebar selected={props.selected} />}
        Page_Contents={<RenderPage />}
        Page_title="SCHOOLS"
      />
    </>
  );
}

export default Schools;
