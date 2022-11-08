import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Card, Button } from 'react-bootstrap';

import { updateChat } from '../../actions/chatActions';

function ProductDetails({ socket }) {
  const dispatch = useDispatch();

  const selectedChat = useSelector((state) => state.selectedChat);
  const { currentUser, currentProduct, currentChat } = selectedChat;

  const [rented, setRented] = useState(currentProduct.rentedTo);
  const [available, setAvailability] = useState(currentChat.isRequired);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // useEffect(() => {
  //   setAvailability(currentChat.isRequired);
  // }, [currentChat]);

  useEffect(() => {
    socket.on('rented', () => {
      setRented(true);
    });
  }, [socket]);

  const handleMarkAsRented = () => {
    if (currentProduct.availability) {
      socket.emit('marked as rented', currentUser, currentProduct, currentChat);
      dispatch(
        updateChat({
          _id: currentChat._id,
          users: currentChat._users,
          product: currentChat.product,
          latestMessage: currentChat.latestMessage,
          isRequired: true,
        })
      );
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
              key={currentProduct._id}
              variant='primary'
              className='rounded px-5 py-2'
              style={{
                textTransform: 'none',
                fontSize: '1rem',
                backgroundColor: '#343a40',
              }}
              onClick={handleMarkAsRented}
            >
              {currentProduct.availability && currentChat.isRequired ? (
                <i className='px-2 fa-solid fa-rotate'></i>
              ) : !currentProduct.availability && !currentChat.isRequired ? (
                <i className='px-2 fa-solid fa-circle-check'></i>
              ) : (
                <i className='px-2 fa-solid fa-rotate'></i>
              )}

              {currentProduct.availability
                ? 'Mark as rented to UserName'
                : 'Rented'}
            </Button>
          )}
        </Card.Body>
      </Card>
    </Row>
  );
}

export default ProductDetails;
