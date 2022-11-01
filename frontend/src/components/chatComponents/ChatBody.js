import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Row,
  InputGroup,
  Form,
  Image,
  Button,
  Card,
} from 'react-bootstrap';

import { sendMessage, updateMessages } from '../../actions/chatActions';

import '../components_css/chat.css';

import MessageStarter from './MessageStarter';
import UserDetails from '../UserDetails';

const ChatBody = ({ socket, currentChat }) => {
  const [text, setText] = useState('');

  const dispatch = useDispatch();
  const lastMessageRef = useRef(null);

  const { recent_chat } = useSelector((state) => state.recentChat);

  const { messages } = useSelector((state) => state.chat);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    socket.on('message received', (receivedMessage) => {
      let chatId = currentChat || receivedMessage.chat._id;
      dispatch(updateMessages(chatId));
    });
  }, [socket]);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentChat, messages]);

  //send message handlers for input
  const handleOnEnter = (e) => {
    if (e.key === 'Enter') {
      dispatch(sendMessage(text, socket, currentChat));
      setText('');
    }
  };

  const handleOnClick = () => {
    dispatch(sendMessage(text, socket, currentChat));
    setText('');
  };

  // const handleTyping = () => {
  //   socket.emit('typing', {
  //     text: `${userInfo.name} is typing...`,
  //     room: currentChat,
  //   });
  // };

  return (
    <Container fluid>
      {currentChat ? (
        <>
          <Row>
            <h5>This is the product component</h5>
          </Row>
          <Row md={2} className='chatBody-userDetails'>
            <UserDetails />
          </Row>
          <Row sm={6} className='message-container'>
            {messages &&
              messages.map((message, index) => (
                <Row className='message-row' key={index}>
                  {message.sender._id !== userInfo._id && (
                    <div className='left-container' key={index}>
                      <Image
                        src={message.sender.image}
                        className='message-avatar'
                      />
                      <Card
                        body
                        key={index}
                        style={{ width: '18rem' }}
                        className='message-left'
                      >
                        {message.content}
                      </Card>
                    </div>
                  )}

                  {message.sender._id === userInfo._id && (
                    <Card
                      body
                      key={index}
                      style={{ width: '18rem' }}
                      className='message-right'
                    >
                      {message.content}
                    </Card>
                  )}
                </Row>
              ))}
            <div ref={lastMessageRef} />
          </Row>
          <Row>
            <InputGroup className='mb-3'>
              <Form.Control
                placeholder='Your Message'
                aria-label='Your Message'
                aria-describedby='basic-addon2'
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyPress={(e) => handleOnEnter(e)}
                // onKeyDown={handleTyping}
                disabled={currentChat === null}
              />
              <Button id='basic-addon2' onClick={handleOnClick}>
                <i className='fa-regular fa-paper-plane'></i>
              </Button>
            </InputGroup>
          </Row>
        </>
      ) : (
        <MessageStarter {...userInfo} />
      )}
    </Container>
  );
};

export default ChatBody;
