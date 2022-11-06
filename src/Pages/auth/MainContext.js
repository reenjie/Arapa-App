import { useContext } from "react";
import { AuthContext } from "./AuthContext";

const useMain = () => {
  return useContext(AuthContext);
};

export default useMain;
