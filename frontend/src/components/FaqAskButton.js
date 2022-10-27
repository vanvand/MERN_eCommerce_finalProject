import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listFaqs, createFaq } from "../actions/faqActions";
import { FAQ_CREATE_RESET } from "../constants/faqConstants";

const FaqAskButton = () => {
  const params = useParams();
  const pageNumber = params.pageNumber || 1;

  const navigate = useNavigate();
  const dispatch = useDispatch();

 

  const faqDetails = useSelector((state) => state.faqDetails);
  const {

    success: successDelete,
  } = faqDetails;

  const faqCreate = useSelector((state) => state.faqCreate);
  const {
    success: successCreate,
    faq: createdFaq,
  } = faqCreate;

  //console.log("createdFaq", createdFaq);

  useEffect(() => {
    dispatch({ type: FAQ_CREATE_RESET });

    if (successCreate) {
      navigate(`/faq/${createdFaq?._id}/edit`);
    } else {
      dispatch(listFaqs("", pageNumber));
    }
  }, [
    dispatch,
    navigate,
    successDelete,
    successCreate,
    createdFaq,
    pageNumber,
  ]);

  const createQuestionHandler = () => {
    dispatch(createFaq());
  };

  return (
    <>
      <Row className="align-items-center">
        <Col className="text-right">
          <Button className="my-3" onClick={createQuestionHandler}>
            <i className="fa-solid fa-person-circle-question"></i> ASK Question
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default FaqAskButton;
