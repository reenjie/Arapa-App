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
function RenderPage() {
  const redirect = RedirectifAuth();
  return (
    <div>
      <Container mt={10} maxW="2xxl"></Container>
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
