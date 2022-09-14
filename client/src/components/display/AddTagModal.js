import axios from 'axios';
import { useState, Fragment } from 'react';
import { Modal, Button, Col, Row } from 'react-bootstrap';

const AddTagModal = (props) => {
  //   const [openIngredientModal, setOpenIngredientModal] = useState(false);
  const initialState = {
    tagName: '',
    tagCategory: '',
  };
  const [formData, setFormData] = useState(initialState);
  const catagories = [
    'Meal Type',
    'Ingredient',
    'Cuisine',
    'Seasonal',
    'Dish',
    'Drinks',
  ];

  const isFormFilled = () => {
    if (formData.tagName !== '' && formData.tagCategory !== '') {
      return true;
    } else {
      return false;
    }
  };

  const handleChange = (event) => {
    setFormData((state) => {
      return { ...state, [event.target.name]: event.target.value };
    });
  };

  const handleCancel = () => {
    setFormData(initialState);
    props.onHide();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log("axios call with", formData);
    axios
      .post('/tags/new', formData, { withCredentials: true })
      .then((response) => {
        // console.log("successful ingredient addition");
        setFormData({ tagName: '', tagCategory: '' });
        props.availableTags.push(response.data);
        props.onHide();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Modal
        show={props.show}
        onHide={props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Ingredient
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <label htmlFor="tagName">Tag Name:</label> <br />
            <input
              tagCategory="text"
              id="tagName"
              name="tagName"
              value={formData.tagName}
              onChange={(event) => handleChange(event)}
              required={true}
            />
            <br />
            <br />
            <label htmlFor="tagCategory">Tag Name:</label>
            <br />
            <select
              id="tagCategory"
              name="tagCategory"
              value={formData.tagCategory}
              onChange={(event) => handleChange(event)}
              required={true}
            >
              <option disabled value="">
                --Pls select--
              </option>
              {catagories.map((unit) => {
                // console.log(unit);
                return (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                );
              })}
              {/* <option value="solid">Solid</option>
              <option value="liquid">Liquid</option> */}
            </select>
            <br />
            <br />
            <Row>
              <Col sm="auto">
                <Button variant="danger" onClick={handleCancel}>
                  Cancel
                </Button>
              </Col>
              <Col sm="auto">
                {isFormFilled() ? (
                  <Button onClick={(event) => handleSubmit(event)}>
                    Add Ingredient
                  </Button>
                ) : (
                  ''
                )}
              </Col>
            </Row>
          </form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default AddTagModal;
