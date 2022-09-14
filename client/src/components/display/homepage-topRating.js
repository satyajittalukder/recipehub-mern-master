import { useEffect, useState, Fragment } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  Badge,
  Container,
  CardDeck,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactStars from "react-rating-stars-component";
import noImage from "../icons/600px-No_image_available_600_x_450.png";
import dayjs from "dayjs";

const TopRating = () => {
  const [topRating, setTopRating] = useState([]);

  useEffect(() => {
    axios
      .get("/recipes?sort=-avgRating&limit=3")
      .then((response) => {
        // console.log(response.data);
        setTopRating(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  return (
    <Container>
      <CardDeck className="row row-cols-1 row-cols-sm-2 row-cols-lg-3">
        {topRating.length > 0 &&
          topRating.map((recipe) => {
            const image = recipe.imgURL ? recipe.imgURL : noImage;
            const updatedDate = dayjs(recipe.createdAt).format("DD MMM YYYY");

            return (
              <Col className="pb-5" key={recipe._id}>
                <Card
                  key={recipe._id}
                  style={{ width: "18rem" }}
                  className="h-100"
                >
                  <Card.Img
                    width={288}
                    height={216}
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
                      .sort((a, b) => (b.tagName > a.tagName ? 1 : -1))
                      .reverse()
                      .map((tag) => {
                        // console.log(tag);
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
                      Updated on: {updatedDate}
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
export default TopRating;
