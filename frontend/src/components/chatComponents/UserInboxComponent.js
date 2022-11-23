import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, Button } from 'react-bootstrap';

import {
  fetchCurrentMessages,
  currentChatAction,
} from '../../actions/chatActions';

const UserInboxComponent = ({ selectedUser, socket, ...chat }) => {
  const dispatch = useDispatch();
  const { recent_chat } = useSelector((state) => state.recentChat);
  const selectedChat = useSelector((state) => state.selectedChat);
  const { currentChat } = selectedChat;

  //Sets and fetches selected chat
  const handleSelectChat = () => {
    let currentProduct = recent_chat.find(
      (current) => chat._id === current._id
    ).product;

    dispatch(fetchCurrentMessages(chat._id, socket));
    dispatch(currentChatAction(selectedUser, currentProduct, chat));
  };

  return (
    <>
      <Row
        key={selectedUser._id}
        className={
          currentChat === chat._id
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
            <Image src={selectedUser?.image} className='userChat-avatar' />
            {/* {required && (
              <i className='fa-solid fa-circle-exclamation'></i>
            )} */}
          </Col>
          <Col md={10} className='userChat-col2'>
            <Row style={{ width: '100%' }}>
              <p className='userChat-userName'>{selectedUser.name}</p>
            </Row>
            <Row style={{ width: '100%' }}>
              {chat.latestMessage && (
                <p className='userChat-latestMessage'>
                  {chat.latestMessage.content}
                </p>
              )}
            </Row>
            {chat.product && (
              <Row style={{ width: '100%', paddingLeft: '.5rem' }}>
                <Col md={2} className='userChat-col1'>
                  <Image
                    className='userChat-productImage'
                    src={chat.product.image}
                  />
                </Col>
                <Col className='userChat-productData'>
                  <Row>
                    <p className='userChat-product productName'>
                      {chat.product.name}
                    </p>
                  </Row>
                  <Row>
                    <p className='userChat-product'>{chat.product.category}</p>
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
