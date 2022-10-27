import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Badge, Button, Card } from "react-bootstrap";
import './components_css/faq.css'
const Faq = ({ faq }) => {
 
  // destructure faqs passed as prop to use directly (alternative pass in (faq) > props.faq.id)
  return (
    <Card className="my-2 p-3 rounded card_faq">
      <Card.Body>
        <Card.Title>
          <strong>{faq.title}</strong>
        </Card.Title>
        <Card className="card_text">
          <Card.Text as="div">
            <strong>{faq.description}</strong>
          </Card.Text>
        </Card>

        <Link to={`/faq/${faq._id}`} className="card_link">
          <Card.Title as="div">
            <Badge bg="warning">
              <strong>
                <i className="fa-solid fa-computer-mouse"></i>{" "}
                {faq.answers.length === 0
                  ? `${faq.answers.length} answer`
                  : `${faq.answers.length} answers`}
              </strong>
            </Badge>{" "}
          </Card.Title>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default Faq;
