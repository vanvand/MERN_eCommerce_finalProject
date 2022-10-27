import React from "react";
import { Container, Row, Col} from "react-bootstrap";
import { Link } from "react-router-dom";
import './components_css/mostSearched.css'
function MostSearched() {
  const mostSearched = [
    "Searched",
    "Searched",
    "Searched",
    "Searched",
    "Searched",
    "Searched",
 
  ];
  return (
    <Container className=" square border-bottom  bar-background-color">
      <h3>Most Searched</h3>
      <Row d-flex flex-row>
        {mostSearched.map((name, index) => (
          <Col key={index} className="alignStart">
            <Link to={`/${name}`} className="linkStylingSearch">
              {name}
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default MostSearched;
