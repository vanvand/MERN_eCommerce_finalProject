import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, Button } from 'react-bootstrap';

import { fetchCurrentMessages } from '../../actions/chatActions';

const UserInboxComponent = ({
  selectedUser,
  _id,
  product,
  latestMessage,
  socket,
  currentChat,
  setCurrentChat,
  setCurrentProduct,
  setCurrentUser,
}) => {
  const dispatch = useDispatch();
  const { recent_chat } = useSelector((state) => state.recentChat);

  //Fetches selected chat messages
  const handleSelectChat = () => {
    let currentChatId = _id;
    dispatch(fetchCurrentMessages(currentChatId, socket));
    setCurrentChat(_id);
    setCurrentProduct(
      recent_chat.find((current) => _id === current._id).product
    );
    setCurrentUser(selectedUser);
  };

  return (
    <>
      <Row
        key={selectedUser._id}
        className={
          currentChat === _id
            ? 'd-grip userChat-row selectedChat'
            : 'd-grip userChat-row'
        }
      >
        <Button
          key={selectedUser._id}
          variant='rounded'
          size='lg'
          onClick={handleSelectChat}
          className='userChat-button'
        >
          <Col md={2} className='userChat-col1'>
            <Image src={selectedUser.image} className='userChat-avatar' />
          </Col>
          <Col md={10} className='userChat-col2'>
            <Row style={{ width: '100%' }}>
              <p className='userChat-userName'>{selectedUser.name}</p>
            </Row>
            <Row style={{ width: '100%' }}>
              {latestMessage && (
                <p className='userChat-latestMessage'>
                  {latestMessage.content}
                </p>
              )}
            </Row>
            {product && (
              <Row style={{ width: '100%', paddingLeft: '.5rem' }}>
                <Col md={2} className='userChat-col1'>
                  <Image
                    className='userChat-productImage'
                    src={product.image}
                  />
                </Col>
                <Col className='userChat-productData'>
                  <Row>
                    <p className='userChat-product productName'>
                      {product.name}
                    </p>
                  </Row>
                  <Row>
                    <p className='userChat-product'>{product.category}</p>
                  </Row>
                </Col>
              </Row>
            )}
          </Col>
        </Button>
      </Row>
    </>
  );
};

export default UserInboxComponent;
