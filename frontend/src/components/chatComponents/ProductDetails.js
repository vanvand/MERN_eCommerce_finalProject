import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Card, Button } from 'react-bootstrap';

import { updateProduct } from '../../actions/productActions';

function ProductDetails({ currentProduct }) {
  const dispatch = useDispatch();
  const [availability, setAvailability] = useState();

  // const productDetails = useSelector((state) => state.productDetails);
  // const { product } = productDetails;
  console.log(currentProduct);

  const handleMarkAsRented = () => {
    dispatch(
      updateProduct({
        _id: currentProduct._id,
        availability: false,
      })
    );
  };

  return (
    <Row className='chat-productDetails'>
      <Card
        style={{ height: '8rem', border: 'none' }}
        className='d-flex flex-row'
      >
        <Card.Img style={{ width: '15%' }} src={currentProduct.image} />
        <Card.Body className='px-3'>
          <h4 className='pb-1'>{currentProduct.name}</h4>
          <h5 className='pb-1' style={{ color: 'grey' }}>
            {currentProduct.category}
          </h5>
          <Button
            variant='primary'
            className='rounded px-5 py-2'
            style={{
              textTransform: 'none',
              fontSize: '1rem',
              backgroundColor: '#343a40',
            }}
            onClick={handleMarkAsRented}
          >
            <i className='px-2 fa-solid fa-rotate'></i>
            Mark as rented to UserName
          </Button>
        </Card.Body>
      </Card>
    </Row>
  );
}

export default ProductDetails;
