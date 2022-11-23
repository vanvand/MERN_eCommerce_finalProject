import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Card, Image } from 'react-bootstrap';

import { listProducts } from '../actions/productActions';

import TopProducts from '../components/TopProducts';
import MostSearched from '../components/MostSearched';
import TopCategoryName from '../components/TopCategoryName';
import BannerAds from '../components/BannerAds';

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
      {!keyword ? (
        <>
          {/* Hero Banner */}
          <Row>
            <Col>
              <Card className='mb-3 hero-banner' md={4} border='light'>
                <Image
                  src='../../../uploads/banner-hero.png'
                  className='hero-banner-md'
                />
                <Image
                  src='../../../uploads/banner-hero-xs.png'
                  className='hero-banner-xs'
                />
              </Card>
            </Col>
          </Row>

          <TopProducts />
          <MostSearched />
          <TopCategoryName />
        </>
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}

      <BannerAds />
    </>
  );
};

export default HomeScreen;
