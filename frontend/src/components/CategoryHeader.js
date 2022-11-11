import React from 'react';
import { Button, Nav } from 'react-bootstrap';
import Message from './Message';
import Loader from './Loader';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

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
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Nav className='ml-auto category-nav'>
          {categories.map((category, index) => (
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
