import React from "react";
import { useNavigate } from "react-router-dom";

function Signout() {
  localStorage.removeItem("Userauth");
  window.location.reload();
}

export default Signout;
