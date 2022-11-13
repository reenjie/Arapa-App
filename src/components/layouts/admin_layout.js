import "../../css/App.css";
import {
  Fade,
  ScaleFade,
  Slide,
  SlideFade,
  useDisclosure,
  Button,
  Box,
  Heading,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

function handleClick() {
  const sb = document.getElementById("sideBar");
  const sblink = document.getElementById("sblink");
  const mainwrap = document.getElementById("wrap");
  const togglebtn = document.getElementById("btnopen_close");

  const wsize = sb.offsetWidth;
  if (wsize == 240) {
    sb.style.width = "0";
    sblink.style.display = "none";
    mainwrap.style.marginLeft = "20px";
    togglebtn.style.marginLeft = "20px";
  } else {
    sb.style.width = "240px";
    sblink.style.display = "block";
    mainwrap.style.marginLeft = "260px";
    togglebtn.style.marginLeft = "260px";
  }
}
function AdminLayout(props) {
  return (
    <>
      <div id="sideBar">{props.Sidebar_elements}</div>
      <div className="topbar" style={{ zIndex: "6" }}>
        <button
          id="btnopen_close"
          colorScheme="teal"
          variant="outline"
          value="changeicon"
          zIndex="100"
          onClick={handleClick}
        >
          <HamburgerIcon id="humicon" />
        </button>

        <span className="title" style={{ fontWeight: "bold", color: "gray" }}>
          {props.Page_title}
        </span>
      </div>
      <div className="Wrap" id="wrap">
        <div id="mainPage">{props.Page_Contents}</div>
      </div>
    </>
  );
}

export default AdminLayout;
