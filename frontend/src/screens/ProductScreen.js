import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Button, Form, Carousel } from 'react-bootstrap';

import Loader from '../components/Loader';
import Message from '../components/Message';
import Rating from '../components/Rating';
import UserDetails from '../components/UserDetails';

import {
  addWishItem,
  getUserDetailsProductCreator,
} from '../actions/userActions';
import {
  listProductDetails,
  createProductReview,
} from '../actions/productActions';
import { accessChat } from '../actions/chatActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';

const ProductScreen = () => {
  const params = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [showMore, setShowMore] = useState(false);

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const { recent_chat } = useSelector((state) => state.recentChat);

  const selectedChat = useSelector((state) => state.selectedChat);
  const { currentChat } = selectedChat;

  const userDetails = useSelector((state) => state.userDetails);
  const {
    loading: loadingUserDetails,
    error: errorUserDetails,
    user,
  } = userDetails;

  const userDetailsProductCreator = useSelector(
    (state) => state.userDetailsProductCreator
  );
  const {
    loading: loadingUserDetailsProductCreator,
    error: errorUserDetailsProductCreator,
    userProductCreator,
  } = userDetailsProductCreator;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingProductReview,
    error: errorProductReview,
    success: successProductReview,
  } = productReviewCreate;

  const productDescription = String(product.description);

  useEffect(() => {
    if (successProductReview) {
      alert('Review Submitted!');
      setRating(0);
      setComment('');
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(params.id));
  }, [dispatch, params, successProductReview, productDescription]);

  useEffect(() => {
    if (product.user) {
      dispatch(getUserDetailsProductCreator(product.user));
    }
  }, [dispatch, product, product.user]);

  const requestUserChat = () => {
    let selectedUser = userProductCreator;
    let currentUser = user;
    dispatch(accessChat(selectedUser, recent_chat, currentUser, product));
    navigate(`/chat`);
  };

  const addToWishlist = () => {
    console.log('Added to Wishlist');
    dispatch(addWishItem(params.id));
    if (userInfo) {
      navigate(`/wishlist`);
    } else {
      navigate(`/login`);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(params.id, {
        rating,
        comment,
      })
    );
  };

  const redirectToLogin = () => {
    navigate('/login');
  };

  return (
    <>
      {loadingUserDetails && <Loader />}
      {errorUserDetails && (
        <Message variant='danger'>{errorUserDetails}</Message>
      )}
      {loadingUserDetailsProductCreator && <Loader />}
      {errorUserDetailsProductCreator && (
        <Message variant='danger'>{errorUserDetailsProductCreator}</Message>
      )}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>

          {/* Image Slider */}
            <Col md={6}>
              {!product.imageSecond && !product.imageThird ? (
                <Carousel interval={null}>
                  <Carousel.Item>
                    <img
                      className='d-block w-75'
                      src={product.image}
                      alt='First slide'
                    />
                  </Carousel.Item>
                </Carousel>
              ) : (
                <Carousel variant='dark' interval={null}>
                  <Carousel.Item>
                    <img
                      className='d-block w-75'
                      src={product.image}
                      alt='First slide'
                    />
                  </Carousel.Item>
                  {product.imageSecond && (
                    <Carousel.Item>
                      <img
                        className='d-block w-75'
                        src={product.imageSecond}
                        alt='Second slide'
                      />
                    </Carousel.Item>
                  )}
                  {product.imageThird && (
                    <Carousel.Item>
                      <img
                        className='d-block w-75'
                        src={product.imageThird}
                        alt='Third slide'
                      />
                    </Carousel.Item>
                  )}
                </Carousel>
              )}
            </Col>
          
          {/* Product Info Box */}
            <Col md={5} className="product-info-col">
              <ListGroup variant='flush' >
                <ListGroup.Item>
                  <i className='fas fa-location-dot'></i>{' '}
                  {userProductCreator.city}, {userProductCreator.district}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h4 className="h4-product-screen">{product.name}</h4>

                  <div style={{ marginBottom: '0.7rem' }}>
                    <Rating
                      value={product.rating}
                      text={`${product.numReviews} reviews`}
                    />
                  </div>

                  {/* product description with toggle button for read more when description longer than 230 characters */}
                  {showMore
                    ? productDescription
                    : `${productDescription.substring(0, 230)}`}
                  {productDescription.length > 230 && (
                    <Button
                      className='btn-light btn-custom btn-sm'
                      style={{
                        padding: '0 10px',
                        marginLeft: '0.5rem',
                      }}
                      onClick={() => setShowMore(!showMore)}
                    >
                      {showMore ? 'Show less' : 'Show more'}
                    </Button>
                  )}

                  <div className='d-grid gap-2'>
                    {!userInfo && (
                      <Button
                        onClick={redirectToLogin}
                        className='btn-dark'
                        style={{ marginTop: '2rem' }}
                        type='button'
                        disabled={product.availability === false}
                      >
                        {product.availability ? (
                          <span>
                            <i className='fas fa-check'></i> Available for rent
                          </span>
                        ) : (
                          <span>
                            <i className='fas fa-pause-circle'></i> Currently
                            Rented
                          </span>
                        )}
                      </Button>
                    )}

                    {userInfo && (
                      <>
                        <Button
                          onClick={requestUserChat}
                          className='btn-dark'
                          style={{ marginTop: '2rem' }}
                          type='button'
                          disabled={product.availability === false}
                        >
                          {/* {product.availability && currentChat.isRequired ? (
                            <i className='px-2 fa-solid fa-rotate'></i>
                          ) : !product.availability &&
                            !currentChat.isRequired ? (
                            <i className='px-2 fa-solid fa-circle-check'></i>
                          ) : (
                            <i className='px-2 fa-solid fa-rotate'></i>
                          )}

                          {product.availability && !required
                            ? 'Mark as rented to UserName'
                            : 'Rented'} */}

                          {product.availability ? (
                            <span>
                              <i className='fas fa-message'></i> Request
                            </span>
                          ) : (
                            <span>
                              <i className='fas fa-pause-circle'></i> Currently
                              Rented
                            </span>
                          )}
                        </Button>

                        <Button
                          onClick={addToWishlist}
                          className='btn-light btn-custom'
                          type='button'
                        >
                          <span>
                            <i className='fas fa-heart'></i> Add to Wishlist
                          </span>
                        </Button>
                      </>
                    )}
                  </div>

                  <div style={{ paddingTop: '3rem' }}>
                    <UserDetails user={userProductCreator} />
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <h2>Reviews</h2>

              {/* Message when no reviews */}
              {product.reviews.length === 0 && <Message>No Reviews</Message>}

              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}

                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>

                  {successProductReview && (
                    <Message variant='success'>
                      Review submitted successfully
                    </Message>
                  )}

                  {loadingProductReview && <Loader />}

                  {errorProductReview && (
                    <Message variant='danger'>{errorProductReview}</Message>
                  )}

                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingProductReview}
                        type='submit'
                        variant='primary'
                        style={{ marginTop: '1rem' }}
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a review{' '}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
