import { Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Fragment } from "react";

const TagList = (props) => {
  // console.log(props.tags);
  const listTags = props.tags
    .sort((a, b) => (a.tagName > b.tagName ? 1 : -1))
    .map((tag) => {
      return (
        <Fragment key={tag._id}>
          <Link to={`/browse?tag=${tag._id}`}>
            <Badge
              pill
              variant="success"
              key={tag._id}
              className="text-capitalize"
            >
              {tag.tagName}
            </Badge>
          </Link>
        </Fragment>
      );
    });

  return (
    <>
      <h2>Tags</h2>
      {listTags}
    </>
  );
};

export default TagList;
