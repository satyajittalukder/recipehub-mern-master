import { Container, Row, Col } from 'react-bootstrap';
import RecipeInfo from './RecipeInfo';
import InstructionList from './InstructionList.js';
import IngredientList from './IngredientList.js';
import TagList from './TagList.js';
import dayjs from 'dayjs';
import AddtoFavePlanner from './AddtoFavePlanner';
import noImage from '../icons/600px-No_image_available_600_x_450.png';
import "../pages/Container.css"

const RecipeDisplay = ({ recipeData }) => {
  const updateDate = dayjs(recipeData.updatedAt).format('DD MMM YYYY');
  // console.log(updateDate);

  const image = recipeData.imgURL ? recipeData.imgURL : noImage;

  return (
    <Container>
      <Row className="justify-content-md-center">
        <h1 className="text-capitalize">{recipeData.recipeName}</h1>
      </Row>
      <Row className="justify-content-md-center">
        <Col sm="auto">Posted by: {recipeData.userID.username}</Col>
        <Col sm="auto">Posted on: {updateDate}</Col>
      </Row>
      <br />
      <Row className="justify-content-md-center">
        <img
          // width={400}
          height={400}
          src={image}
          alt={recipeData.recipeName}
        />
      </Row>
      <br />

      <RecipeInfo recipeData={recipeData} />

      <AddtoFavePlanner recipeID={recipeData._id} />

      <TagList tags={recipeData.tags} />
      <br />
      <br />
      <container className="card">
        <IngredientList ingredientList={recipeData.ingredientList} />
        <InstructionList instructions={recipeData.instructions} />
      </container>
    </Container>
  );
};

export default RecipeDisplay;
