import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Carousel, Col, Row } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { deleteWishItem, getUserWishList } from "../actions/userActions";
import { Link } from "react-router-dom";

const UserWishlistScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userWishList = useSelector((state) => {
    return state.userWishList;
  });
  const { loading, error, wishItems } = userWishList;
  console.log("wishItems", wishItems);

  const userDeleteWishItem = useSelector((state) => {
    return state.userDeleteWishItem;
  });
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDeleteWishItem;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else if (userInfo || successDelete) {
      dispatch(getUserWishList());
    }
  }, [userInfo, dispatch, navigate, successDelete]);

  const deleteHandler = (wishId) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteWishItem(wishId));
    }
  };

  return (
    <Row>
      <h2>My Wish List</h2>
      <Col md={12}>
        {loading || loadingDelete ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Row>
            {wishItems.map((product) => (
              <Col sm={12} md={6} lg={4} xl={3}>
                <Card className="my-2 p-3 rounded" key={product._id}>
                  <Link to={`/product/${product._id}`}>
                    {product.availability ? (
                      <Card.Img
                        src={product.image}
                        variant="top"
                        className="productImage"
                      />
                    ) : (
                      <>
                        <Card.Img
                          src={product.image}
                          variant="top"
                          className="productImage opacity-25 "
                        />
                        <Carousel.Caption>
                          <div className=" bg-dark mt-5 p-1 ">
                            <h6 className="fa-solid fa-rotate "> Rented</h6>
                          </div>
                        </Carousel.Caption>
                      </>
                    )}
                  </Link>
                  <Card.Body>
                    <Card.Text as="h6">
                      <i className="fa-solid fa-location-dot"></i> 00000 City
                    </Card.Text>

                    <Link to={`/product/${product._id}`}>
                      <Card.Title as="h6" className="productText">
                        {product.name}
                      </Card.Title>
                    </Link>
                  </Card.Body>
                  <Row>
                    <Button
                      variant="dark"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className="fas fa-trash"></i> Remove from withlist
                    </Button>
                  </Row>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Col>
    </Row>
  );
};

export default UserWishlistScreen;
