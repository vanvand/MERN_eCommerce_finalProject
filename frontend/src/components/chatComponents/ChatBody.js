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

import { sendMessage, updateMessages } from '../../actions/chatActions';

import '../components_css/chat.css';

import MessageStarter from './MessageStarter';
import UserDetails from '../UserDetails';
import ProductDetails from './ProductDetails';

const ChatBody = ({ socket, currentChat, currentProduct, currentUser }) => {
  const [text, setText] = useState('');
  const [confirmRequired, setConfirmRequired] = useState();
  // const [isTyping, setIsTyping] = useState();

  const dispatch = useDispatch();
  const lastMessageRef = useRef(null);
  const renterInfoRef = useRef(null);

  const { messages } = useSelector((state) => state.chat);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    socket.on('message received', (receivedMessage) => {
      let chatId = currentChat || receivedMessage.chat._id;
      dispatch(updateMessages(chatId));
    });
    // socket.on('typingResponse', (data) => {
    //   setIsTyping(data.text);
    // });

    socket.on('confirmation required', (renterInfo) => {
      console.log('confirmation required, client side');
      setConfirmRequired(true);
      renterInfoRef(renterInfo._id);
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

  const handleApproval = () => {
    socket.emit('confirmation approved', currentProduct.user);
  };

  // const handleTyping = () => {
  //   socket.emit('typing', {
  //     text: `${userInfo.name} is typing...`,
  //     room: currentChat,
  //   });
  // };

  return (
    <>
      <Container fluid>
        {currentChat ? (
          <>
            <ProductDetails
              currentProduct={currentProduct}
              currentUser={currentUser}
              socket={socket}
            />
            {/* <Row md={3} className='chatBody-userDetails'>
              <Col>
                
              </Col>
            </Row> */}
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
                    {userInfo._id === renterInfoRef.current &&
                    confirmRequired ? (
                      <Card body>
                        <p>
                          {currentProduct.user} marked product as rented. Please
                          approve as soon as you picked it up.
                        </p>
                        <Button onClick={handleApproval}>
                          <i className='fa-regular fa-check'></i>
                          Approve
                        </Button>
                      </Card>
                    ) : null}
                  </Row>
                ))}
              {/* <div>{isTyping}</div> */}
              <div ref={lastMessageRef} />
            </Row>
          </>
        ) : (
          <MessageStarter {...userInfo} />
        )}
      </Container>
      <Row className='p-2'>
        <InputGroup className='mb-3'>
          <Form.Control
            placeholder='Your Message'
            aria-label='Your Message'
            aria-describedby='basic-addon2'
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={(e) => handleOnEnter(e)}
            // onKeyDown={(e) => handleTyping(e.target.value)}
            disabled={currentChat === null}
          />
          <Button id='basic-addon2' onClick={handleOnClick}>
            <i className='fa-regular fa-paper-plane'></i>
          </Button>
        </InputGroup>
      </Row>
    </>
  );
};

export default ChatBody;
