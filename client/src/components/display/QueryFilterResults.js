import { useState, useEffect } from "react";
import { Container, Col, Row, Accordion, Card, Spinner } from "react-bootstrap";
import QueryResultsDisplay from "./QueryResultsDisplay";
import axios from "axios";

const QueryFilterResults = (props) => {
  // console.log(props.queryResults);

  const [tagData, setTagData] = useState([
    {
      _id: "",
      tag: [{ tagName: "", tagID: "" }],
    },
  ]);
  const [filterTarget, setFilterTarget] = useState([]);
  // const [filteredResults, setFilteredResults] = useState([]);
  // console.log(filteredResults);

  useEffect(() => {
    axios
      .get("/tags/group") // axios call for tags
      .then((response) => {
        // console.log(response.data);
        setTagData([...response.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const filtering = () => {
    let results = props.queryResults;
    let target = [];
    // console.log("results:");
    // console.log(results);
    // console.log("filterTarget.length:" + filterTarget.length);
    if (filterTarget.length === 0) {
      target = results;
    } else {
      results.map((recipe) => {
        // console.log(recipe.tags);

        // pull out all the tagID and store in array
        let tagIDArr = [];
        recipe.tags.map((tag) => {
          // console.log(tag);
          tagIDArr.push(tag._id);
          return null;
        });
        // console.log(tagIDArr);

        // check if tagID array contains all the filter tag
        let isIncludeTarget = filterTarget.every((target) =>
          tagIDArr.includes(target)
        );
        // console.log(isIncludeTarget);

        // push to target is recipe contain all the filter
        if (isIncludeTarget) {
          target.push(recipe);
        }
        return null;
      });
    }
    // console.log("target:");
    // console.log(target);
    // setFilteredResults(target);
    return target;
  };

  const handleChange = (event) => {
    // console.log(event.target.value);
    if (event.target.checked === true) {
      // console.log("added " + event.target.value);
      const newFilter = [...filterTarget, event.target.value];
      setFilterTarget(newFilter);
    } else {
      // console.log("removed " + event.target.value);
      const cloneArr = [...filterTarget];
      const index = cloneArr.indexOf(event.target.value);
      cloneArr.splice(index, 1);
      setFilterTarget(cloneArr);
    }
  };

  const displayTags = tagData
    .sort((a, b) => (a._id > b._id ? 1 : -1))
    .map((category) => {
      // console.log(category);
      return (
        <Col key={category._id}>
          <h4 className="text-capitalize">{category._id}</h4>
          {category.tag
            .sort((a, b) => (a.tagName > b.tagName ? 1 : -1))
            .map((tag) => {
              return (
                <Col key={tag.tagID}>
                  <label>
                    <Row>
                      <Col sm="auto">
                        <input
                          type="checkbox"
                          name={tag.tagID}
                          value={tag.tagID}
                          key={tag.tagID}
                          onChange={(e) => handleChange(e)}
                        />
                      </Col>
                      <Col sm="auto" className="text-capitalize">
                        {tag.tagName}
                      </Col>
                    </Row>
                  </label>
                </Col>
              );
            })}
        </Col>
      );
    });

  return (
    <Container>
      {/* <h2>Select Filter:</h2> */}

      {/* <Row>{displayTags}</Row> */}
      <Accordion defaultActiveKey="0">
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="1">
            <h4 className="text-center">Click To Add Filter</h4>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body as={Row}>{displayTags}</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>

      {/* <QueryResultsDisplay filteredResults={filtering()} /> */}

      {props.recipeDataReturned ? (
        <QueryResultsDisplay filteredResults={filtering()} />
      ) : (
        <Container className="text-center align-self-center">
          <Spinner animation="grow" />
          <h1>Fetching Results...</h1>
        </Container>
      )}
    </Container>
  );
};

export default QueryFilterResults;
