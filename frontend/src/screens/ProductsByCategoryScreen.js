import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import { getProductCategory } from "../actions/productActions";

const ProductsByCategory = () => {
  const params = useParams();
  const category = params.category;
  const pageNumber = params.pageNumber || 1;

  console.log(category);

  const dispatch = useDispatch();

  const productCategory = useSelector((state) => state.productCategory);
  console.log("from state...", productCategory);
  const { loading, error, products, page, pages } = productCategory;

  //console.log(productCategory);

  // console.log(productCategory);
  useEffect(() => {
    dispatch(getProductCategory(category, pageNumber));
  }, []);

  return (
    <>
      <Link to="/" className="btn btn-light">
        Go Back!
      </Link>

      <h1>{}</h1>

      {
        // if loading true display Loading message in HomeScreen component
        loading ? (
          <Loader />
        ) : // if error true display error message in HomeScreen component
        error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          // if loading false and no error show products
          <>
            <Row>
              
              {products.products &&
                products.products.map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    {" "}
                    {/* pass products as props to Product component */}
                    {<Product product={product} />}
                  </Col>
                ))}
            </Row>

            <Paginate
              /*  pass props in from state */
              pages={pages}
              page={page}
              keyword={category ? category : ""}
            />
          </>
        )
      }
    </>
  );
};

export default ProductsByCategory;
