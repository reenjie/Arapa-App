import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Userdata() {
  const navigate = useNavigate();
  const udata = JSON.parse(localStorage.getItem("Userauth"));
  if (udata) {
    return udata;
  } else {
    return { id: "", data: "" };
  }
}

export default Userdata;
