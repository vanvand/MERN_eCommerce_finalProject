import React, { useEffect } from 'react'
import { Link, useParams, useNavigate, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col, ListGroup, Image, Form, Button, Card } from "react-bootstrap"
import Message from '../components/Message'
import { addToCart, removeFromCart } from "../actions/cartActions"

const CartScreen = () => {
    const params = useParams()
    const productId = params.id

    // ?qty=1
    // make it number data type with Number()
    const location = useLocation()
    const qty = location.search ? Number(location.search.split("=")[1]) : 1

    const navigate = useNavigate()

    const dispatch = useDispatch()

    // make items available from state
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    useEffect( () => {
        if(productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        // history.push('/login?redirect=shipping') // v5
        navigate("/login?redirect=/shipping")
    }

  return (
   <Row>
    <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? <Message>Your cart is empty <Link to="/">Go Back</Link></Message> : (
            <ListGroup variant="flush">
                { cartItems.map(item => (
                    // item.product is the id
                    <ListGroup.Item key={item.product}>
                        <Row>
                            <Col md={2}>
                                <Image src={item.image} alt={item.name} fluid rounded/>
                            </Col>
                            <Col md={3}>
                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                            </Col>
                            <Col md={2}>${item.price}</Col>
                            <Col md={2}>
                               <Form.Control 
                                    as="select" 
                                    value={item.qty} 
                                    onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))} // e.target.value is selected value
                                >
                                    {
                                    [...Array(item.countInStock).keys()].map((x) => (
                                    <option key={x + 1} value={x + 1}>
                                        {x + 1}
                                    </option>
                                    ))
                                    }
                                </Form.Control>
                            </Col>
                            <Col md={2}>
                                <Button type="button" variant="light" onClick={() => removeFromCartHandler(item.product)}>
                                    <i className="fas fa-trash"></i>
                                </Button>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                )) }
            </ListGroup>
        )}
    </Col>
    <Col md={4}>
        <Card>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
                    ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                </ListGroup.Item>
                <ListGroup.Item>
                    <Button 
                        type="button" 
                        className="btn-block" 
                        disabled={cartItems.length === 0} 
                        onClick={checkoutHandler}
                    >
                        Proceed to Checkout
                    </Button>
                </ListGroup.Item>
            </ListGroup>
        </Card>
    </Col>
   </Row>
  )
}

export default CartScreen