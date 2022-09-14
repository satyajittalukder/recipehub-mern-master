import { Container, Row, Col } from "react-bootstrap";
import "./Container.css"
const About = () => {
  return (
    <Container className="card">
      <Row className="justify-content-md-center">
        <h1 className="text-center" style={{ textDecoration: "underline" }}>
          Tech Stack
        </h1>
      </Row>
      <br />
      <Row className="justify-content-md-center">
        <Col sm="auto">
          <Row className="justify-content-md-center">
            <h4 style={{ textDecoration: "underline" }}>Front-End</h4>
          </Row>
          <Row className="justify-content-md-center">
            <ul>
              <li>HTML</li>
              <li>CSS</li>
              <li>JavaScript</li>
              <li>ReactJS</li>
            </ul>
          </Row>
        </Col>
        <Col sm={1}></Col>
        <Col sm="auto">
          <Row className="justify-content-md-center">
            <h4 style={{ textDecoration: "underline" }}>Back-End</h4>
          </Row>
          <Row className="justify-content-md-center">
            <ul>
              <li>Express</li>
              <li>Mongoose</li>
              <li>MongoDB Atlas</li>
            </ul>
          </Row>
        </Col>
      </Row>
      <br />
      <Row className="justify-content-md-center">
        <h4>Other Libraries / Frameworks</h4>
      </Row>
      <br />

      <Row className="justify-content-md-center">
        <Col sm="auto">
          <Row className="justify-content-md-center">
            <h4 style={{ textDecoration: "underline" }}>Front-End</h4>
          </Row>
          <Row className="justify-content-md-center">
            <ul>
              <li>Axios</li>
              <li>Dayjs</li>
              <li>Filestack-react</li>
              <li>Lodash</li>
              <li>React-bootstrap</li>
              <li>React-bootstrap-sweetalert</li>
              <li>React-rating-star-component</li>
              <li>React-router-dom</li>
              <li>
                Icons made by{" "}
                <a href="https://www.freepik.com" title="Freepik">
                  Freepik
                </a>{" "}
                from{" "}
                <a href="https://www.flaticon.com/" title="Flaticon">
                  www.flaticon.com
                </a>
              </li>
            </ul>
          </Row>
        </Col>
        <Col sm={1}></Col>
        <Col sm="auto">
          <Row className="justify-content-md-center">
            <h4 style={{ textDecoration: "underline" }}>Back-End</h4>
          </Row>
          <Row className="justify-content-md-center">
            <ul>
              <li>Bcrypt</li>
              <li>Dotenv</li>
              <li>Express-session</li>
              <li>Express-validator</li>
            </ul>
          </Row>
        </Col>
      </Row>

      <br />

      

      {/* <Row className="justify-content-md-center">
        <footer
          style={{
            position: "fixed",
            bottom: "0",
            width: "100%",
            textAlign: "right",
          }}
        >
          &copy; Recipe Hub - 2021
        </footer>
      </Row> */}
    </Container>
  );
};

export default About;
