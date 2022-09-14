import { useEffect, useState } from 'react';
import {
  Form,
  Col,
  Button,
  Container,
  ButtonToolbar,
  Row,
  Spinner,
} from 'react-bootstrap';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Redirect, useParams } from 'react-router-dom';
import axios from 'axios';
import AddIngredientModal from '../display/AddIngredientModal';
import ImageUpload from '../display/ImageUpload';
import './Container.css';

const EditRecipePage = () => {
  const { recipeID } = useParams();
  const [availableTags, setAvailableTags] = useState([]);
  const [availableIngredients, setAvailableIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([
    { quantity: '', units: '', ingredient: '', unitOptions: [] },
  ]);
  const [cookingInstructions, setCookingInstructions] = useState(['']);
  const [donePopUp, setDonePopUp] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const [openIngredientModal, setOpenIngredientModal] = useState(false);

  const [initialState, setInitialState] = useState({});
  const [formData, setFormData] = useState({
    recipeName: '',
    servingSize: '',
    prepTime: 'mins',
    prepTimeUnit: '',
    cookTime: '',
    cookTimeUnit: 'mins',
    tags: [], //contain tags id
    description: '',
    imgURL: '',
    ingredientList: [], // {quantity: "", units: "", ingredient: contains the id""}
    instructions: [],
  });

  useEffect(() => {
    const getTags = axios.get('/tags');
    const getIngredients = axios.get('/ingredients');
    const getRecipe = axios.get(`/recipes/${recipeID}`);

    axios
      .all([getTags, getIngredients, getRecipe])
      .then(
        axios.spread((...allData) => {
          // console.log("all data", allData);
          const allTags = allData[0].data;
          const allIngredients = allData[1].data;
          const initialState = allData[2].data;
          setAvailableIngredients(allIngredients);
          setInitialState(initialState);
          setFormData(initialState);

          setCookingInstructions(initialState.instructions);
          //setAvailableTags
          const checkedTags = initialState.tags.map((tag) => {
            return tag.tagName;
          });
          // console.log("checked tags", checkedTags);

          const checkChecked = (tag) => {
            return checkedTags.includes(tag);
          };

          setAvailableTags(
            allTags.map((tag) => {
              return { ...tag, checked: checkChecked(tag.tagName) };
            })
          );
          //setSelectedIngredients
          const ingredientList = initialState.ingredientList;
          // console.log("ingredient list", ingredientList);
          const selectedIng = ingredientList.map((ingredient) => {
            const filter = allIngredients.filter((ing) => {
              return (
                ing.ingredientName === ingredient.ingredient.ingredientName
              );
            });

            return { ...ingredient, unitOptions: filter[0].units };
          });

          setSelectedIngredients(selectedIng);
        })
      )
      .catch((error) => {
        console.log(error);
      });
  }, [recipeID]);

  const handleChange = (event) => {
    setFormData((state) => {
      return { ...state, [event.target.id]: event.target.value };
    });
  };

  const handleIngredientSelect = (event, index) => {
    // console.log("handleIngredientSelect", event);
    const values = [...selectedIngredients];
    values[index][event.target.id] = event.target.value;

    if (event.target.id === 'ingredient') {
      const selectedIngredient = availableIngredients.filter((ingredient) => {
        return ingredient._id === event.target.value;
      });
      values[index]['unitOptions'] = selectedIngredient[0].units;
    }
    setSelectedIngredients(values);
  };

  const handleIngredientChange = (event, index) => {
    // console.log("handleIngredientChange", event);
    const values = [...selectedIngredients];
    values[index][event.target.id] = event.target.value;
    setSelectedIngredients(values);
  };

  const handleAddIngredient = (index) => {
    setSelectedIngredients([
      ...selectedIngredients,
      {
        quantity: '',
        units: '',
        ingredient: { _id: '', ingredientName: '' },
        unitOptions: [],
      },
    ]);
  };
  const handleDeleteIngredient = (index) => {
    const values = [...selectedIngredients];
    values.splice(index, 1);
    setSelectedIngredients(values);
  };
  const handleInstructionChange = (event, index) => {
    const values = [...cookingInstructions];
    values[index] = event.target.value;
    setCookingInstructions(values);
  };

  const handleAddInstruction = (index) => {
    setCookingInstructions([...cookingInstructions, '']);
  };

  const handleDeleteInstruction = (index) => {
    const values = [...cookingInstructions];
    values.splice(index, 1);
    setCookingInstructions(values);
  };

  const handleCheckChange = (index) => {
    const tags = [...availableTags];
    tags[index].checked = !tags[index].checked;
    setAvailableTags(tags);
  };

  const handleSelect = (event) => {
    // console.log(event.target.value, event);
    setFormData((state) => {
      return { ...state, [event.target.id]: event.target.value };
    });
  };

  const handleReset = () => {
    const checkedTags = initialState.tags.map((tag) => {
      return tag.tagName;
    });
    const checkChecked = (tag) => {
      return checkedTags.includes(tag);
    };
    const currentAvailableTags = [...availableTags];
    setAvailableTags(
      currentAvailableTags.map((tag) => {
        return { ...tag, checked: checkChecked(tag) };
      })
    );

    //reset ingredients selected
    setSelectedIngredients(initialState.ingredientList);

    //reset cooking instruction
    setCookingInstructions(initialState.instructions);
    setFormData(initialState);
  };

  // const capitalizeName = (str) => {
  //   const splitStr = str.toLowerCase().split(" ");
  //   for (let i = 0; i < splitStr.length; i++) {
  //     splitStr[i] =
  //       splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  //   }
  //   return splitStr.join(" ");
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    //remove unitOptions from selected ingredient
    const ingredientLists = [...selectedIngredients];
    ingredientLists.map((ingredient) => delete ingredient.unitOptions);
    //check tags checked
    const checkedTags = availableTags.filter((tag) => {
      return tag.checked === true;
    });
    //construct data to be submitted
    const dataToBeSubmitted = {
      ...formData,
      // recipeName: capitalizeName(formData.recipeName),
      ingredientList: ingredientLists,
      instructions: cookingInstructions,
      tags: checkedTags.map((tag) => tag._id),
    };
    // console.log(dataToBeSubmitted);

    axios
      .post(`/recipes/${recipeID}`, dataToBeSubmitted, {
        withCredentials: true,
      })
      .then((response) => {
        setDonePopUp(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // console.log(selectedIngredients);
  if (redirect) {
    return <Redirect to={'/recipe/user'} />;
  }

  if (donePopUp) {
    return (
      <Container>
        <SweetAlert
          success
          title="Recipe Edited"
          onConfirm={() => {
            setRedirect(true);
          }}
          confirmBtnText="Go to your recipes"
        >
          Your have successfully edited this recipe!
        </SweetAlert>
      </Container>
    );
  }
  // console.log(formData);
  // console.log(selectedIngredients);

  return (
    <Container className="card">
      <h1 className="text-center">Edit Your Recipe</h1>
      <br />
      {availableTags.length > 0 && availableIngredients.length > 0 ? (
        <Form className="pb-5" onSubmit={handleSubmit}>
          <Form.Group controlId="recipeName">
            <Form.Label>
              <strong>Recipe Name:</strong>
            </Form.Label>
            <Form.Control
              type="text"
              value={formData.recipeName}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>
              <strong>Brief Description of the meal:</strong>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <ImageUpload setFormData={setFormData} />
          <Form.Group controlId="tags">
            <Form.Label>
              <strong>Select tags</strong>
            </Form.Label>
            <br />
            {availableTags
              .sort((a, b) => {
                return a.tagName > b.tagName ? 1 : -1;
              })
              .map((tag, index) => {
                // console.log(tag);
                return (
                  <Form.Check
                    key={tag._id}
                    className="text-capitalize"
                    inline
                    label={tag.tagName}
                    type="checkbox"
                    id={`inline-checkbox-${tag.tagName}`}
                    checked={tag.checked}
                    onChange={() => handleCheckChange(index)}
                  />
                );
              })}
          </Form.Group>
          <Form.Group controlId="servingSize">
            <Form.Label>
              <strong>Serving Size:</strong>
            </Form.Label>
            <Form.Control
              type="number"
              value={formData.servingSize}
              onChange={handleChange}
              min="0"
              required
            />
          </Form.Group>
          <Form.Row>
            <Form.Label>
              <strong>Preparation Time:</strong>
            </Form.Label>
            <Form.Group as={Col} controlId="prepTime">
              <Form.Control
                type="number"
                value={formData.prepTime}
                onChange={handleChange}
                required
                min="0"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="prepTimeUnit">
              <Form.Control
                as="select"
                onChange={(event) => handleSelect(event)}
              >
                <option value="mins">mins</option>
                <option value="hours">hours</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Label>
              <strong>Cooking Time:</strong>
            </Form.Label>
            <Form.Group as={Col} controlId="cookTime">
              <Form.Control
                type="number"
                value={formData.cookTime}
                onChange={handleChange}
                required
                min="0"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="cookTimeUnit">
              <Form.Control
                as="select"
                onChange={(event) => handleSelect(event)}
              >
                <option value="mins">mins</option>
                <option value="hours">hours</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Label>
              <strong>Ingredients:</strong>
            </Form.Label>
          </Form.Row>

          {selectedIngredients.map((selectedIngredient, index) => {
            // console.log(selectedIngredient);
            return (
              <Form.Row key={index}>
                <Form.Group as={Col} controlId="ingredient">
                  <Form.Control
                    as="select"
                    value={selectedIngredient.ingredient._id}
                    onChange={(event) => handleIngredientSelect(event, index)}
                    required
                  >
                    <option disabled value="">
                      Please select ingredient
                    </option>
                    {availableIngredients
                      .sort((a, b) => {
                        return a.ingredientName > b.ingredientName ? 1 : -1;
                      })
                      .map((ingredient) => {
                        // console.log(ingredient);
                        return (
                          <option
                            key={ingredient._id}
                            value={ingredient._id}
                            className="text-capitalize"
                          >
                            {ingredient.ingredientName}
                          </option>
                        );
                      })}
                  </Form.Control>
                </Form.Group>
                <Form.Group as={Col} controlId="quantity">
                  <Form.Control
                    type="number"
                    value={selectedIngredient.quantity}
                    placeholder="Quantity"
                    onChange={(event) => handleIngredientChange(event, index)}
                    required
                    min="0"
                    step="0.01"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="units">
                  <Form.Control
                    as="select"
                    value={selectedIngredient.units}
                    onChange={(event) => handleIngredientSelect(event, index)}
                  >
                    <option disabled value="">
                      Please select unit measurement
                    </option>
                    {selectedIngredient['unitOptions'].map((unit) => {
                      return (
                        <option key={unit} value={unit}>
                          {unit}
                        </option>
                      );
                    })}
                  </Form.Control>
                </Form.Group>
                {index === selectedIngredients.length - 1 && (
                  <Button
                    onClick={() => handleAddIngredient(index)}
                    variant="info"
                  >
                    +
                  </Button>
                )}
                {index !== selectedIngredients.length - 1 && (
                  <Button
                    onClick={() => handleDeleteIngredient(index)}
                    variant="info"
                  >
                    -
                  </Button>
                )}
              </Form.Row>
            );
          })}
          <ButtonToolbar>
            <Button
              onClick={() => {
                setOpenIngredientModal(true);
              }}
              variant="outline-secondary"
              size="sm"
            >
              Can't find the ingredient you are looking for? Click here to add
              more!
            </Button>
            <AddIngredientModal
              show={openIngredientModal}
              onHide={() => {
                setOpenIngredientModal(false);
              }}
              availableIngredients={availableIngredients}
            />
          </ButtonToolbar>
          <br />
          <Form.Row>
            <Form.Label>
              <strong>Cooking Instructions:</strong>
            </Form.Label>
          </Form.Row>
          {cookingInstructions.map((instruction, index) => {
            // console.log(instruction);
            return (
              <Form.Row key={index}>
                <Form.Group as={Col} xs={1}>
                  Step {index + 1}
                </Form.Group>
                <Form.Group as={Col} xs={10} controlId="instructions">
                  <Form.Control
                    as="textarea"
                    rows={1}
                    value={cookingInstructions[index]}
                    onChange={(event) => handleInstructionChange(event, index)}
                    required
                  />
                </Form.Group>
                {index === cookingInstructions.length - 1 && (
                  <Button
                    onClick={() => handleAddInstruction(index)}
                    variant="info"
                  >
                    +
                  </Button>
                )}
                {index !== cookingInstructions.length - 1 && (
                  <Button
                    onClick={() => handleDeleteInstruction(index)}
                    variant="info"
                  >
                    -
                  </Button>
                )}
              </Form.Row>
            );
          })}
          <br />
          <Row className="justify-content-md-center">
            <Col sm="auto">
              <Button variant="success" type="submit">
                Update Receipe
              </Button>
            </Col>
            {/* <Col sm="auto">
              <Button variant="danger" className="ml-1" onClick={handleReset}>
                Reset Form
              </Button>
            </Col> */}
          </Row>
        </Form>
      ) : (
        <Container
          className="d-flex justify-content-center"
          style={{ height: '90vh' }}
        >
          <div
            className="text-center align-self-center"
            // style={{ margin: "20% 0" }}
          >
            <Spinner animation="grow" />
            <h1>Loading form...</h1>
          </div>
        </Container>
      )}
    </Container>
  );
};
export default EditRecipePage;
