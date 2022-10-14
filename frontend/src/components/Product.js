import React from 'react'
import { Link } from "react-router-dom"
import { Card } from 'react-bootstrap'
import Rating from "./Rating"


const Product = ({ product }) => { // destructure products passed as prop to use directly (alternative pass in (props) > props.product.id)
  return (
    <Card className="my-2 p-3 rounded">
        
        <Link to={`/product/${product._id}`}>
            <Card.Img src={product.image} variant="top"/>
        </Link>

        <Card.Body>
            
            <Link to={`/product/${product._id}`}>
                <Card.Title as="div">
                    <strong>{product.name}</strong>
                </Card.Title>
            </Link>

            <Card.Text as="div">
                <Rating 
                    value={product.rating}
                    text={`${product.numReviews} 
                    reviews`}
                />
            </Card.Text>
           {/* it was h3 change it to h5 */}
            <Card.Text as="h5">
                ${product.price}
            </Card.Text>

        </Card.Body>
    </Card>
  )
}

export default Product