import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Container,
  Button,
  Card,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getUserDetails } from "../actions/userActions";
import "../components/components_css/myAddScreen.css";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteProduct,
  updateProduct,
  listProducts,
} from "../actions/productActions";
import { LinkContainer } from "react-router-bootstrap";
import UserDetails from "../components/UserDetails";

export default function UserAdsScreen() {
  const navigate = useNavigate();

  const [availability, setAvailability] = useState();
  const [product, setProduct] = useState();
  const [productId, setProductId] = useState();

  const dispatch = useDispatch();

 

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
    error,
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
      {productLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Container>
          <Row className=" flex-md-row  ">
            <Row className=" flex-md-row  my-3 userAdd">
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
