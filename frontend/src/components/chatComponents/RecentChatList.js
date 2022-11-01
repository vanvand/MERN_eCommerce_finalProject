import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';

import UserInboxComponent from './UserInboxComponent';

const RecentChatList = ({
  socket,
  currentChat,
  setCurrentChat,
  socketMessages,
  setSocketMessages,
}) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const { recent_chat } = useSelector((state) => state.recentChat);

  return (
    <Container>
      {recent_chat &&
        recent_chat.map((recent_chats, index) => (
          <UserInboxComponent
            key={index}
            {...recent_chats}
            recent_chat={recent_chat}
            selectedUser={
              recent_chats.users[0]._id === userInfo._id
                ? recent_chats.users[1]
                : recent_chats.users[0]
            }
            currentUser={userInfo._id}
            socket={socket}
            currentChat={currentChat}
            setCurrentChat={setCurrentChat}
            token={userInfo.token}
            socketMessages={socketMessages}
            setSocketMessages={setSocketMessages}
          />
        ))}
    </Container>
  );
};

export default RecentChatList;
