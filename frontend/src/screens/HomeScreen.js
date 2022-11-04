import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';

import { listProducts } from '../actions/productActions';

import MainAdd from '../components/MainAdd';
import TopProducts from '../components/TopProducts';
import MostSearched from '../components/MostSearched';
import TopCategoryName from '../components/TopCategoryName';
import BottomAdd from '../components/SecondaryAdd';
import BottomAdd2 from '../components/SecondaryAdd2';

const HomeScreen = () => {
  const params = useParams();
  const keyword = params.keyword;
  const pageNumber = params.pageNumber || 1;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  useEffect(() => {
    // keyword from search functionality
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      {/* Do not show product carousel with top rated products on search page */}
      {!keyword ? (
        <>
          <MainAdd />
          <TopProducts />
          <MostSearched />
          <TopCategoryName />
        </>
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
      <Row>
        <Col>
          <BottomAdd />
        </Col>
        <Col>
          <BottomAdd2 />
        </Col>
      </Row>
    </>
  );
};

export default HomeScreen;
