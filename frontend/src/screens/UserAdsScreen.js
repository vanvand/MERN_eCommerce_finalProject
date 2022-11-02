import React, { useEffect, useState } from "react";
import {
  Col,
  ListGroup,
  Row,
  Image,
  Container,
  Button,
  Card,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Product from "../components/Product";
import { getUserDetails } from "../actions/userActions";
import "../components/components_css/myAddScreen.css";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteProduct,
  listProductDetails,
  updateProduct,
  listProducts,
  listProductDetailsByUserId
} from "../actions/productActions";
import { LinkContainer } from "react-router-bootstrap";
import { PRODUCT_UPDATE_SUCCESS } from "../constants/productConstants";
import UserDetails from "../components/UserDetails";

export default function UserAdsScreen() {
  const navigate = useNavigate();

  const [availability, setAvailability] = useState();
  const [product, setProduct] = useState();
  const [productId, setProductId] = useState();
      const [numAdsUser, setNumAdsUser] = useState(0);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => {
    //console.log(state.userLogin);
    return state.userLogin;
  });

  const { loading, error, userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading: userLoading, error: userError, user } = userDetails;

  const productDelete = useSelector((state) => {
    console.log("productDelete", state.productDelete);

    return state.productDelete;
  });
   const { success:deleteSuccess } = productDelete;

  const productList = useSelector((state) => {
    //console.log(state.productList);
    return state.productList;
  });
  const {
    loading: productLoading,
    error: errorLoading,
    allProductsCategory,
  } = productList;
  //console.log(allProductsCategory);

  const productUpdate = useSelector((state) => {
    //console.log('state.productUpdat',state);
    return state.productUpdate;
  });
  const { product: productUpdatesuccess } = productUpdate;

  useEffect(() => {
    if (!user || !user.name) {
      // hit /api/users/profile in userActions
      dispatch(getUserDetails("profile"));
    }
  }, [dispatch, user]);

  const deleteHandler = (productId) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteProduct(productId));
    }
  };

  useEffect(() => {
    if (product) {
      dispatch(updateProduct({ ...product, availability: availability }));
    }
  }, [availability, dispatch]);

  useEffect(() => {
    dispatch(listProducts());
    console.log("Hi it");
  }, [productUpdatesuccess, deleteSuccess]);

  const availabilityHandeler = (productId) => {
    if (window.confirm("Are you sure?")) {
      setProductId(productId);
      const product = allProductsCategory.find((product) => {
        return product._id === productId;
      });
      setProduct(product);
      setAvailability(!product.availability);
    }
  };
  return (
    <>
      {userLoading && productLoading && <Loader />}
      {userError && <Message variant="danger">{userError}</Message>}
      {errorLoading && <Message variant="danger">{errorLoading}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Container>
          <Row className=" flex-md-row  ">
            <Row className=" flex-md-row  my-3 userAdd">
              {/* <Col md={3}>
                {" "}
                <Image
                  variant="top"
                  src={`${user.image}`}
                  className="userAddImage"
                />
              </Col>
              <Col md={9}>
                <Col>
                  <h6 className="listGroup">
                    {user.name}{" "}
                    {userInfo._id === user._id && (
                      <LinkContainer to="/profile">
                        <Button variant="light" className="btn-sm ">
                          <i className="fas fa-edit"></i>
                        </Button>
                      </LinkContainer>
                    )}
                  </h6>
                </Col>
                <Col>
                  <small className="text-Add-small">
                    <i className="fa-solid fa-location-dot"></i> {user.city},{" "}
                    {user.district}
                  </small>
                </Col>
              </Col>
              <Col>
                <ListGroup variant="flush">
                  <ListGroup.Item className="listGroup">
                    {" "}
                    <small className="text-Add-small">
                      active since:/../
                    </small>
                  </ListGroup.Item>
                  <ListGroup.Item className="listGroup ">
                    <small className="text-Add-small">0 show online </small>

                    {userInfo._id !== user._id && (
                      <Button variant="light" className="btn-sm ">
                        <i className="fa-solid fa-triangle-exclamation"></i>{" "}
                      </Button>
                    )}
                  </ListGroup.Item>
                  <ListGroup.Item className="listGroup">
                    {" "}
                    <small className="text-Add-small">
                      {" "}
                      {user.ratingUser} rating
                    </small>
                  </ListGroup.Item>
                  <ListGroup.Item className="listGroup">
                    {" "}
                    <small> {user.numReviewsUser} reviews</small>
                  </ListGroup.Item>
                </ListGroup>
              </Col> */}
              <UserDetails />
            </Row>
            <Row>
              {allProductsCategory.map((product) => (
                <>
                  {user._id === product.user && (
                    <Card className="my-2 p-3 rounded " key={product._id}>
                      <Row>
                        <Col sm={12} lg={5}>
                          {" "}
                          <Link to={`/product/${product._id}`}>
                            {product.availability ? (
                              <Card.Img
                                src={product.image}
                                variant="top"
                                className="productImage"
                              />
                            ) : (
                              <Card>
                                <Card.Img
                                  src={product.image}
                                  variant="top"
                                  className="productImage opacity-25 "
                                />
                                <Card.ImgOverlay>
                                  <div className=" bg-dark mt-5 p-1 text-center text-danger">
                                    <h6 className="fa-solid fa-rotate">
                                      Rented
                                    </h6>
                                  </div>
                                </Card.ImgOverlay>
                              </Card>
                            )}
                          </Link>
                        </Col>
                        <Col sm={12} lg={5}>
                          <Card.Body>
                            <Card.Text as="h6">{product.category}</Card.Text>

                            <Link to={`/product/${product._id}`}>
                              <Card.Title as="h5" className="productText mb-3">
                                {product.name}
                              </Card.Title>
                            </Link>

                            <Card.Text as="h6" className="productText">
                              Created on: {product.createdAt.substring(0, 10)}
                            </Card.Text>
                            <Card.Text as="h6">
                              ({product.timesRented})Times rented
                            </Card.Text>
                          </Card.Body>
                        </Col>
                        <Col sm={12} lg={2}>
                          <Row>
                            <LinkContainer to={`/products/${product._id}/edit`}>
                              <Button variant="dark" className="btn-sm mb-1">
                                <i className="fas fa-edit"></i> Edit
                              </Button>
                            </LinkContainer>

                            <Button
                              variant="dark"
                              className="btn-sm mb-1"
                              onClick={() => availabilityHandeler(product._id)}
                            >
                              <i className="fa-solid fa-rotate"></i> Set
                              Available
                            </Button>
                            <Button
                              variant="dark"
                              className="btn-sm mb-1"
                              onClick={() => deleteHandler(product._id)}
                            >
                              <i className="fas fa-trash"></i> Delete
                            </Button>
                          </Row>
                        </Col>
                      </Row>
                    </Card>
                  )}
                </>
              ))}
            </Row>
          </Row>
        </Container>
      )}
    </>
  );
}
