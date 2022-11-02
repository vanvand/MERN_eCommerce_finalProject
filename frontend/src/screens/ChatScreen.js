import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import { io } from 'socket.io-client';

import ChatBody from '../components/chatComponents/ChatBody';
import RecentChatList from '../components/chatComponents/RecentChatList';

import { getRecentChats } from '../actions/chatActions';

// import { addUnseenMsg } from '../actions/notificationActions';
// import { fetchCurrentMessages, sendMessageApi } from '../actions/chatActions';

const SERVER = `http://localhost:3000`;
const socket = io(SERVER);

const ChatScreen = () => {
  const [currentChat, setCurrentChat] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      return navigate('/login');
    }

    socket.emit('setup', userInfo);
    socket.on('connected', () => {
      console.log(`My Socket Id is: ${socket.id}`);
    });

    dispatch(getRecentChats());
  }, []);

  return (
    <Container>
      <Row className='border'>
        <Col sm={4} className='chat-inbox-container'>
          <h4>Inbox</h4>
        </Col>
        <Col sm={8} className='chat-name-container'>
          <h4>User Name</h4>
        </Col>
      </Row>
      <Row className='border'>
        <Col sm={4} className='myChats-container'>
          <RecentChatList
            socket={socket}
            currentChat={currentChat}
            setCurrentChat={setCurrentChat}
          />
        </Col>
        <Col sm={8} className='chat-body-container'>
          <ChatBody
            socket={socket}
            currentChat={currentChat}
            setCurrentChat={setCurrentChat}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ChatScreen;
