import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthContext } from "./Pages/auth/AuthContext";
import Routing from "./components/routes/web";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <AuthContext>
      <ChakraProvider>
        <Routing />
      </ChakraProvider>
    </AuthContext>
  </StrictMode>
);
