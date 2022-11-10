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
function RenderPage({ user, data, setFetch }) {
  const redirect = RedirectifAuth();
  const navigate = useNavigate();
  const dData = [];
  const dUser = [];

  const handleApprove = async (e) => {
    const id = e.currentTarget.dataset.id;
    const userid = e.currentTarget.dataset.userid;
    const School = doc(db, "Schools", id);

    swal({
      title: "Are you sure?",
      text: "Press Ok to Approve",

      buttons: true,
      dangerMode: false,
    }).then((willApprove) => {
      if (willApprove) {
        updateDoc(School, {
          status: 1,
        }).then(() => {
          swal(
            "Approved Successfully",
            "School has been approved Successfully!",
            "success"
          ).then(() => {
            navigate("/Admin/Schools");
          });
        });
      }
    });
  };

  const handleReject = async (e) => {
    const id = e.currentTarget.dataset.id;
    const userid = e.currentTarget.dataset.userid;
    const School = doc(db, "Schools", id);
    const User = doc(db, "Users", userid);

    swal({
      title: "Are you sure?",
      text: "Once Rejected Data will be Deleted and you will not be able to recover it",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteDoc(doc(db, "Schools", id));
        deleteDoc(doc(db, "Users", userid)).then(() => {
          swal(
            "Rejected Successfully",
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
      <Container mt={10} maxW="2xxl">
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
                            color={"teal.500"}
                            onClick={() => {
                              navigate("/Admin/Schoolinfo", {
                                state: {
                                  id: doc.id,
                                  data: doc.data(),
                                  user: dUser,
                                  type: "viewonly",
                                  readonly: true,
                                },
                              });
                            }}
                          >
                            View
                          </Button>
                          <Button
                            variant={"ghost"}
                            size="sm"
                            color={"green.500"}
                            data-id={doc.id}
                            data-userid={dUser
                              .filter((x) => x.data.SchooliD == doc.id)
                              .map((row) => {
                                return row.id;
                              })}
                            onClick={handleApprove}
                          >
                            <i
                              className="fas fa-check-square"
                              style={{ marginRight: "5px" }}
                            ></i>{" "}
                            Approve
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
                            onClick={handleReject}
                          >
                            <i
                              className="fas fa-times-square"
                              style={{ marginRight: "5px" }}
                            ></i>{" "}
                            Reject
                          </Button>
                        </Td>
                      </Tr>
                    );
                  })}
                  {dData}
                  {/*     <Tr>
                    <Td>Western mindanao State university</Td>
                    <Td> Baliwasan road. zamboanga city</Td>
                  
                  </Tr> */}
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
function Pending(props) {
  const [data, setData] = useState([]);
  const [user, setUser] = useState([]);
  const [fetch, setFetch] = useState(false);
  const alluser = [];
  const display = async () => {
    const firestoreData = await getDocs(
      query(collection(db, "Schools"), where("status", "==", 0))
    );
    setData(firestoreData);

    const firestoreUserData = await getDocs(collection(db, "Users"));
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
          />
        }
        Page_title="PENDING"
      />
    </>
  );
}

export default Pending;
