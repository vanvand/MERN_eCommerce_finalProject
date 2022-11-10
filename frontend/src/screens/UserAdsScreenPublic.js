import React, { useEffect } from "react";
import { Col, Row, Container, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getUserDetails } from "../actions/userActions";
import "../components/components_css/myAddScreen.css";
import { Link, useParams } from "react-router-dom";
import UserDetails from "../components/UserDetails";
import { listProductDetailsByUserId } from "../actions/productActions";

export default function UserAdsScreenPublic() {
  const params = useParams();
  const userId = params.id;
  const dispatch = useDispatch();

  const productDetailsByUserId = useSelector((state) => {
    //console.log("state", state);
    return state.productDetailsByUserId;
  });
  const {
    loading: userLoading,
    error: userError,
    productsUser,
  } = productDetailsByUserId;

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  //console.log("productsUser", productsUser);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userId) {
      dispatch(listProductDetailsByUserId(userId));
    }
  }, [userId, dispatch]);

  useEffect(() => {
    dispatch(getUserDetails(userId));
  }, [dispatch, userId]);

  return (
    <>
      {userLoading ? (
        <Loader />
      ) : userError ? (
        <Message variant="danger">{userError}</Message>
      ) : (
        <Container>
          <Row className=" flex-md-row  " md={2}>
            <Col>
              <UserDetails user={user} />
            </Col>
          </Row>

          <Row className=" flex-md-row  ">
            {productsUser?.map((product) => (
              <>
                <Card
                  className="my-2 p-3 rounded "
                  key={product._id}
                  border="light"
                >
                  <Row>
                    <Col sm={12} lg={3}>
                      {" "}
                      <Link to={`/product/${product._id}`}>
                        {product.availability ? (
                          <Card.Img
                            src={product.image}
                            variant="top"
                            className="productImage userAddImage"
                          />
                        ) : (
                          <Card>
                            <Card.Img
                              src={product.image}
                              variant="top"
                              className="productImage opacity-25 userAddImage"
                            />
                            <Card.ImgOverlay>
                              <div className=" bg-dark mt-5 p-1 text-center text-danger">
                                <h6 className="fa-solid fa-rotate">Rented</h6>
                              </div>
                            </Card.ImgOverlay>
                          </Card>
                        )}
                      </Link>
                    </Col>
                    <Col sm={12} lg={7}>
                      <Card.Body>
                        <Card.Text as="h6">{product.category}</Card.Text>

                        <Link
                          to={`/product/${product._id}`}
                          className="text-decoration-none"
                        >
                          <Card.Title as="h5" className=" mb-3">
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
                    <Col sm={12} lg={2}></Col>
                  </Row>
                </Card>
              </>
            ))}
          </Row>
        </Container>
      )}
    </>
  );
}
