import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "./Message";
import Loader from "./Loader";
import FormContainer from "./FormContainer";

import { listFaqDetails, updateFaq } from "../actions/faqActions";
import { FAQ_UPDATE_RESET } from "../constants/faqConstants";

const FaqCreate = () => {
  const params = useParams();
  const faqId = params.id;
  //console.log("faqId", faqId);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  //console.log("title, description", title, description);

  const dispatch = useDispatch();

  const faqDetails = useSelector((state) => {
    //console.log("faqDetails", state.faqDetails);

    return state.faqDetails;
  });
  const { loading, error, faq } = faqDetails;

  const faqUpdate = useSelector((state) => {
    //console.log("faqUpdate", state.faqUpdate);
    return state.faqUpdate;
  });
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = faqUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: FAQ_UPDATE_RESET });
      navigate("/faq");
    } else {
      if (!faq.title || faq._id !== faqId) {
        dispatch(listFaqDetails(faqId));
      } else {
        setTitle(faq.title);
        setDescription(faq.description);
      }
    }
  }, [navigate, faq, faqId, dispatch, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateFaq({
        _id: faqId,
        title,
        description,
      })
    );
  };

  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Add FAQ</h1>

        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler} className="form-group">
            <Form.Group controlId="name">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                placeholder="Enter FAQ title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                type="text"
                placeholder="Enter question"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Post the FAQ
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default FaqCreate;
