import { useContext } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import _ from "lodash";

const RemoveFave = (props) => {
  const [user, setUser] = useContext(UserContext);

  const handleRemove = () => {
    const data = {
      $pull: { favourites: props.recipeID },
    };

    // console.log(data);
    const newUser = { ...user };
    newUser["favourites"] = _.pull(newUser["favourites"], props.recipeID);
    // console.log(newUser["favourites"]);
    const newFave = _.reject(props.fave, ["_id", props.recipeID]);
    axios
      .put("/users", data)
      .then((response) => {
        setUser(newUser);
        props.setFave(newFave);
        // console.log(newUser);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Button variant='danger' size='sm' onClick={handleRemove}>
        Unfavourite
      </Button>
    </>
  );
};
export default RemoveFave;
