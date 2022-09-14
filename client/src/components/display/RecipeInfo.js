import { Row, Col, Container } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import cuttingImg from "../icons/cutting.svg";
import fryingpanImg from "../icons/frying-pan.svg";
import servingImg from "../icons/food-serving.svg";

const RecipeInfo = ({ recipeData }) => {
  // console.log(recipeData.avgRating);
  const rating = recipeData.avgRating;

  const Stars = () => {
    return (
      <ReactStars
        value={recipeData.avgRating}
        isHalf={true}
        edit={false}
        size={30}
      />
    );
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <Stars />
          {rating !== undefined ? (
            <p className="text-center">
              Average Rating: {Math.ceil(recipeData.avgRating / 0.5) * 0.5} / 5
            </p>
          ) : (
            <p className="text-center">No Rating Available</p>
          )}
        </Col>
        <Col md="auto" className="text-center">
          <img src={cuttingImg} alt="icon" style={{ height: "50px" }} />
          <p>
            {recipeData.prepTime} {recipeData.prepTimeUnit}
          </p>
        </Col>
        <Col md="auto" className="text-center">
          <img src={fryingpanImg} alt="icon" style={{ height: "50px" }} />
          <p>
            {recipeData.cookTime} {recipeData.cookTimeUnit}
          </p>
        </Col>
        <Col md="auto" className="text-center">
          <img src={servingImg} alt="icon" style={{ height: "50px" }} />
          <p>{recipeData.servingSize} pax</p>
        </Col>
      </Row>
      <br />
      <h2>Description</h2>
      <p>{recipeData.description}</p>
    </Container>
  );
};

export default RecipeInfo;
