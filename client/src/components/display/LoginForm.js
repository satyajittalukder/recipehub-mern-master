import axios from "axios";
import { useContext, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { UserContext } from "../context/UserContext";

const LoginForm = ({ afterLoginAction }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [resError, setResError] = useState({
    username: "",
    password: "",
  });

  const [user, setUser] = useContext(UserContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(formData);

    axios
      .post("/sessions", formData)
      .then((response) => {
        // console.log(response);
        afterLoginAction(true);
        setUser(response.data);
      })
      // .then(setIsLogin(true))
      .catch((error) => {
        // console.log(error.response.data);
        setResError((state) => {
          return { ...state, ...error.response.data };
        });
      });
  };
  const handleChange = (event) => {
    setFormData((state) => {
      return { ...state, [event.target.name]: event.target.value };
    });
    setResError({
      username: "",
      password: "",
    });
  };
  return (
    <form
      onSubmit={(event) => {
        handleSubmit(event);
      }}
    >
      <Row className='justify-content-md-center'>
        <Col sm='auto'>
          <label>Username: </label>
        </Col>
        <Col sm='auto'>
          <input
            type='text'
            name='username'
            id='username'
            required
            value={formData.username}
            onChange={handleChange}
          />
        </Col>
      </Row>
      <Row className='justify-content-md-center'>
        <span style={{ color: "red" }}> {resError.username} </span>
      </Row>
      <br />
      <Row className='justify-content-md-center'>
        <Col sm='auto'>
          <label>Password: </label>
        </Col>
        <Col sm='auto'>
          <input
            type='password'
            name='password'
            id='password'
            required
            value={formData.password}
            onChange={handleChange}
          />
        </Col>
      </Row>
      <Row className='justify-content-md-center'>
        <span style={{ color: "red" }}> {resError.password} </span>
      </Row>

      <br />
      <Row className='justify-content-md-center'>
        <Button type='submit'>Login</Button>
      </Row>
    </form>
  );
};

export default LoginForm;
