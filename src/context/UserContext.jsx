import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [userToken, setUserToken] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const data = localStorage.getItem("userData");

    if (token) setUserToken(token);
    if (data) setUserData(JSON.parse(data));
  }, []);

  return (
    <UserContext.Provider
      value={{ userToken, setUserToken, userData, setUserData }}
    >
      {children}
    </UserContext.Provider>
  );
}
