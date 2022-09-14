import axios from "axios";
import { useContext, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { UserContext } from "../context/UserContext";
import favourite from "../icons/like.svg";
import favouriteFilled from "../icons/like-filled.svg";
import planner from "../icons/notebook.svg";
import plannerFilled from "../icons/notebook-filled.svg";
// import { Redirect } from "react-router-dom";
import _ from "lodash";
import NoAccountPopUp from "./NoAccountPopUp";

const AddtoFavePlanner = ({ recipeID }) => {
  const [user, setUser] = useContext(UserContext);
  const [loginModalShow, setLoginModalShow] = useState(false);

  const handleAdd = (event) => {
    if (user.username === "NOT_LOGGED_IN") {
      setLoginModalShow(true);
    } else {
      const key = event.target.title;
      // console.log(key, recipeID);
      const data = {
        $addToSet:
          key === "planner"
            ? { [key]: { recipeID: recipeID } }
            : { [key]: recipeID },
      };
      // console.log(data);
      const newUser = { ...user };
      newUser[key].push(
        key === "planner" ? { recipeID: recipeID, multiplier: 1 } : recipeID
      );
      axios
        .put("/users", data)
        .then((response) => {
          // console.log(response);
          setUser(newUser);
          // console.log("add", newUser);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleRemove = (event) => {
    if (user.username === "NOT_LOGGED_IN") {
      setLoginModalShow(true);
    } else {
      const key = event.target.title;
      // console.log(key, recipeID);
      const data = {
        $pull:
          key === "planner"
            ? { [key]: { recipeID: recipeID } }
            : { [key]: recipeID },
      };
      // console.log(data);
      const newUser = { ...user };
      newUser[key] =
        key === "planner"
          ? _.reject(newUser[key], ["recipeID", recipeID])
          : _.pull(newUser[key], recipeID);

      axios
        .put("/users", data)
        .then((response) => {
          // console.log(response);
          // const newUser = user;
          // if (key === "planner") {
          //   newUser[key].push({ recipeID: recipeID, multiplier: 1 });
          // } else {
          //   newUser[key].push(recipeID);
          // }
          // console.log("remove", newUser);
          setUser(newUser);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        {!user || !user.favourites || !user["favourites"].includes(recipeID) ? (
          <Col
            sm="auto"
            className="text-center faveplanner-icon"
            title="favourites"
            onClick={handleAdd}
          >
            <img
              src={favourite}
              alt="icon"
              style={{ height: "50px" }}
              title="favourites"
              // onClick={handleAdd}
            />
            <p title="favourites">Add to Favourite</p>
          </Col>
        ) : (
          <Col
            sm="auto"
            className="text-center faveplanner-icon"
            title="favourites"
            onClick={handleRemove}
          >
            <img
              src={favouriteFilled}
              alt="icon"
              style={{ height: "50px" }}
              title="favourites"
              // onClick={handleRemove}
            />
            <p title="favourites">Remove from Favourite</p>
          </Col>
        )}

        {!user ||
        !user.planner ||
        !user.planner.some((recipe) => recipe.recipeID === recipeID) ? (
          <Col
            sm="auto"
            className="text-center faveplanner-icon"
            title="planner"
            onClick={handleAdd}
          >
            <img
              src={planner}
              alt="icon"
              style={{ height: "50px" }}
              title="planner"
              // onClick={handleAdd}
            />
            <p title="planner">Add to Planner</p>
          </Col>
        ) : (
          <Col
            sm="auto"
            className="text-center faveplanner-icon"
            title="planner"
            onClick={handleRemove}
          >
            <img
              src={plannerFilled}
              alt="icon"
              style={{ height: "50px" }}
              title="planner"
              // onClick={handleRemove}
            />
            <p title="planner">Remove from Planner</p>
          </Col>
        )}
      </Row>
      {loginModalShow && (
        // <Modal onHide={() => setLoginModalShow(false)}>Login Modal</Modal>
        <NoAccountPopUp
          action="add review"
          setLoginModalShow={setLoginModalShow}
        />
      )}
    </Container>
  );
};

export default AddtoFavePlanner;
