import { ListGroup } from "react-bootstrap";

const InstructionList = (props) => {
  const listInstructions = props.instructions.map((step, index) => {
    return (
      <ListGroup.Item key={index}>
        <span>Step {index + 1}: </span>
        <span>{step}</span>
      </ListGroup.Item>
    );
  });

  return (
    <>
      <h2>Instructions</h2>
      <ListGroup variant="flush">{listInstructions}</ListGroup>
    </>
  );
};

export default InstructionList;
