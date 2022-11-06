import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../../Pages/App";
import Login from "../../Pages/auth/Login";
import Register from "../../Pages/auth/Register";
import Dashboard from "../../Pages/admin/Dashboard";
import Result from "../../Pages/Result";
import NotFound from "../../Pages/NotFound";
import Schools from "../../Pages/admin/Schools";
import Pending from "../../Pages/admin/Pending";
import SchoolInfo from "../../Pages/admin/SchoolInfo";
import Download from "../../Pages/Download";
import Account from "../../Pages/Account";
import Search from "../../Pages/Search";
import useMain from "../../Pages/auth/MainContext";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<App />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="DownloadApp" element={<Download />} />
        <Route path="Account/Info" element={<Account />} />
        <Route path="Searchkey/Results" element={<Search />} />

        {/*  ADMINISTRATOR   */}
        <Route path="Admin/Dashboard" element={<Dashboard />} />
        <Route path="Admin/Schools" element={<Schools />} />
        <Route path="Admin/Pending" element={<Pending />} />
        <Route path="Admin/Schoolinfo" element={<SchoolInfo />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
