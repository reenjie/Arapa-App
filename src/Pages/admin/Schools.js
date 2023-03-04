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
  Input,
  GridItem,
  Grid
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
  updateDoc,
} from "firebase/firestore";
import swal from "sweetalert";
import { async } from "@firebase/util";
import RedirectifAuth from "../auth/RedirectifAuth";
import Map from "./Map";
import primary from "../../images/primary.png";
import hs from "../../images/highschool.png";
import shs from "../../images/seniorhigh.png";
import col from "../../images/college.png";

function RenderPage({ user, data, setFetch }) {
  const redirect = RedirectifAuth();
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const [dataId, setDataId] = useState();
  const [search,setSearch]  = useState("");
  // const [dData,setData]  = useState([]);
  const dData = [];
  const dUser = [];
  const sData = [];

  const handleBan = async (id, type) => {
    const users = doc(db, "Users", id);
    if (type == "unban") {
      await updateDoc(users, {
        status: 0,
      });
    } else {
      await updateDoc(users, {
        status: 1,
      });
    }

    swal("Changes Saved", "Changes Saved Successfully!", "success").then(() => {
      setFetch(true);
    });
  };
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
        <Box
          bg="white"
          shadow={"md"}
          height={"600px"}
          p={10}
          mt={10}
          zIndex={"1"}
        >
          <Map viewOnly={true} dataview={data} />
        </Box>
        <Box>
          <div style={{ padding: "50px" }}>
            <h4>Legend :</h4>

            <div style={{ display: "flex" }}>
              <h6 style={{ marginRight: "20px" }}>
                <img src={primary} alt="" />
                Primary
              </h6>

              <h6 style={{ marginRight: "20px" }}>
                <img src={hs} alt="" />
                High School
              </h6>

              <h6 style={{ marginRight: "20px" }}>
                <img src={shs} alt="" />
                Senior High School
              </h6>
              <h6 style={{ marginRight: "20px" }}>
                <img src={col} alt="" />
                College
              </h6>
            </div>
          </div>
        </Box>

        <Box bg="white" mt={10}>
       
          <Container p={10} maxW="container.xxl">
            {/*   <Button variant={'outline'} size='sm' colorScheme={'teal'} mb={3}>Add Range</Button> */}

            <Grid>
              <GridItem>
              <Input placeholder={"Search for Schools..."} onChange={(e)=>{
                setSearch(e.target.value);
              }}/>
              </GridItem>
            </Grid>
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
                     
                      doc.data()
                    );
                    
                    sData.push({
                      id:doc.id,
                     
                    })
                   
                 
                  })}
               
              {dData.filter((x)=>x.Name.toLowerCase().includes(search.toLowerCase())).map((row,key)=>{
              
                return   <Tr>
                <Td>{row.Name}</Td>
                <Td> {row.Address}</Td>
                <Td>
                  {dUser &&
                    dUser.map((io) => {
                      return io.data.SchooliD == sData[key].id ? (
                        io.data.status == 1 ? (
                          <Button
                            variant={"ghost"}
                            size="sm"
                            color={"red.500"}
                            onClick={(e) => {
                              swal({
                                title: "Are you sure?",
                                text: "Once unblocked,User Account account will now  be accessible",
                                icon: "warning",
                                buttons: true,
                                dangerMode: false,
                              }).then((willDelete) => {
                                if (willDelete) {
                                  handleBan(io.id, "unban");
                                }
                              });
                            }}
                          >
                            <i className="fas fa-lock"></i>
                          </Button>
                        ) : (
                          <Button
                            variant={"ghost"}
                            size="sm"
                            color={"gray.500"}
                            onClick={(e) => {
                              swal({
                                title: "Are you sure?",
                                text: "Once blocked,User Account will no longer  be accessible",
                                icon: "warning",
                                buttons: true,
                                dangerMode: true,
                              }).then((willDelete) => {
                                if (willDelete) {
                                  handleBan(io.id, "ban");
                                }
                              });
                            }}
                          >
                            <i className="fas fa-unlock"></i>
                          </Button>
                        )
                      ) : (
                        ""
                      );
                    })}

                  <Button
                    variant={"ghost"}
                    size="sm"
                    color={"green.500"}
                    isLoading={load}
                    onClick={() => {
                      setLoad(true);
                      setTimeout(() => {
                        navigate("/Admin/Schoolinfo", {
                          state: {
                            id: doc.id,
                            data: doc.data(),
                            user: dUser,
                          },
                        });
                        setLoad(false);
                      }, 4000);
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
  const [data, setData] = useState([]);
  const [pendingdata, setPendingData] = useState([]);
  const [user, setUser] = useState([]);
  const [fetch, setFetch] = useState(false);
  const alluser = [];
  const display = async () => {
    const firestoreData = await getDocs(
      query(collection(db, "Schools"), where("status", "==", 1))
    );
    setData(firestoreData);

    const firestorePData = await getDocs(
      query(collection(db, "Schools"), where("status", "==", 0))
    );

    setPendingData(firestorePData);

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
        Sidebar_elements={
          <Sidebar selected={props.selected} pending={pendingdata} />
        }
        Page_Contents={
          <RenderPage
            data={data}
            user={user}
            fetch={fetch}
            setFetch={setFetch}
          />
        }
        Page_title="SCHOOLS"
      />
    </>
  );
}

export default Schools;
