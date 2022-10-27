import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import "./components_css/categoryHeader.css";


import { Link } from "react-router-dom";
function CategoryHeader() {
  const category = ["Tools", "Books", "Clothes"];
  return (
    <Container className=" square border-bottom  sticky ">
      <Row d-flex flex-row>
        {category.map((name, index) => (
          <Col key={index} className="alignStart">
            <Link to={`/${name}`} className=" linkStyling ">
              {name}
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default CategoryHeader;
