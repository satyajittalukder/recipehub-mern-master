import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import axios from 'axios';
// import TopRating from '../display/homepage-topRating';
import NewlyAdded from '../display/homepage-newlyAdded';
import './Container.css';

// import background from '../data/categories-image/background.jpg';

const HomePage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // console.log("home page");
    axios
      .get('/tags/categories')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  return (
    <Container className="card">
      {/* <h1>RECIPE HUB</h1> */}
      <br />
      <h1 className="text-center">A Hub For Simple and Delicious Recipe </h1>
      <br />
      {/* <h3>Top Rating Recipes</h3>
      <br />
      <TopRating /> */}
      {/* <br /> */}
      <h3>Newly Added Recipes</h3>
      
      <NewlyAdded />
      <br />
      <h3>Browse By Categories</h3>
      <br />
      <Row className="justify-content-md-center pb-5">
        {categories.length > 0 &&
          categories
            .sort((a, b) => (a > b ? 1 : -1))
            .map((category, index) => {
              return (
                // <Col md="auto" key={category} className="categories">
                //   <Link to={`/browse`}>
                //     <Button
                //       variant="info"
                //       className="mb-5 ml-5 text-capitalize"
                //     >
                //       {category}
                //     </Button>
                //   </Link>
                // </Col>
                <Col
                  key={category}
                  sm={0}
                  // className="categories"
                  style={{
                    height: '30px',
                  }}
                >
                  <Link to={`/browse`}>
                    <div
                      style={{
                        backgroundColor: '#9966ff',
                        borderRadius: '10px',
                      }}
                    >
                      <p className="categories-text text-capitalize">
                        {category}
                      </p>
                    </div>
                  </Link>
                </Col>
              );
            })}
      </Row>
    </Container>
  );
};

export default HomePage;
