import {
  Stack,
  Flex,
  Center,
  Text,
  Square,
  Image,
  Divider,
  Spacer,
  Avatar,
  Box,
  Badge,
  Container,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import "../../css/App.css";
import { Link } from "react-router-dom";
import Zcmc_info from "../../components/layouts/info";

function Sidebar({ pending }) {
  return (
    <div className="sidebar-links" id="sblink">
      <Zcmc_info usertype="admin" />
      <Divider />

      <Stack direction="row" mb="1">
        <ul>
          <Text ml={10} color="teal" as={"em"} fontSize="xs">
            REPORTS
          </Text>
          <Link to="../Admin/Dashboard">
            <li>
              <Container>
                {" "}
                <span>
                  {" "}
                  <i className="fas fa-dashboard"></i> Dashboard
                </span>
              </Container>
            </li>{" "}
          </Link>

          <Text ml={10} color="teal" as={"em"} fontSize="xs">
            MANAGE
          </Text>

          <Link to="../Admin/Schools">
            {" "}
            <li>
              <Container>
                <span>
                  {" "}
                  <i className="fas fa-school"></i> Schools
                </span>
              </Container>
            </li>{" "}
          </Link>

          <Link to="../Admin/Pending">
            {" "}
            <li>
              <Container>
                <span>
                  <i className="fas fa-sync"></i> Pending
                  {pending.size >= 1 ? (
                    <Badge variant="outline" colorScheme="green">
                      New
                    </Badge>
                  ) : null}
                </span>
              </Container>
            </li>{" "}
          </Link>

          <Link to="../Admin/Users">
            {" "}
            <li>
              <Container>
                <span>
                  {" "}
                  <i className="fas fa-users"></i> Users
                </span>
              </Container>
            </li>{" "}
          </Link>
        </ul>
      </Stack>
    </div>
  );
}
export default Sidebar;
