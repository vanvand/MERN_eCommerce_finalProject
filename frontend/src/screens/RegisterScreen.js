import React, { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Form, Button, Row, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import FormContainer from "../components/FormContainer"
import { register } from "../actions/userActions"
import { locationData } from "../locationData.js"

const RegisterScreen = () => {

    const navigate = useNavigate()
    const location = useLocation()

    const [ name, setName ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ confirmPassword, setConfirmPassword ] = useState("")
    const [city, setCity]= useState("");
    const [district, setDistrict]= useState("");
    const [ message, setMessage ] = useState(null)

    const dispatch = useDispatch()
    
    const userRegister = useSelector((state) => state.userRegister)
    const { loading, error, userInfo } = userRegister

    const redirect = location.search ? location.search.split("=")[1] : "/"

    const availableDistrict = locationData.cities.find((c) => c.name === city)

    useEffect( () => {
        if(userInfo) {
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])


    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword) {
            setMessage("Passwords do not match")
        } else {
            dispatch(register(name, email, password, city, district))
        }
    }

  return (
    <FormContainer>
        
        <h1>Sign Up</h1>
        
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
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

            <Form.Group controlId="location">
                <Form.Label>Location</Form.Label>

                <Form.Select value={city} onChange={(e) => setCity(e.target.value)}>
                    <option>Select City</option>
                    {locationData.cities.map((data, key) => {
                        return (
                            <option value={data.name} key={key}>
                                {data.name}
                            </option>
                            );
                        })}
                </Form.Select>

                <Form.Select value={district} onChange={(e) => setDistrict(e.target.value)}>
                    <option>Select District</option>
                    {availableDistrict?.district.map((data, key) => {
                    return (
                                <option value={data.name} key={key}>
                                {data}
                            </option>
                        );
                    })}
                </Form.Select>
            </Form.Group>


            <Button type="submit" variant="primary">
                Register
            </Button>

        </Form>

            <Row className='py-3'>
                <Col>
                Have an Account?{' '}
                <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                    Login
                </Link>
                </Col>
            </Row>

    </FormContainer>
  )
}

export default RegisterScreen

