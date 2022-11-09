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
  currentChatAction,
  fetchCurrentMessages,
} from '../../actions/chatActions';
import { updateProduct } from '../../actions/productActions';

import '../components_css/chat.css';

import MessageStarter from './MessageStarter';
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

  const [renterInfo, setRenterInfo] = useState({});
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
      let chatId = currentChat || receivedMessage.chat._id;
      dispatch(updateMessages(chatId));
    });
    // socket.on('typingResponse', (data) => {
    //   setIsTyping(data.text);
    // });
    socket.on('confirmation required', (renterInfo, productInfo, chat) => {
      renterInfoRef.current = renterInfo;
      setRenterInfo(renterInfo);
      setConfirmRequired(true);
    });
  }, [socket]);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
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
        users: currentChat._users,
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
      <Container fluid>
        {currentChat && (
          <>
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
                <Row className='approval-container'>
                  <Card.Body className='rent-approval'>
                    <p>
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
          </>
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
