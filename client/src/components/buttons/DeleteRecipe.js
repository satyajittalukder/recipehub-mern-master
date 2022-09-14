import { useState } from "react";
import { Button } from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import axios from "axios";

const DeleteRecipe = (props) => {
  const recipe = props.myRecipes[props.index];
  const [deletePopUp, setDeletePopUp] = useState(false);

  const handleDelete = () => {
    axios
      .delete(`/recipes/${recipe._id}`, { withCredentials: true })
      .then(() => {
        const myRecipeList = [...props.myRecipes];
        myRecipeList.splice(props.index, 1);
        setDeletePopUp(false);
        props.setMyRecipes(myRecipeList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Button
        variant="danger"
        size="sm"
        onClick={() => {
          setDeletePopUp(true);
        }}
      >
        Delete Recipe
      </Button>

      {deletePopUp && (
        <SweetAlert
          warning
          showCancel
          confirmBtnText="Yes, delete it!"
          confirmBtnBsStyle="danger"
          title="Are you sure?"
          onConfirm={handleDelete}
          onCancel={() => {
            setDeletePopUp(false);
          }}
          focusCancelBtn
        >
          You will not be able to recover this imaginary file!
        </SweetAlert>
      )}
    </>
  );
};
export default DeleteRecipe;
