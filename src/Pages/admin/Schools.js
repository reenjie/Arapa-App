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
import { collection, getDocs } from "firebase/firestore";

function RenderPage() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState([]);
  const display = async () => {
    const firestoreData = await getDocs(collection(db, "Schools"));
    setData(firestoreData);

    const firestoreuserData = await getDocs(collection(db, "Users"));
    setUserData(firestoreuserData);
  };
  const tableData = [];
  const userd = [];
  data.forEach((element) => {
    const row = element._document;

    tableData.push(row);
  });

  userData.forEach((element) => {
    const row = element._document;
    userd.push(row);
  });

  useEffect(() => {
    display();
  }, []);

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
                  {tableData.map((e) => {
                    const row = e.data.value.mapValue.fields;
                    const id = e.key.path.segments[6];
                    return (
                      <>
                        <Tr>
                          <Td>{row.Name.stringValue}</Td>
                          <Td> {row.Address.stringValue}</Td>
                          <Td>
                            {id}

                            <Button
                              variant={"ghost"}
                              size="sm"
                              color={"green.500"}
                              onClick={() => {
                                navigate("/Admin/Schoolinfo", {
                                  state: {
                                    id: id,
                                    data: tableData,
                                    user: userd.filter(
                                      (x) =>
                                        x.data.value.mapValue.fields.SchooliD
                                          .stringValue == id
                                    ),
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
                            >
                              <i className="fas fa-trash-can"></i>
                            </Button>
                          </Td>
                        </Tr>
                      </>
                    );
                  })}
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
