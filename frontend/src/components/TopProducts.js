import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col
} from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";
import {
  listTopProducts
} from "../actions/productActions";
import Product from "./Product";

const TopProducts = () => {
  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error, products } = productTopRated;
  console.log("products", products);

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        // else can only have one element, so wrap in fragment
        <>
          <h3>Top Products</h3>{" "}
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                {/* pass products as props to Product component */}
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default TopProducts;
