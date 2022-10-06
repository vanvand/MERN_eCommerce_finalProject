import React, { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { Row, Col, ListGroup, Image, Card } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { getOrderDetails } from "../actions/orderActions"

const OrderScreen = () => {
    const params = useParams()
    const orderId = params.id

    const dispatch = useDispatch()

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails 

    useEffect( () => {
       dispatch(getOrderDetails(orderId))
    }, [dispatch, orderId])

    if(!loading) {
        // Calculate itemPrice
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2)
        }

        order.itemsPrice = addDecimals(
            order.orderItems.reduce((acc, item) => 
            acc + item.price * item.qty, 0
        ))
    }

  return loading 
    ? <Loader/> 
    : error ? <Message variant="danger">{error}</Message> 
    : <>
    <h1>Order {order._id}</h1>

    <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>

              {/* we added user name and email via populate in orderControler getOrderById function */}
              <div>
                <strong>Name: </strong> {order.user.name}
            </div>
              <div>
                <strong>E-Mail: </strong><a href={`mailto: ${order.user.email}`}>{order.user.email}</a>
            </div>
              <div>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.postalCode} {order.shippingAddress.city}, {order.shippingAddress.country}
              </div>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong> {order.paymentMethod}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>

              {order.orderItems.length === 0 
                ? (<Message>Order is empty</Message>)
                : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                          {/* ${addDecimals(item.qty * item.price)} */}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>


              
            </ListGroup>
          </Card>
        </Col>
      </Row>
  </>
}

export default OrderScreen