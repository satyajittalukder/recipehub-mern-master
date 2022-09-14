import { useEffect, useState, Fragment } from "react";
import {
  Row,
  Card,
  Button,
  Badge,
  Container,
  CardDeck,
  Col,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import noImage from "../icons/600px-No_image_available_600_x_450.png";
import ReactStars from "react-rating-stars-component";
import dayjs from "dayjs";

const NewlyAdded = () => {
  const [newlyAdded, setNewlyAdded] = useState([]);

  useEffect(() => {
    axios
      .get("/recipes?sort=-createdAt&limit=3")
      .then((response) => {
        setNewlyAdded(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  return (
    <Container>
      <CardDeck className="row row-cols-1 row-cols-sm-2 row-cols-lg-3">
        {newlyAdded.length > 0 &&
          newlyAdded.map((recipe) => {
            const image = recipe.imgURL ? recipe.imgURL : noImage;
            const createdDate = dayjs(recipe.createdAt).format("DD MMM YYYY");

            return (
              <Col className="pb-5" key={recipe._id}>
                <Card
                  key={recipe._id}
                  style={{ width: "18rem" }}
                  className="h-100"
                >
                  <Card.Img
                    width={100}
                    height={150}
                    variant="top"
                    src={image}
                  />
                  <Card.Body>
                    <Card.Title className="text-capitalize">
                      {recipe.recipeName}
                      <ReactStars
                        value={recipe.avgRating}
                        edit={false}
                        isHalf={true}
                      />
                    </Card.Title>
                    <Card.Text
                      style={{
                        height: "6rem",
                        overflowY: "auto",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {recipe.description}
                    </Card.Text>
                    <Row className="justify-content-md-center">
                      <Link to={`/recipe/${recipe._id}`}>
                        <Button variant="primary">Show More</Button>
                      </Link>
                    </Row>
                  </Card.Body>
                  <Card.Footer>
                    {recipe.tags
                      .sort((a, b) => (a.tagName > b.tagName ? 1 : -1))
                      .map((tag) => {
                        return (
                          <Fragment key={tag._id}>
                            <Link to={`/browse?tag=${tag._id}`}>
                              <Badge
                                className="text-capitalize"
                                variant="success"
                              >
                                {tag.tagName}
                              </Badge>
                            </Link>
                          </Fragment>
                        );
                      })}
                    <br />
                    <small className="text-muted">
                      Created on: {createdDate}
                    </small>
                  </Card.Footer>
                </Card>
              </Col>
            );
          })}
      </CardDeck>
    </Container>
  );
};
export default NewlyAdded;
