import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Card, Button, Form } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";
import { listFaqDetails, createFaqAnswer } from "../actions/faqActions";
import { FAQ_CREATE_ANSWER_RESET } from "../constants/faqConstants";


const FaqDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");

  const faqDetails = useSelector((state) => {
    //console.log("faqDetails", state.faqDetails);
    return state.faqDetails;
  });
  const { loading, error, faq } = faqDetails;

  const faqAnswersCreate = useSelector((state) => {
    //console.log("faqAnswersCreate", state.faqAnswersCreate);
    return state.faqAnswersCreate;
  });
  const {
    loading: loadingFaqAnswer,
    error: errorFaqAnswer,
    success: successFaqAnswer,
  } = faqAnswersCreate;

  const userLogin = useSelector((state) => {
    //console.log("userLogin", state.userLogin);

    return state.userLogin;
  });
  const { userInfo } = userLogin;

  useEffect(() => {
    if (successFaqAnswer) {
     

      setComment("");
      dispatch({ type: FAQ_CREATE_ANSWER_RESET });
    }
    dispatch(listFaqDetails(params.id));
  }, [dispatch, params, successFaqAnswer]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createFaqAnswer(params.id, { comment }));
  };
  //console.log("faq.answers", faq.answers);
  return (
    <>
      <Link className="btn btn-light my-3" to="/faq">
        Go Back
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Card>
            <Card.Body>
              <Card.Title>
                <h4>{faq.title}?</h4>
              </Card.Title>
              <Card.Text>{faq.description}</Card.Text>
            </Card.Body>
          </Card>

          <Row>
            <Col>
              <h2>Answers</h2>

              {/* Message when no answers */}
              {faq.answers.length === 0 && (
                <Message variant="danger">No answers</Message>
              )}
              {/* <FaqAnswer answers={faq.answers} /> */}
              <ListGroup>
                {faq.answers.map((answer) => (
                  <ListGroup key={answer._id}>
                    <ListGroup.Item>
                      <p>{answer.createdAt.substring(0, 10)}</p>
                      {answer.name}

                      <p>{answer.comment}</p>
                    </ListGroup.Item>
                  </ListGroup>
                ))}

                <h2>Write an answer</h2>
                {successFaqAnswer && (
                  <Message variant="success">submitted successfully</Message>
                )}

                {loadingFaqAnswer && <Loader />}

                {errorFaqAnswer && (
                  <Message variant="danger">{errorFaqAnswer}</Message>
                )}
                {userInfo ? (
                  <Form onSubmit={submitHandler}>
                    <Form.Group controlId="comment">
                      <Form.Control
                        as="textarea"
                        row="3"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                    <Button type="submit" variant="primary">
                      Submit
                    </Button>
                  </Form>
                ) : (
                  <Message>
                    Please <Link to="/login">sign in</Link> to write an answer{" "}
                  </Message>
                )}
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default FaqDetails;
