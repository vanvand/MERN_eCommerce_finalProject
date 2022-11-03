import React from 'react';
import { Row, Card, Button } from 'react-bootstrap';

function ProductDetails({ currentProduct }) {
  return (
    <Row className='chat-productDetails'>
      <Card
        style={{ height: '8rem', border: 'none' }}
        className='d-flex flex-row'
      >
        <Card.Img style={{ width: '15%' }} src={currentProduct.image} />
        <Card.Body className='px-3'>
          <h4>{currentProduct.name}</h4>
          <h5 style={{ color: 'grey' }}>{currentProduct.category}</h5>
          <Button variant='primary' className='rounded px-5 py-2'>
            <i className='fas fa-edit'></i>
            Mark as rented to UserName
          </Button>
        </Card.Body>
      </Card>
    </Row>
  );
}

export default ProductDetails;
