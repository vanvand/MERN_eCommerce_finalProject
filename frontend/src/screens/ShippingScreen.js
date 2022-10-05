import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Form, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import FormContainer from "../components/FormContainer"
import { saveShippingAddress } from "../actions/cartActions"
import CheckoutSteps from "../components/CheckoutSteps"

const ShippingScreen = () => {

    const navigate = useNavigate()

    // make shippingAddress from state available and set at initial state for the useState when present > so that fields are prefilled when address is in localStorage
    const cart = useSelector((state) => state.cart)
    const { shippingAddress } = cart

    // const [ address, setAddress ] = useState(
    //     !shippingAddress.address ? "" : shippingAddress.address
    // )
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country}))
        // navigate user to payment screen
        navigate("/payment")
    }

  return (
    <FormContainer>

        {/* Navigation bar with checkout steps > only step 1 and 2 is enabled */}
        <CheckoutSteps step1 step2 />

        <h1>Shipping</h1>

        <Form onSubmit={submitHandler}>
            
            <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Enter address" 
                    value={address} 
                    required
                    onChange={(e) => setAddress(e.target.value)}
                    ></Form.Control>
            </Form.Group>

            <Form.Group controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Enter city" 
                    value={city} 
                    required
                    onChange={(e) => setCity(e.target.value)}
                    ></Form.Control>
            </Form.Group>

            <Form.Group controlId="postalCode">
                <Form.Label>Postal code</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Enter postal code" 
                    value={postalCode} 
                    required
                    onChange={(e) => setPostalCode(e.target.value)}
                    ></Form.Control>
            </Form.Group>

            <Form.Group controlId="country">
                <Form.Label>Country</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Enter country" 
                    value={country} 
                    required
                    onChange={(e) => setCountry(e.target.value)}
                    ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
                Continue
            </Button>
        </Form>

    </FormContainer>
  )
}

export default ShippingScreen