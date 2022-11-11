import React, { useEffect } from 'react';
import { Button, Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

import { listProducts } from '../actions/productActions';

import Message from './Message';
import Loader from './Loader';

function CategoryHeader() {
  const params = useParams();
  const dispatch = useDispatch();
  const keyword = params.keyword;
  const pageNumber = params.pageNumber || 1;

  useEffect(() => {
    // keyword from search functionality
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  const productList = useSelector((state) => {
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
                to={`/products/category/${category}`}
                className='link-container'
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
