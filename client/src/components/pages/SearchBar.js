import { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";

const SearchBar = () => {
  const [keyword, setKeyword] = useState("");
  // const queryStr = `/search?keyword=${keyword}`;

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   console.log(queryStr);
  //   return <Redirect to={queryStr} />;
  // };

  return (
    <Form action={`/search`} inline>
      <InputGroup>
        <Form.Control
          name="keyword"
          type="text"
          placeholder="Quick Search"
          value={keyword}
          onChange={(e) => handleChange(e)}
        />
        <InputGroup.Append>
          <Button
            type="submit"
            variant="outline-info"
            disabled={keyword === "" ? true : false}
          >
            Search
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </Form>
  );
};
export default SearchBar;
