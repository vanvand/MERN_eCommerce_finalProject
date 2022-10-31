import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Row,
  Col,
  InputGroup,
  Form,
  Image,
  Button,
  Card,
} from 'react-bootstrap';

import {
  sendMessageApi,
  fetchCurrentMessages,
} from '../../actions/chatActions';

import './chat.css';

const ChatBody = ({
  socket,
  currentChat,
  socketMessages,
  setSocketMessages,
}) => {
  const [text, setText] = useState('');

  const dispatch = useDispatch();
  const lastMessageRef = useRef(null);

  const { recent_chat } = useSelector((state) => state.recentChat);

  const { messages } = useSelector((state) => state.chat);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //gets messages
  // useEffect(() => {
  //   //currentChat id is of selected chat so that user can join same chat room
  //   if (!currentChat) return;
  //   dispatch(fetchCurrentMessages(currentChat, socket));
  // }, [dispatch, currentChat, socket]);

  useEffect(() => {
    socket.on('message received', (receivedMessage) => {
      setSocketMessages((socketMessages) => [
        ...socketMessages,
        receivedMessage,
      ]);
    });
  }, [currentChat]);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentChat, messages]);

  //send message handlers for input
  const handleOnEnter = (e) => {
    if (e.key === 'Enter') {
      dispatch(sendMessageApi(text, userInfo.token, socket, currentChat));
      dispatch(fetchCurrentMessages(currentChat, socket));
      setText('');
    }
  };

  const handleOnClick = () => {
    dispatch(sendMessageApi(text, userInfo.token, socket, currentChat));
    dispatch(fetchCurrentMessages(currentChat, socket));
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
          <Row sm={3}>
            <h5>This is the product component</h5>
          </Row>
          <Row sm={1}>
            <h6>User profile component</h6>
          </Row>
          <Row sm={6} className='message-container'>
            {socketMessages &&
              socketMessages.map((message, index) => (
                <Row className='message-row' key={index}>
                  {message.sender._id !== userInfo._id && (
                    <div className='left-container' key={index}>
                      <Image
                        src='https://aui.atlassian.com/aui/latest/docs/images/avatar-person.svg'
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

const MessageStarter = ({ image, name }) => {
  return (
    <div>
      <div>
        <Image src={image} sx={{ width: 70, height: 70 }} />
        <h5>Welcome, {name}</h5>
        <p>Please select a chat to start messaging.</p>
      </div>
    </div>
  );
};

export default ChatBody;
