import React, { useEffect } from 'react';
import { Button, Nav } from 'react-bootstrap';
import Message from './Message';
import Loader from './Loader';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';

import { listProducts } from '../actions/productActions';

function CategoryHeader() {
  const params = useParams();
  const dispatch = useDispatch();
  const pageNumber = params.pageNumber || 1;

  useEffect(() => {
    // keyword from search functionality
    dispatch(listProducts('', pageNumber));
  }, []);

  const productList = useSelector((state) => state.productList);
  const { loading, error, allProductsCategory } = productList;

  const categories = [
    ...new Set(
      allProductsCategory.map((product) => {
        return product.category;
      })
    ),
  ];

  const categoryHandler = (category) => {
    console.log('handler');
    dispatch(listProducts(category, pageNumber));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Nav className='ml-auto category-nav'>
          {categories &&
            categories.map((category, index) => (
              <Link
                key={index}
                className='link-container'
                onClick={() => categoryHandler(category)}
                to={`/products/category/${category}`}
              >
                <Button
                  variant='light'
                  type='submit'
                  className='btn-category-nav'
                >
                  {category}
                </Button>
              </Link>
            ))}
        </Nav>
      )}
    </>
  );
}

export default CategoryHeader;
