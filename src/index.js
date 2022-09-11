import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import { ChakraProvider } from "@chakra-ui/react";

import Routing from "./components/routes/web";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider>
    <Routing />
  </ChakraProvider>
);
