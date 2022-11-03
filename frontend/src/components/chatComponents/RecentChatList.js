import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap';

import { updateRecentChats } from '../../actions/chatActions';

import UserInboxComponent from './UserInboxComponent';

const RecentChatList = ({
  socket,
  currentChat,
  setCurrentChat,
  setCurrentProduct,
  setCurrentUser,
}) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const { recent_chat } = useSelector((state) => state.recentChat);

  return (
    <Container className='overflow-auto'>
      {recent_chat &&
        recent_chat.map((recent_chats, index) => (
          <UserInboxComponent
            key={index}
            {...recent_chats}
            selectedUser={
              recent_chats.users[0]._id === userInfo._id
                ? recent_chats.users[1]
                : recent_chats.users[0]
            }
            socket={socket}
            currentChat={currentChat}
            setCurrentChat={setCurrentChat}
            setCurrentProduct={setCurrentProduct}
            setCurrentUser={setCurrentUser}
          />
        ))}
    </Container>
  );
};

export default RecentChatList;
