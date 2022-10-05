import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col, Image, ListGroup, Card, Button, Form } from "react-bootstrap"
import Loader from "../components/Loader"
import Message from "../components/Message"
import Rating from "../components/Rating"
import { listProductDetails} from "../actions/productActions"


const ProductScreen = () => {
  // make params of url available
  const params = useParams(); // or destructure const {id} = useParams()

  // state for Quantity (countInStock) Dropdown in buy box
  const [qty, setQty] = useState(1)

  // Redux implementation > listener for action
  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails

  useEffect( () => {
    dispatch(listProductDetails(params.id))
  }, [dispatch, params])

  // onClick Handler for add to cart
  const navigate = useNavigate()
  const addToCartHandler = () => {
    navigate(`/cart/${params.id}?qty=${qty}`)
  }

  return (
    <>
    <Link className="btn btn-light my-3" to="/">
      Go Back
    </Link>

    {loading ? <Loader/> : error ? <Message variant="danger">{error}</Message> : (
        <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid/>
        </Col>

        <Col md={3}>
          
          <ListGroup variant="flush">
            
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            
            <ListGroup.Item>
              <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
            </ListGroup.Item>

            <ListGroup.Item>
              Price: ${product.price}
            </ListGroup.Item>

            <ListGroup.Item>
              Description: ${product.description}
            </ListGroup.Item>

          </ListGroup>
        </Col>

        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              
              <ListGroup.Item>
                <Row>
                  <Col>
                    Price:
                  </Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>
                    Status:
                  </Col>
                  <Col>
                  {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>

              {product.countInStock > 0 && ( // && means then
                <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>
                    <Col>
                      <Form.Control 
                        as="select" 
                        value={qty} 
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {
                        [...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))
                        }
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Button 
                  onClick={addToCartHandler}
                  className="btn-block" 
                  type="button" 
                  disabled={product.countInStock === 0}
                >
                  Add To cart
                </Button>
              </ListGroup.Item>

            </ListGroup>
          </Card>
        </Col>
      </Row>
    )}
   
    </>
  )
}

export default ProductScreen