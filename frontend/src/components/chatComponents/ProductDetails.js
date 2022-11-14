import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Card, Button } from 'react-bootstrap';

import { updateChat } from '../../actions/chatActions';

function ProductDetails({ socket }) {
  const dispatch = useDispatch();

  const selectedChat = useSelector((state) => state.selectedChat);
  const { currentUser, currentProduct, currentChat } = selectedChat;

  const [rented, setRented] = useState(currentProduct.rentedTo);
  const [required, setRequired] = useState(currentChat.isRequired);

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
      socket.emit('marked as rented', currentChat, currentUser);
      dispatch(
        updateChat({
          _id: currentChat._id,
          users: currentChat.users,
          product: currentChat.product,
          latestMessage: currentChat.latestMessage,
          isRequired: true,
        })
      );
      setRequired(true);
    } else {
      socket.emit('marked as available', currentUser);
      //cancel all process through socket
      setRequired(false);
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
          <Link
            to={`/product/${currentProduct._id}`}
            style={{ textDecoration: 'none' }}
          >
            <h4 className='pb-1'>{currentProduct.name}</h4>
            <h5 className='pb-1' style={{ color: 'grey' }}>
              {currentProduct.category}
            </h5>
            {rented && <p>Rented!</p>}
          </Link>
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

              {currentProduct.availability && !required
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
