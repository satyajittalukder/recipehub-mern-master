import { useState } from "react";
import { Button } from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const NoAccountPopUp = ({ action, setLoginModalShow }) => {
  const [selection, setSelection] = useState("");
  const [formSubmitted, setFromSubmit] = useState(false);
  const handleClose = () => {
    setLoginModalShow(false);
  };

  if (formSubmitted) {
    handleClose();
  }

  return (
    <SweetAlert
      title={`An account is needed to ${action}`}
      onConfirm={handleClose}
      onCancel={handleClose}
      type={"controlled"}
      dependencies={selection}
      showConfirm={false}
      showCancel={true}
    >
      {!selection ? (
        <div>
          Please login or sign up below:
          <hr />
          <Button
            variant='success'
            onClick={() => {
              setSelection("login");
            }}
          >
            Login
          </Button>
          &nbsp;
          <Button
            variant='danger'
            onClick={() => {
              setSelection("signup");
            }}
          >
            Sign Up
          </Button>
          <hr />
        </div>
      ) : selection === "login" ? (
        <div>
          <LoginForm afterLoginAction={setFromSubmit} />
        </div>
      ) : (
        <div>
          <SignupForm afterLoginAction={setFromSubmit} />
        </div>
      )}
    </SweetAlert>
  );
};

export default NoAccountPopUp;
