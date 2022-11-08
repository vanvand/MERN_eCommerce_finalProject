import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Row } from "react-bootstrap";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { deleteWishItem, getUserWishList } from "../actions/userActions";
import { getUserDetails } from "../actions/userActions";

const UserWishlistScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userWishList = useSelector((state) => {
    return state.userWishList;
  });
  const { loading, error, wishItems } = userWishList;

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

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else if (userInfo || successDelete) {
      dispatch(getUserWishList());
    }
  }, [userInfo, dispatch, navigate, userDeleteWishItem, successDelete]);

  useEffect(() => {
    if (wishItems) {
      wishItems.map((product) => {
        return dispatch(getUserDetails(product.user));
      });
    }
  }, [dispatch, wishItems]);

  const deleteHandler = (wishId) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteWishItem(wishId));
    }
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Remove from Wishlist
    </Tooltip>
  );


  return (
    <>
      <h2 style={{marginTop: "1rem"}}>
        My Wish List</h2>
   
        {loading || loadingDelete ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          
          <Row>
            {wishItems.map((product) => (
              <Col sm={12} md={6} lg={4} xl={3}>
              <Card border="light" style={{marginBottom: "2rem", padding: "8px"}}>

                {/* Rendering Product Card */}
                <Card.Link 
                  className="card-link-custom" 
                  href={`/product/${product._id}`}
                >
                <Card border="light"  key={product._id}>
     
                      {product.availability ? (
                        <Card.Img
                          src={product.image}
                          variant="top"
                          className="card-img-custom"
                        />
                      ) : (
                        <>
                          <Card.Img
                            src={product.image}
                            variant="top"
                            className="card-img-custom opacity-25"
                          />
                          <Button className="btn-wishlist-rented">
                            <i className="fa-solid fa-rotate"></i> Rented
                          </Button>
                        </>
                      )}
        
                    <Card.Body>
                      <Card.Text as="h6" className="card-text-custom">
                        <i className="fas fa-location-dot card-text-custom"></i> {user.city},{" "}
                        {user.district}
                      </Card.Text>

                    <Card.Title as="h6" className="card-title-custom">
                      {product.name}
                    </Card.Title>

                    </Card.Body>

                </Card>
                </Card.Link>

              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip id="button-tooltip-2">Remove from Wishlist</Tooltip>}
              >
                {({ ref, ...triggerHandler }) => (
                <Button
                  className="btn-wishlist-remove"
                  {...triggerHandler}
                  ref={ref}
                  onClick={() => deleteHandler(product._id)}
                ><i className="fa-solid fa-xmark" style={{fontSize: "18px"}}></i>
                </Button>
                )}
              </OverlayTrigger>

              </Card>
              
              </Col>
            ))}
          </Row>
        
        )}
       
     </>
  )};

export default UserWishlistScreen
