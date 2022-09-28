import React, { useState, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import Product from "../components/Product"
import axios from "axios"


const HomeScreen = () => {
  // useState Hook to use state in functional components
  // "products" = what we want to call the piece of state 
  // "setProducts" = what we want to call the functions to manipulate/change the state
  // in useState parantheses = what we want to set as a default for products > empty array in this case
  const [ products, setProducts ] = useState([])

  // use useEffect Hook to make a request to our backend > will run as soon as component loads
  useEffect( () => {
    // axios is returning a promise > use async/await
    const fetchProducts = async () => {
      // destructure data from response
      const { data } = await axios.get("/api/products")

      setProducts(data)
    }
    fetchProducts()

    // alternative then/catch syntax
    // axios.get("/api/products").then( 

  }, []) // in brackets you can enter dependencies > when dependency change you want to fire off useEffect

  return (
    <>
        <h1>Latest Products</h1>
        <Row>
            {products.map( (product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    {/* pass products as props to Product component */}
                    <Product product={product}/>
                </Col>
            ))}
        </Row>
    </>
  )
}

export default HomeScreen