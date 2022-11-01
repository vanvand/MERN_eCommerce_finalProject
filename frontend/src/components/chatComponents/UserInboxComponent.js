import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, Button } from 'react-bootstrap';

import {
  makeRecentChatApi,
  fetchCurrentMessages,
} from '../../actions/chatActions';

const UserInboxComponent = ({
  selectedUser,
  _id,
  email,
  name,
  image,
  recent_chat,
  currentUser,
  socket,
  currentChat,
  setCurrentChat,
  socketMessages,
  setSocketMessages,
}) => {
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.chat);

  useEffect(() => {
    //currentChat is selected chatId so that user retreat the messages of the selected user
    if (!currentChat) return;
  }, [messages]);

  //Fetches selected chat messages
  const handleSelectChat = () => {
    let currentChatId = _id;
    dispatch(fetchCurrentMessages(currentChatId, socket));
    setCurrentChat(_id);
    // setSocketMessages([...messages]);
  };

  return (
    <>
      <Row key={selectedUser._id} className='d-grip userChat-row'>
        <Button
          key={selectedUser._id}
          variant='rounded'
          size='lg'
          onClick={handleSelectChat}
          className='userChat-button'
        >
          <Col md={2} className='userChat-col1'>
            <Image
              src='https://aui.atlassian.com/aui/latest/docs/images/avatar-person.svg'
              className='userChat-avatar'
            />
          </Col>
          <Col className='userChat-col2'>
            <p>{selectedUser.name}</p>
          </Col>
        </Button>
      </Row>
    </>
  );
};

export default UserInboxComponent;
