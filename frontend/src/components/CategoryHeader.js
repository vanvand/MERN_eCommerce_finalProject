import React, { useState } from "react";
import {
  Container,
  Col,
  Row,
  Form,
  Button,
  Nav,
  Navbar,
} from "react-bootstrap";
import "./components_css/categoryHeader.css";
import Message from "./Message";
import Loader from "./Loader";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function CategoryHeader() {
  const productList = useSelector((state) => {
    //console.log("state.productList", state.productList);
    return state.productList;
  });
  const { loading, error, allProductsCategory } = productList;

  const categories = [
    ...new Set(
      allProductsCategory.map((product) => {
        return product.category;
      })
    ),
  ];

  return (
    <Container className=" square border-bottom  sticky ">
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Nav className="ml-auto ">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={`/products/category/${category}`}
              className=" linkStyling "
            >
              <Button
                variant="outline-light"
                size="xs"
                type="submit"
                className="p-0 categoryBut"
              >
                {category}
              </Button>
            </Link>
          ))}
        </Nav>
      )}
    </Container>
  );
}

export default CategoryHeader;
