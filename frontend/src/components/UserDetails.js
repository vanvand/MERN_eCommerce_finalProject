import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Row, Col, Container } from "react-bootstrap"
import Image from "react-bootstrap/Image";
import Loader from "../components/Loader"
import Message from "../components/Message"
import {listProductDetailsByUserId} from "../actions/productActions"
import { Link } from 'react-router-dom';

const UserDetails = ({user}) => {

    const [numAdsUser, setNumAdsUser] = useState(0)

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading: loadingProductDetails, error: errorProductDetails, product } = productDetails

    const productDetailsByUserId = useSelector(state => state.productDetailsByUserId)
    const { loading: loadingProductDetailsByUserId, error: errorProductDetailsByUserId, productsUser } = productDetailsByUserId

    const userActiveSinceDate = String(user.createdAt).substring(0, 10)

      const userLogin = useSelector((state) => state.userLogin);
      const { userInfo } = userLogin;

    useEffect( () => {
        if(product.user) {
        dispatch(listProductDetailsByUserId(product.user))
        }
    }, [dispatch, product, product.user])

    // calculate numAdsUser value
    useEffect ( () => {
        if(productsUser) {
            let tempNumAdsUser = 0
            productsUser.forEach((product) => {
                if(product.availability === true) {
                    tempNumAdsUser++
                }
            })
            setNumAdsUser(tempNumAdsUser)
        }
    }, [productsUser])

  return (
    <>
      {loadingProductDetails && <Loader />}
      {errorProductDetails && (
        <Message variant="danger">{errorProductDetails}</Message>
      )}
      {loadingProductDetailsByUserId && <Loader />}
      {errorProductDetailsByUserId && (
        <Message variant="danger">{errorProductDetailsByUserId}</Message>
      )}

      <Container>
        <Row>
          <Col md={4}>
            <Image style={{ borderRadius: "50%" }} src={user.image} fluid />
          </Col>
          <Col md={8} className="d-block" style={{ margin: "auto 0" }}>
            <Link
              className="card-link-custom"
              to={
                user._id === userInfo._id
                  ? `/useradd`
                  : `/useradspublic/${user._id}`
              }
            >
              <div style={{ fontWeight: "bold" }}>
                {user.name}{" "}
                {user._id === userInfo._id && (
                  <Link to={"/profile"}>
                    <i className="fas fa-edit"></i>
                  </Link>
                )}
              </div>
              <div style={{ marginTop: "5px", color: "#6c757d" }}>
                <div>{`Active since: ${userActiveSinceDate}`}</div>
                <div>
                  {`${numAdsUser} ads online`}{" "}
{     user._id !== userInfo._id &&             <i class="fa-solid fa-triangle-exclamation"></i>
}                </div>
              </div>
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default UserDetails