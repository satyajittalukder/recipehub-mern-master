import { useState, useEffect } from "react";
import { Container, Button, Form, InputGroup } from "react-bootstrap";
import axios from "axios";
import QueryFilterResults from "./QueryFilterResults.js";

const QueryForm = (props) => {
  const queryKeyword = new URLSearchParams(window.location.search).get(
    "keyword"
  );

  const [formData, setFormData] = useState({ keyword: queryKeyword || "" });
  const [queryResults, setQueryResults] = useState([
    // {
    //   _id: "",
    //   tags: [],
    //   recipeName: "",
    //   description: "",
    //   avgRating: 1,
    //   imageURL: "",
    // },
  ]);
  const [recipeDataReturned, setRecipeDataReturned] = useState(false);

  const apiurl = `/recipes?keyword=${formData.keyword}`;
  // console.log(apiurl);

  useEffect(() => {
    axios
      .get(apiurl)
      .then((response) => {
        // console.log(response.data);
        setQueryResults([...response.data]);
        setRecipeDataReturned(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [apiurl]);

  const handleChange = (event) => {
    setFormData((state) => {
      return {
        ...state,
        [event.target.name]: event.target.value.toLowerCase(),
      };
    });
  };

  const handleClick = (event) => {
    // console.log("clicked");
    setRecipeDataReturned(false);

    axios
      .get(apiurl)
      .then((response) => {
        // console.log(response.data);
        setQueryResults([...response.data]);
        setRecipeDataReturned(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // console.log(formData);

  return (
    <Container>
      {/* <h2>You are searching for... {formData.keyword}</h2> */}
      <br />
      <InputGroup>
        <Form.Control
          type='text'
          name='keyword'
          value={formData.keyword}
          placeholder='Enter Keyword'
          onChange={(e) => handleChange(e)}
        />
        <InputGroup.Append>
          <Button onClick={(e) => handleClick(e)}>Search</Button>
        </InputGroup.Append>
      </InputGroup>
     
      <QueryFilterResults
        queryResults={queryResults}
        recipeDataReturned={recipeDataReturned}
      />
    </Container>
  );
};

export default QueryForm;
