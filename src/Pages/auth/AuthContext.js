import { createContext, useState } from "react";

const Auth = createContext({});

export const AuthContext = ({ children }) => {
  /* const userAuth = JSON.parse(localStorage.getItem("Userauth"));
  const [user, setUser] = useState({
    id: userAuth.id,
    name: userAuth.data.Name,
    email: userAuth.data.Email,
    contact: userAuth.data.contact,
  });
 */
  const [user, setUser] = useState({
    id: 1,
    name: "reenhay",
    email: "reenjie17",
    contact: "numba",
  });
  return (
    <Auth.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </Auth.Provider>
  );
};

export default Auth;
