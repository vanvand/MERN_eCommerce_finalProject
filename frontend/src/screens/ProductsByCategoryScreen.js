import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import { listProducts } from "../actions/productActions";

const ProductsByCategory = () => {
  const params = useParams();
  const keyword = params.keyword;

  const pageNumber = params.pageNumber || 1;
  const dispatch = useDispatch();

  const productList = useSelector((state) => {
    console.log(state.productList);
    return state.productList
  });
  const { loading, error, products, page, pages } = productList;

  // console.log("products", products);
  // console.log("productsCategory", productsCategory);
  console.log("keyword", keyword);

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
    // keyword from search functionality
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Link to="/" className="btn btn-light">
        Go Back
      </Link>
      {
        // if loading true display Loading message in HomeScreen component
        loading ? (
          <Loader />
        ) : // if error true display error message in HomeScreen component
        error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            <Row>
              <h1>
                {keyword && keyword !== "undefined"
                  ? keyword
                  : "No match Product"}
              </h1>
              {products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <h5 key={product._id}>just for testing: {product.category}</h5>

                  {/* pass products as props to Product component */}
                  <Product product={product} />
                </Col>
              ))}
            </Row>

            {
              <Paginate
                /*  pass props in from state */
                pages={pages}
                page={page}
                keyword={keyword ? keyword : ""}
              />
            }
          </>
        )
      }
    </>
  );
};

export default ProductsByCategory;
