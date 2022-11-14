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

import {
  sendMessage,
  updateMessages,
  updateChat,
  getRecentChats,
} from '../../actions/chatActions';
import { updateProduct } from '../../actions/productActions';

import '../components_css/chat.css';

import ProductDetails from './ProductDetails';

const ChatBody = ({ socket }) => {
  //Logged user
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //Selected chat data
  const selectedChat = useSelector((state) => state.selectedChat);
  const { currentUser, currentProduct, currentChat } = selectedChat;

  //Messages
  const { messages } = useSelector((state) => state.chat);

  //State for input
  const [text, setText] = useState('');

  //State to render approval message
  const [confirmRequired, setConfirmRequired] = useState(
    currentChat.isRequired
  );
  console.log(confirmRequired);
  console.log(currentChat.isRequired);

  const [renterInfoState, setRenterInfo] = useState({});
  // const [isTyping, setIsTyping] = useState();

  const dispatch = useDispatch();

  //For automatic scrolling
  const lastMessageRef = useRef(null);

  //ref to render approval button
  const renterInfoRef = useRef();

  // useEffect(() => {
  //   dispatch(fetchCurrentMessages(currentChat._id, socket));
  // }, [currentChat]);

  useEffect(() => {
    socket.on('message received', (receivedMessage) => {
      console.log('message received');
      let chatId = currentChat._id || receivedMessage.chat._id;
      dispatch(updateMessages(chatId));
      dispatch(getRecentChats());
    });
    // socket.on('typingResponse', (data) => {
    //   setIsTyping(data.text);
    // });
    socket.on('confirmation required', (renterInfo) => {
      renterInfoRef.current = renterInfo;
      setRenterInfo(renterInfo);
      setConfirmRequired(true);
    });
  }, [socket]);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    });
  }, [currentChat, messages]);

  //Submit approval handler
  const handleApproval = () => {
    socket.emit('confirmation approved', currentProduct.user);
    dispatch(
      updateProduct({
        _id: currentProduct._id,
        name: currentProduct.name,
        image: currentProduct.image,
        category: currentProduct.category,
        description: currentProduct.description,
        rating: currentProduct.rating,
        numReviews: currentProduct.numReviews,
        timesRented: currentProduct.timesRented,
        availability: false,
        rentedTo: renterInfoRef.current,
      })
    );
    dispatch(
      updateChat({
        _id: currentChat._id,
        users: currentChat.users,
        product: currentChat.product,
        latestMessage: currentChat.latestMessage,
        isRequired: false,
      })
    );
    setConfirmRequired(false);
  };

  //Submit message handlers
  const handleOnEnter = (e) => {
    if (e.key === 'Enter') {
      dispatch(sendMessage(text, socket, currentChat._id));
      setText('');
    }
  };

  const handleOnClick = () => {
    dispatch(sendMessage(text, socket, currentChat._id));
    setText('');
  };

  // const handleTyping = () => {
  //   socket.emit('typing', {
  //     text: `${userInfo.name} is typing...`,
  //     room: currentChat,
  //   });
  // };

  return (
    <>
      {currentChat ? (
        <>
          <Container fluid>
            <ProductDetails socket={socket} />
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
                  </Row>
                ))}
              {/* <div>{isTyping}</div> */}
              {(confirmRequired || currentChat.isRequired) &&
              currentProduct.user !== userInfo._id ? (
                <Row className='message-row'>
                  <Card.Body className='rent-approval'>
                    <p style={{ textAlign: 'center' }}>
                      {currentUser.name} marked product as rented. Please
                      approve as soon as you picked it up.
                    </p>
                    <Button
                      onClick={handleApproval}
                      style={{ borderRadius: '5px', width: '70%' }}
                    >
                      Approve
                      <i
                        className='fa-solid fa-check'
                        style={{ marginLeft: '.5rem' }}
                      ></i>
                    </Button>
                  </Card.Body>
                </Row>
              ) : null}
              <div ref={lastMessageRef} />
            </Row>
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
      ) : (
        <p>.</p>
      )}
    </>
  );
};

export default ChatBody;
