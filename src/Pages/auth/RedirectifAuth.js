import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function RedirectifAuth() {
  const navigate = useNavigate();
  const Location = useLocation();
  useEffect(() => {
    if (localStorage.getItem("Userauth")) {
      const usertype = JSON.parse(localStorage.getItem("Userauth")).data
        .usertype;

      if (usertype == 1) {
        switch (Location.pathname) {
          case "/Admin/Dashboard":
            navigate("/Admin/Dashboard");
            break;
          case "/Admin/Schools":
            navigate("/Admin/Schools");
            break;
          case "/Admin/Pending":
            navigate("/Admin/Pending");
            break;
          case "/Admin/Schoolinfo":
            navigate("/Admin/Schoolinfo");
            break;

          case "/Admin/Users":
            navigate("/Admin/Users");
            break;

          default:
            navigate("/Admin/Dashboard");
            break;
        }
      } else {
        navigate("/Account/Info");
      }
    } else {
      navigate("/login");
    }
  }, []);
}

export default RedirectifAuth;
