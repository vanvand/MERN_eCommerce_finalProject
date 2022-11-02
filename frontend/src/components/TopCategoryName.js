import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card, Button } from 'react-bootstrap';
import Loader from './Loader';
import Message from './Message';
import { listTopCategoryName } from '../actions/productActions';
import Product from './Product';
import { Link } from 'react-router-dom';
import Rating from 'react-rating-tooltip';
import './components_css/product.css';
import { LinkContainer } from 'react-router-bootstrap';

const TopCategoryName = () => {
  const dispatch = useDispatch();

  const productTopCategoryName = useSelector((state) => {
    //console.log(state);
    return state.productTopCategoryName;
  });
  const { loading, error, products } = productTopCategoryName;

  //console.log("products", products);

  useEffect(() => {
    dispatch(listTopCategoryName());
  }, [dispatch]);

  const category = [
    ...new Set(
      products.map((product) => {
        return product.category;
      })
    ),
  ];

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        // else can only have one element, so wrap in fragment
        <>
          <h3>Top Category Name</h3>{' '}
          <Row>
            {products.map((product, index) => (
              <Col sm={12} md={6} lg={4} xl={3} key={index}>
                {/* pass products as props to Product component */}
                <Product product={product} />
              </Col>
            ))}
            <Row>
              <Col md={{ span: 2, offset: 10 }}>
                <LinkContainer
                  to={`/products/category/${category}`}
                  className='m-3 '
                >
                  <Button className='btn-sm pull-right ' variant='dark'>
                    {category}
                  </Button>
                </LinkContainer>
              </Col>
            </Row>
          </Row>
        </>
      )}
    </>
  );
};

export default TopCategoryName;
