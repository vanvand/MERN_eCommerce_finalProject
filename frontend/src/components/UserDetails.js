import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Row, Col, Container } from "react-bootstrap"
import Image from "react-bootstrap/Image";
import Loader from "../components/Loader"
import Message from "../components/Message"
import {listProductDetailsByUserId} from "../actions/productActions"

const UserDetails = () => {

    const [numAdsUser, setNumAdsUser] = useState(0)

    const dispatch = useDispatch()

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const productDetails = useSelector(state => state.productDetails)
    const { loading: loadingProductDetails, error: errorProductDetails, product } = productDetails

    const productDetailsByUserId = useSelector(state => state.productDetailsByUserId)
    const { loading: loadingProductDetailsByUserId, error: errorProductDetailsByUserId, productsUser } = productDetailsByUserId

    const userActiveSinceDate = String(user.createdAt).substring(0, 10)


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
    {errorProductDetails && <Message variant="danger">{errorProductDetails}</Message> }
    {loadingProductDetailsByUserId && <Loader />}
    {errorProductDetailsByUserId && <Message variant="danger">{errorProductDetailsByUserId}</Message> }

    {loading 
      ? <Loader /> 
      : error ? <Message variant="danger">{error}</Message> 
      : (
        <Container > 
        <Row >
            <Col md={4} >
                <Image 
                    style={{"borderRadius": "50%"}}
                    src={user.image}
                    fluid
                />
            </Col>
            <Col md={8} 
                className="d-block"
                style={{margin: "auto 0"}}
            >
                <div style={{"fontWeight": "bold"}}>{user.name}</div>
                <div style={{"marginTop": "5px", color: "#6c757d"}}>
                    <div>{`Active since: ${userActiveSinceDate}`}</div>
                    <div>{`${numAdsUser} ads online`}</div>
                </div>
            </Col>
        </Row>
        </Container>
    )}
    </>
  )
}

export default UserDetails