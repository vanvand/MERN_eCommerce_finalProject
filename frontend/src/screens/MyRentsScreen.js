import React, { useEffect, useState } from 'react';
import { Col, Row, Container, Button, Card } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getUserDetails } from '../actions/userActions';
import '../components/components_css/myAddScreen.css';
import { Link } from 'react-router-dom';
import { listProducts } from '../actions/productActions';
import { LinkContainer } from 'react-router-bootstrap';
import { deleteRentedItem } from "../actions/userActions";

export default function UserRentedScreen() {
  const [rentedProducts, setRentedProducts] = useState();

  
  const userDetails = useSelector((state) => state.userDetails);
  const { loading: userLoading, error: userError, user } = userDetails;
  
  const dispatch = useDispatch();
  const productDelete = useSelector((state) => {
      // console.log("productDelete", state.productDelete);
      
      return state.productDelete;
    });
    const { success: deleteSuccess } = productDelete;
    
    const productList = useSelector((state) => {
        //console.log(state.productList);
        return state.productList;
    });
    const { loading: productLoading, error, allProductsCategory } = productList;
    //console.log(allProductsCategory);
    useEffect(() => {
      const filteredList = productList.allProductsCategory.filter((product) => {
     return product.rentedTo === userDetails.user._id})
      setRentedProducts(filteredList);
    },[productList, userDetails])
    console.log('user Details', userDetails.user._id);
    console.log( 'prodlist', productList.allProductsCategory);
    
    console.log('rented', rentedProducts);
  const productUpdate = useSelector((state) => {
    // console.log('state.productUpdat',state);
    return state.productUpdate;
  });
  const { product: productUpdatesuccess } = productUpdate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, loading } = userLogin;

  const userDeleteRentedItem = useSelector((state) => {
    console.log('state',state);
    return state.userDeleteRentedItem
  });
  const {rentedItems} = userDeleteRentedItem

  useEffect(() => {
    dispatch(listProducts());
  }, [rentedItems, dispatch]);

  useEffect(() => {
    if (!user || !user.name) {
      dispatch(getUserDetails(userInfo._id));
    }
  }, [dispatch, user, userInfo]); 


  const deleteHandler = (productId) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteRentedItem(productId))
    }
  };


  return (
    <>
      {userLoading && productLoading && loading && <Loader />}
      {userError && <Message variant='danger'>{userError}</Message>}
      {productLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Container>
          <Row className=' flex-md-row  ' md={2}>
            <Col>
              {/* <UserDetails /> */}
            </Col>
          </Row>

          <Row className=' flex-md-row  '>
            {rentedProducts?.map((product) => (
              <>
                {user._id === product.user && user._id === userInfo._id && (
                  <Card className='my-2 p-3 rounded ' key={product._id} border="light">
                    <Row>
                      <Col sm={12} lg={3}>
                        {' '}
                        <Link to={`/product/${product._id}`}>
                            <Card>
                              <Card.Img
                                src={product.image}
                                variant='top'
                                className='productImage opacity-25 userAddImage'
                              />
                              <Card.ImgOverlay>
                                <div className=' bg-dark mt-5 p-1 text-center text-danger'>
                                  <h6 className='fa-solid fa-rotate'>Rented</h6>
                                </div>
                              </Card.ImgOverlay>
                            </Card>
                          
                        </Link>
                      </Col>
                      <Col sm={12} lg={7}>
                        <Card.Body>
                          <Card.Text as='h6'>{product.category}</Card.Text>

                          <Link to={`/product/${product._id}`}
                          className="text-decoration-none">
                            <Card.Title as='h5' className=' mb-3'>
                              {product.name}
                            </Card.Title>
                          </Link>

                          <Card.Text as='h6' className='productText'>
                            {/* Created on: {product.createdAt.substring(0, 10)} */}
                          </Card.Text>
                          <Card.Text as='h6'>
                            ({product.timesRented})Times rented
                          </Card.Text>
                        </Card.Body>
                      </Col>
                      <Col sm={12} lg={2}>
                        <Row>
                          <LinkContainer to={`/products/${product._id}/edit`}>
                            <Button variant='dark' className="btn-sm mb-1 btn-custom-cta"
                        >
                              <i className='fas fa-comment'></i> Chat
                            </Button>
                          </LinkContainer>

                          
                          <Button
                            variant='dark'
                            className="btn-sm mb-1 btn-custom-cta"
                        
                            onClick={() => deleteHandler(product._id)}
                          >
                            <i className='fas fa-rotate-left'></i> Is Returned
                          </Button>
                        </Row>
                      </Col>
                    </Row>
                  </Card>
                )}
              </>
            ))}
          </Row>
        </Container>
      )}
    </>
  );
}  