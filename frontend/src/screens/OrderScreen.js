import React, { useState, useEffect } from "react"
import axios from "axios"
import { PayPalButton } from "react-paypal-button-v2"
import { Link, useParams, useNavigate } from "react-router-dom"
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { getOrderDetails, payOrder, deliverOrder } from "../actions/orderActions"
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from "../constants/orderConstants"

const OrderScreen = () => {
    const params = useParams()
    const orderId = params.id

    const navigate = useNavigate()

    const [ sdkReady, setSdkReady ] = useState(false)

    const dispatch = useDispatch()

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails 

    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay 

    const orderDeliver = useSelector(state => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin 

    useEffect( () => {
      if(!userInfo) {
        navigate("/login")
      }

      // dynamically add paypal script
        const addPayPalScript = async () => {
          // get PayPal clientId
          const { data: clientId } = await axios.get("/api/config/paypal")
          const script = document.createElement("script")
          script.type = "text/javascript"
          // url from here https://developer.paypal.com/sdk/js/configuration/
          script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
          script.async = true
          script.onload = () => {
            setSdkReady(true)
          }
          document.body.appendChild(script)
        }

        // if no order and order ID not matching the ID in the URL, then dispatch getOrderDetails(orderId from url params) to fetch the most recent order
        // add successPay to make sure that we get order details only after user paid
        if( !order || order._id !== orderId || successPay || successDeliver ) {
          dispatch({ type: ORDER_PAY_RESET }) // to not refresh page as soon as you paid
          dispatch({ type: ORDER_DELIVER_RESET })
          dispatch(getOrderDetails(orderId))
        }
        // if order is not payed and paypal script is not there (!window.paypal) > then load payPal script
  
        else if (!order.isPaid) {
          if(!window.paypal) {
            addPayPalScript()
          } else {
            setSdkReady(true)
          }
        }
    }, [order, orderId, successPay, successDeliver, dispatch, userInfo, navigate])

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult)
    dispatch(payOrder(orderId, paymentResult))
  }

  const deliverHandler = () => {
    dispatch(deliverOrder(order))
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
            <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.postalCode} {order.shippingAddress.city}, {order.shippingAddress.country}
            </p>

            {order.isDelivered
                ? <Message variant="success">Delivered on {order.deliveredAt}</Message> 
                : <Message variant="danger">Not Delivered</Message>
            }

            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong> {order.paymentMethod}
              </p>

              {order.isPaid
                ? <Message variant="success">Paid on {order.paidAt}</Message> 
                : <Message variant="danger">Not Paid</Message>
                }

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

              {/* when order is not paided 
              > check if it is loading >> if yes show Loader component
              > when sdk is not ready show Loader as well
              
              */}
              {!order.isPaid&& (
                <ListGroup.Item>
                  {loadingPay && <Loader/>}
                  {!sdkReady ? <Loader/>
                  :(
                    <PayPalButton 
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  ) }
                </ListGroup.Item>
              )}

              {/* Mark order as delivered >> when user is admin, order is paid and not already delivered */}
              {loadingDeliver && <Loader />}
              {userInfo && 
               userInfo.isAdmin && 
               order.isPaid && 
               !order.isDelivered && 
               (
                <ListGroup.Item>
                  <Button 
                    type="button" 
                    className="btn btn-block" 
                    onClick={deliverHandler}
                  >
                    Mark as Delivered
                  </Button>
                </ListGroup.Item>
               )
              }
              
            </ListGroup>
          </Card>
        </Col>
      </Row>
  </>
}

export default OrderScreen