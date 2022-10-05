// Payment Method Screen
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Form, Button, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import FormContainer from "../components/FormContainer"
import CheckoutSteps from "../components/CheckoutSteps"
import { savePaymentMethod} from "../actions/cartActions"

const PaymentScreen = () => {

    const navigate = useNavigate()

    // check if shippingAddress is present > if not redirect user to shipping page
    const cart = useSelector((state) => state.cart)
    const { shippingAddress } = cart
    
    useEffect( () => {
         if(!shippingAddress.address) {
        navigate("/shipping")
    }
    }, [navigate, shippingAddress])
   
    const [ paymentMethod, setPaymentMethod ] = useState("PayPal")

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod({ paymentMethod }))
        navigate("/placeorder")
    }

  return (
    <FormContainer>

        {/* Navigation bar with checkout steps > only step 1 and 2 is enabled */}
        <CheckoutSteps step1 step2 step3 />

        <h1>Payment Method</h1>

        <Form onSubmit={submitHandler}>
            
            <Form.Group>
                <Form.Label as="legend">Select Method</Form.Label>

                <Col>
                    <Form.Check 
                    type="radio" 
                    label="PayPal or Credit Card" 
                    id="PayPal" 
                    name="paymentMethod" 
                    value="PayPal" 
                    checked 
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    ></Form.Check>

                    {/* adding new payment method */}
                    <Form.Check 
                    type="radio" 
                    label="Stripe" 
                    id="Stripe" 
                    name="paymentMethod" 
                    value="Stripe"  
                    // disabled
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    ></Form.Check>
                </Col>

            </Form.Group>

            <Button type="submit" variant="primary">
                Continue
            </Button>
        </Form>

    </FormContainer>
  )
}

export default PaymentScreen