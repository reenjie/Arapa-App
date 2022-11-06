import React from "react";
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

function RenderPage() {
  const redirect = RedirectifAuth();
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
                  <Tr>
                    <Td>Western mindanao State university</Td>
                    <Td> Baliwasan road. zamboanga city</Td>
                    <Td>
                      <Button variant={"ghost"} size="sm" color={"teal.500"}>
                        View
                      </Button>
                      <Button variant={"ghost"} size="sm" color={"green.500"}>
                        <i
                          className="fas fa-check-square"
                          style={{ marginRight: "5px" }}
                        ></i>{" "}
                        Approve
                      </Button>
                      <Button variant={"ghost"} size="sm" color={"red.500"}>
                        <i
                          className="fas fa-times-square"
                          style={{ marginRight: "5px" }}
                        ></i>{" "}
                        Reject
                      </Button>
                    </Td>
                  </Tr>
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
  return (
    <>
      <AdminLayout
        Sidebar_elements={<Sidebar selected={props.selected} />}
        Page_Contents={<RenderPage />}
        Page_title="PENDING"
      />
    </>
  );
}

export default Pending;
