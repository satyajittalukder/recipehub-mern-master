import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Container, Spinner } from "react-bootstrap";

const RandomRecipePage = () => {
  const [randomRecipeID, setRandomRecipeID] = useState("");

  useEffect(() => {
    axios
      .get("/recipes/random")
      .then((response) => {
        // console.log(response.data[0]._id);
        setRandomRecipeID(response.data[0]._id);
      })
      .catch((error) => {
        console.log(error.response);
      });
    // console.log(HomePageData);
    // setRandomRecipeID(HomePageData.topRating[0]._id);
  }, []);

  if (randomRecipeID !== "") {
    return <Redirect to={`/recipe/${randomRecipeID}`} />;
  }

  return (
    <Container
      className="d-flex justify-content-center"
      style={{ height: "90vh" }}
    >
      <div
        className="text-center align-self-center"
        // style={{ margin: "20% 0" }}
      >
        <Spinner animation="grow" />
        <h1>Fetching Recipe...</h1>
      </div>
    </Container>
  );
};

export default RandomRecipePage;
