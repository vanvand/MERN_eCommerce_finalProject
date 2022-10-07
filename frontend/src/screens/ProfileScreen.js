import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Table, Form, Button, Row, Col } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { getUserDetails, updateUserProfile } from "../actions/userActions"
import { listMyOrders } from "../actions/orderActions"


const ProfileScreen = () => {

    const navigate = useNavigate()

    const [ name, setName ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ confirmPassword, setConfirmPassword ] = useState("")
    const [ message, setMessage ] = useState(null)

    const dispatch = useDispatch()
    
    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const orderListMy = useSelector((state) => state.orderListMy)
    const { loading: loadingOrders, error: errorOrders , orders } = orderListMy
    
    // check if user isn't logged in, if not redirect him to login page
    useEffect( () => {
        if(!userInfo) {
            navigate("/login")
        } else {
            // check for the user
            if(!user.name) {
                // hit /api/users/profile in userActions
                dispatch(getUserDetails("profile"))
                // hit /api/orders/myorders in oderActions
                dispatch(listMyOrders())
            } else {
                // prefill user name and email on profile page
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [navigate, userInfo, dispatch, user])


    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword) {
            setMessage("Passwords do not match")
        } else {
            dispatch(updateUserProfile({id: user._id, name, email, password}))
        }
    }

  return (
    <Row>
        <Col md={3}>

            <h1>User Profile</h1>
        
            {message && <Message variant="danger">{message}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            {/* success is just a true or false */}
            {success && <Message variant="success">Profile Updated</Message>}
            {loading && <Loader/>}

            <Form onSubmit={submitHandler}>
            
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        type="name" 
                        placeholder="Enter name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                </Form.Group>
        
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Enter password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        ></Form.Control>
                </Form.Group>

                <Form.Group controlId="confirmPassword">
                    <Form.Label>ConfirmPassword</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Confirm password" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        ></Form.Control>
                </Form.Group>

                <Button type="submit" variant="primary">
                    Update
                </Button>

            </Form>

        </Col>
         <Col md={9}>
            <h2>My Orders</h2>

            {loadingOrders 
                ? <Loader/>
                : errorOrders 
                    ? <Message variant="danger">{errorOrders}</Message>
                    : ( 
                    <Table striped bordered hover responsive className="table-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0,10)}</td>
                                    <td>${order.totalPrice}</td>
                                    <td>{order.isPaid 
                                            ? order.paidAt.substring(0,10) 
                                            : (
                                                <i 
                                                    className="fas fa-times" 
                                                    style={{color: "red"}}
                                                ></i>
                                            )
                                        }
                                    </td>
                                    <td>{order.isDelivered 
                                            ? order.deliveredAt.substring(0,10) 
                                            : (
                                                <i 
                                                    className="fas fa-times" 
                                                    style={{color: "red"}}
                                                ></i>
                                            )
                                        }
                                    </td>
                                    <td>
                                        <LinkContainer to={`/orders/${order._id}`}>
                                            <Button className="btn-sm" variant="light">Details</Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    )
            }
        </Col>
    </Row>
        
        

  )
}

export default ProfileScreen

