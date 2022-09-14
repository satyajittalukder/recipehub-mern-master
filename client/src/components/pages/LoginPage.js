import { useState } from "react";
import { Container, Row } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import LoginForm from "../display/LoginForm";
import "./Container.css"
const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(false);

  if (isLogin) {
    return <Redirect to="/" />;
  }

  return (
    <Container className="login">
      <Row className="justify-content-md-center">
        <h1>Login Page</h1>
      </Row>
      <br />
      <LoginForm afterLoginAction={setIsLogin} />
    </Container>
  );
};

export default LoginPage;
