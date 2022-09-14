import axios from "axios";
import { useContext, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import { UserContext } from "../context/UserContext";


const SignupForm = ({ afterLoginAction }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [resError, setResError] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [donePopup, setPopup] = useState(false);

  const [user, setUser] = useContext(UserContext);

  const handleChange = (event) => {
    setFormData((state) => {
      return { ...state, [event.target.name]: event.target.value };
    });
  };

  const handleValidation = (errors) => {
    const validationErrors = {};
    errors.forEach((error) => {
      validationErrors[error.param] = error.msg;
    });
    setErrors(validationErrors);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(formData);

    axios
      .post("/users/new", formData)
      .then((response) => {
        // console.log(response);
        setPopup(true);
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response.status === 400) {
          console.log(error.response.data.errors);
          handleValidation(error.response.data.errors);
        } else {
          console.log(error.response.data);
          setErrors(error.response.data);
        }
      });
  };

  const handlenextPage = () => {
    axios
      .post("/sessions", formData)
      .then((response) => {
        // console.log(response);
        afterLoginAction(true);
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
        setResError((state) => {
          return { ...state, ...error.response.data };
        });
      });
  };

  return (
    <Container >
      <form onSubmit={(event) => handleSubmit(event)}>
        <Row className='justify-content-md-center'>
          <Col sm='auto'>
            <label>Username: </label>
          </Col>
          <Col sm='auto'>
            <input
              type='text'
              name='username'
              required
              id='username'
              value={formData.username}
              onChange={handleChange}
              placeholder='Username'
            />
          </Col>
        </Row>
        <Row className='justify-content-md-center'>
          <span style={{ color: "red" }}> {errors.username} </span>
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
              required
              id='password'
              value={formData.password}
              onChange={handleChange}
              placeholder='Password'
              minLength='8'
            />
          </Col>
        </Row>
        <br />
        <Row className='justify-content-md-center'>
          <span style={{ color: "red" }}> {errors.password} </span>
        </Row>
        <Row className='justify-content-md-center'>
          <Button type='submit'>Create Account</Button>
        </Row>
      </form>

      {donePopup && (
        <SweetAlert
          success
          title='Welcome to the Recipe Hub!'
          onConfirm={handlenextPage}
          // onCancel={this.onCancel}
          confirmBtnText='Continue'
        >
          You have succesfully signed up!
        </SweetAlert>
      )}
    </Container>
  );
};

export default SignupForm;
