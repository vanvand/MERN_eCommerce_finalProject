import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import {
  Button,
  Row,
  Col,
  Badge,
  Card,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "./Message";
import Loader from "./Loader";
import Paginate from "./Paginate";
import { listFaqs, deleteFaq, deleteFaqAnswer } from "../actions/faqActions";
import { FAQ_CREATE_RESET } from "../constants/faqConstants";
import { Link } from "react-router-dom";

const FaqList = () => {
  const params = useParams();
  const pageNumber = params.pageNumber || 1;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const faqList = useSelector((state) => state.faqList);
  const { loading, error, faqs, page, pages } = faqList;
  //console.log("faqs", faqs);

  const faqDelete = useSelector((state) => state.faqDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = faqDelete;

  const faqAnswerDelete = useSelector((state) => {
    //console.log("faqAnswerDelete", state.faqAnswerDelete);
    return state.faqAnswerDelete;
  });
  const {
    loading: loadingAnswerDelete,
    error: errorAnswerDelete,
    success: successAnswerDelete,
  } = faqAnswerDelete;

  //console.log("faqs", faqs);
  //console.log("faq",  faq);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: FAQ_CREATE_RESET });

    if (!userInfo || !userInfo.isAdmin) {
      navigate("/login");
    }

    if (successAnswerDelete) {
      navigate(`/faqList`);
    } else if (successDelete) {
      navigate(`/faqList`);
    } else {
      dispatch(listFaqs("", pageNumber));
    }
  }, [
    dispatch,
    navigate,
    successDelete,
    successAnswerDelete,
    pageNumber,
    userInfo,
  ]);

  const deleteHandler = (id) => {
    // show pop-up window to confirm delete action
    if (window.confirm("Are you sure?")) {
      dispatch(deleteFaq(id));
    }
  };

  const deleteFaqAnswerHandler = (ansId) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteFaqAnswer(ansId));
    }
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>FAQ/Help</h1>
          <Link to="/faq" className="btn btn-light">
            Go Back
          </Link>
        </Col>
      </Row>

      {(loadingDelete || loadingAnswerDelete || loading) && <Loader />}
      {(errorDelete || errorAnswerDelete || error) && (
        <Message variant="danger">{errorDelete}</Message>
      )}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Card>
            {faqs.map((faq) => (
              <Card key={faq._id}>
                <Card.Header>
                  <>
                    <h5>
                      <Badge bg="warning">Question</Badge>
                    </h5>
                    <h6>{faq.title}:</h6>
                    <p>{faq.description}</p>
                  </>
                </Card.Header>

                <Card.Body>
                  {
                    <>
                      <h5>
                        <Badge>Answers</Badge>
                      </h5>
                      <>
                        {faq.answers.map((answer) => (
                          <Card bg="Secondary " key={answer._id}>
                            <Card.Body>
                              <Card.Header key={answer._id}>
                                <>
                                  <h6>{answer.name}</h6>
                                  <p>{answer.comment}</p>{" "}
                                </>
                              </Card.Header>
                              <ListGroup>
                                <ListGroupItem key={answer._id}>
                                  <>
                                    <>
                                      <small>
                                        <strong>createdAt:</strong>

                                        {answer.createdAt.substring(10, 2)}
                                      </small>{" "}
                                      /{" "}
                                      <small>
                                        updatedAt:
                                        {answer.updatedAt.substring(10, 2)}
                                      </small>
                                      <LinkContainer
                                        to={`/faqList/${answer._id}`}
                                      >
                                        <Button
                                          variant="light"
                                          className="btn-sm"
                                          onClick={() => {
                                            console.log(answer._id);
                                            deleteFaqAnswerHandler(answer._id);
                                          }}
                                        >
                                          <i className="fas fa-trash"></i>
                                        </Button>
                                      </LinkContainer>
                                    </>
                                  </>
                                </ListGroupItem>
                              </ListGroup>
                            </Card.Body>
                          </Card>
                        ))}
                        <Card.Footer>
                          <LinkContainer to={`/faq/${faq._id}/edit`}>
                            <Button variant="light" className="btn-sm">
                              Edit Question <i className="fas fa-edit"> </i>
                            </Button>
                          </LinkContainer>

                          <Button
                            variant="light"
                            className="btn-sm"
                            onClick={() => deleteHandler(faq._id)}
                          >
                            Delete Question <i className="fas fa-trash"></i>
                          </Button>
                        </Card.Footer>
                      </>
                    </>
                  }
                </Card.Body>
              </Card>
            ))}
          </Card>
          <Paginate pages={pages} page={page} isAdmin={true} faqs={faqs} />
        </>
      )}
    </>
  );
};

export default FaqList;
