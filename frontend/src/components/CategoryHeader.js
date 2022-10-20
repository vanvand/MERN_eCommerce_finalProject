import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import "./components_css/categoryHeader.css";
import { Link } from "react-router-dom";
import Message from "./Message";
import Loader from "./Loader";
import {useSelector } from "react-redux";

function CategoryHeader () {
  const productList = useSelector((state) => state.productList);
  const { loading, error, products} = productList;

  
  const categories = products.map((product) => {
    return product.category;
  });
    const filterCategory = categories.reduce(
      (acc, categoryName) =>
        acc.includes(categoryName) ? acc : [...acc, categoryName],
      []
    );

  //console.log(" filterCategory", filterCategory);
 

  return (
    <Container className=" square border-bottom  sticky ">
      {
        loading ? (
          <Loader />
        ) : 
        error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Row d-flex="true" flex-row="true">
            {filterCategory.length > 0 &&
              filterCategory.map((category, index) => (
                <Col key={index} className="alignStart">
                  <Link
                    to={`/products/category/${category.toLowerCase()}`}
                    className=" linkStyling "
                  >
                    {category}
                  </Link>
                </Col>
              ))}
          </Row>
        )
      }
    </Container>
  );
}

export default CategoryHeader;
