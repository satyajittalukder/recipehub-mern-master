import { useState } from "react";
import { Redirect } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import SignupForm from "../display/SignupForm";
import "./Container.css"

const SignupPage = () => {
  const [isLogin, setIsLogin] = useState(false);

  if (isLogin) {
    return <Redirect to="/" />;
  }

  return (
    <Container className="sign-up">
      <Row className="justify-content-md-center">
        <h1>Sign Up Page</h1>
      </Row>
      <br/>
      {/* <Row className="justify-content-md-center">
        <h3>Create your new account here:</h3>
      </Row> */}
      <SignupForm afterLoginAction={setIsLogin} />
    </Container>
  );
};

export default SignupPage;
