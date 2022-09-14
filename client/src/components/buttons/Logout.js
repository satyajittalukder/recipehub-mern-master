import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Logout = () => {
  const [loggedOut, setLoggedOut] = useState(false);
  const [user, setUser] = useContext(UserContext);
  const handleLogout = () => {
    axios
      .delete("/sessions/", { withCredentials: true })
      .then((response) => {
        setLoggedOut(true);
        setUser({ username: "NOT_LOGGED_IN" });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  if (loggedOut) {
    return <Redirect to='/' />;
  }
  return <Button onClick={handleLogout}>Logout</Button>;
};

export default Logout;
