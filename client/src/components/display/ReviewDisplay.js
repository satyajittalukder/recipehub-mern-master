import ReviewList from "./ReviewList";
import { Container, Row } from "react-bootstrap";

const ReviewDisplay = (props) => {
  const NoReview = () => {
    return (
      <Row className="justify-content-md-center">
        <h4>No Review Found</h4>
      </Row>
    );
  };

  return (
    <Container>
      <h2>Reviews</h2>

      {props.reviews.length === 0 ? (
        <NoReview />
      ) : (
        <ReviewList reviews={props.reviews} />
      )}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </Container>
  );
};

export default ReviewDisplay;
