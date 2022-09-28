import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Col, Row } from 'react-bootstrap'
import Product from "../components/Product"
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProducts } from "../actions/productActions"



const HomeScreen = () => {
  // useState Hook is not used anymore
  const dispatch = useDispatch()

  const productList = useSelector(state => state.productList)
  const { loading, error, products } = productList

  useEffect( () => {
    dispatch(listProducts())
  }, [dispatch])

  return (
    <>
        <h1>Latest Products</h1>

        {
        // if loading true display Loading message in HomeScreen component
        loading ? 
        <Loader />
        
        // if error true display error message in HomeScreen component
        : error ? 
        <Message variant="danger">
          {error}
        </Message>

        // if loading false and no error show products
        : <Row>
            {products.map( (product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    {/* pass products as props to Product component */}
                    <Product product={product}/>
                </Col>
            ))}
        </Row>
        }
    </>
  )
}

export default HomeScreen