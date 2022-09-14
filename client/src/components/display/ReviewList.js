import { Card, Row, Col } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import dayjs from "dayjs";

const ReviewList = (props) => {
  // console.log(props);

  const listReviews = props.reviews.map((review) => {
    const date = dayjs(review.createdAt).format("DD/MM/YYYY");
    // console.log(date);

    return (
      <Card key={review.userID._id}>
        <Card.Body>
          <Row>
            <Col sm="auto">
              <Card.Title>
                <ReactStars
                  value={review.userRating}
                  isHalf={true}
                  edit={false}
                />
              </Card.Title>
              {date}
              <Card.Title>{review.userID.username}</Card.Title>
            </Col>
            <Col>
              <Card.Text>{review.userReview}</Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  });

  return <>{listReviews}</>;
};

export default ReviewList;
