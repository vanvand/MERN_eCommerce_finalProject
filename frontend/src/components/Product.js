import React from "react";
import { Card } from "react-bootstrap";


const Product = ({ product }) => {
 
  return (
    <Card.Link 
      className="card-link-custom" 
      href={`/product/${product._id}`}
    >
    <Card border="light" className="p-3" key={product._id}>
     
      <Card.Img src={product.image} variant="top" className="card-img-custom" />

      <Card.Body>
        {product && (
          <Card.Text as="h6" className="card-text-custom">
            <i className="fas fa-location-dot card-text-custom"></i> {product.user.city},{" "}
            {product.user.district}
          </Card.Text>
        )}
        
        <Card.Title as="h6" className="card-title-custom">
          {product.name}
        </Card.Title>
    
          
      </Card.Body>
    </Card>
    </Card.Link>


    // <Card border="light" className="p-3" key={product._id}>
    //   <Link to={`/product/${product._id}`}>
    //     <Card.Img src={product.image} variant="top" className="card-img-custom" />
    //   </Link>

    //   <Card.Body>
    //     {product && (
    //       <Card.Text as="h6">
    //         <i className="fas fa-location-dot"></i> {product.user.city},{" "}
    //         {product.user.district}
    //       </Card.Text>
    //     )}

    //       <Card.Link className="card-link-custom" href={`/product/${product._id}`}>
    //           <Card.Title as="h6" className="card-title-custom">
    //             {product.name}
    //           </Card.Title>
    //       </Card.Link>
          
    //   </Card.Body>
    // </Card>
  );
};

export default Product;
