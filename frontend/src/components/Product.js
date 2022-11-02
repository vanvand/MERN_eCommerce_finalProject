import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import "./components_css/product.css";
const Product = ({ product }) => {
  // destructure products passed as prop to use directly (alternative pass in (props) > props.product.id)
  return (
    <Card className="my-2 p-3 rounded" key={product._id}>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" className="productImage" />
      </Link>

      <Card.Body>
        {/* it was h3 change it to h6 */}
        {product && (
          <Card.Text as="h6">
            <i className="fas fa-location-dot"></i> {product.user.city},{" "}
            {product.user.district}
          </Card.Text>
        )}

        <Link to={`/product/${product._id}`}>
          <Card.Title as="h6" className="productText">
            {product.name}
          </Card.Title>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default Product;
