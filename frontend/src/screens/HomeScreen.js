import React, { useEffect } from 'react'
import { useParams, Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Col, Row } from 'react-bootstrap'
import Product from "../components/Product"
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import { listProducts } from "../actions/productActions"



const HomeScreen = () => {

  const params = useParams()
  const keyword = params.keyword
  const pageNumber = params.pageNumber || 1

  const dispatch = useDispatch()

  const productList = useSelector(state => state.productList)
  const { 
    loading, 
    error, 
    products,
    page, 
    pages
   } = productList

  useEffect( () => {
    // keyword from search functionality
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <>

    {/* Do not show product carousel with top rated products on search page */}
    {!keyword 
      ? <ProductCarousel /> 
      : ( <Link to='/' className='btn btn-light'>Go Back</Link> )
    }

        
        <h1>Latest Products</h1>

        {
        // if loading true display Loading message in HomeScreen component
        loading ? <Loader />
        
        // if error true display error message in HomeScreen component
        : error ? <Message variant="danger">{error}</Message>

        // if loading false and no error show products
        : (
          <>
            <Row>
              {products.map( (product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                      {/* pass products as props to Product component */}
                      <Product product={product}/>
                  </Col>
              ))}
            </Row>
              

            <Paginate 
              /*  pass props in from state */
              pages={pages} 
              page={page} 
              keyword={keyword ? keyword : ""} />

          </>
          )
        }
    </>
  )
}

export default HomeScreen