import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Card, Button } from 'react-bootstrap';

import { updateProduct } from '../../actions/productActions';

function ProductDetails({ currentProduct, currentUser, socket }) {
  const dispatch = useDispatch();
  const [availability, setAvailability] = useState(true);
  const [rented, setRented] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //create action for this listener
  useEffect(() => {
    socket.on('rented', () => {
      console.log('rented');
      setRented(true);
      dispatch(
        updateProduct({
          _id: currentProduct._id,
          name: currentProduct.name,
          image: currentProduct.image,
          category: currentProduct.category,
          description: currentProduct.description,
          rating: currentProduct.rating,
          numReviews: currentProduct.numReviews,
          timesRented: currentProduct.timesRented++,
          availability: false,
          rentedTo: currentUser,
        })
      );
    });
  }, [socket]);

  const handleMarkAsRented = () => {
    if (currentProduct.availability) {
      socket.emit('marked as rented', currentUser);
      setAvailability(false);
    } else {
      socket.emit('marked as available', currentUser);
      //cancel all process through socket
      setAvailability(true);
    }
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
          {currentProduct.user === userInfo._id && (
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
              {availability ? 'Mark as rented to UserName' : 'Rented'}
            </Button>
          )}
        </Card.Body>
      </Card>
    </Row>
  );
}

export default ProductDetails;
