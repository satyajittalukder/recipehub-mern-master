import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [user, setUser] = useState();

  useEffect(() => {
    axios
      .get("/users")
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => {
        // console.log(err);
        setUser({ username: "NOT_LOGGED_IN" });
      });
  }, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {props.children}
    </UserContext.Provider>
  );
};
