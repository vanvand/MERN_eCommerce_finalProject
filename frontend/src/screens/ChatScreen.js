import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import { io } from 'socket.io-client';

import ChatBody from '../components/chatComponents/ChatBody';
import RecentChatList from '../components/chatComponents/RecentChatList';

// import { addUnseenMsg } from '../actions/notificationActions';
// import { fetchCurrentMessages, sendMessageApi } from '../actions/chatActions';

const SERVER = `http://localhost:3000`;
const socket = io(SERVER);

const ChatScreen = () => {
  const [currentChat, setCurrentChat] = useState(null);
  const { messages } = useSelector((state) => state.chat);

  const [socketMessages, setSocketMessages] = useState([...messages]);
  // console.log(socketMessages, 'socketMessages');
  // console.log(messages, 'messages');

  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    socket.emit('setup', userInfo);
    socket.on('connected', () => {
      console.log(`My Socket Id is: ${socket.id}`);
    });
  }, []);

  if (!userInfo._id) {
    return navigate('/login');
  }

  return (
    <Container>
      <Row className='border'>
        <Col sm={4} className='border'>
          <h4>Inbox</h4>
        </Col>
        <Col sm={8} className='border'>
          <h4>User Name</h4>
        </Col>
      </Row>
      <Row className='border'>
        <Col sm={4} className='myChats-container'>
          <RecentChatList
            socket={socket}
            currentChat={currentChat}
            setCurrentChat={setCurrentChat}
            socketMessages={socketMessages}
            setSocketMessages={setSocketMessages}
          />
        </Col>
        <Col sm={8} className='border'>
          <ChatBody
            socket={socket}
            currentChat={currentChat}
            setCurrentChat={setCurrentChat}
            socketMessages={socketMessages}
            setSocketMessages={setSocketMessages}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ChatScreen;
