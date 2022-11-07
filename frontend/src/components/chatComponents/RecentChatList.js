import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap';

import UserInboxComponent from './UserInboxComponent';

import { updateRecentChats } from '../../actions/chatActions';

const RecentChatList = ({ socket }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const { recent_chat } = useSelector((state) => state.recentChat);
  console.log(recent_chat);

  useEffect(() => {
    socket.on('confirmation required', (renterInfo, productInfo, chat) => {
      console.log('REQUIRED LIST');
      dispatch(updateRecentChats());
    });
  }, [socket]);

  return (
    <Container className='overflow-auto'>
      {recent_chat &&
        recent_chat.map((chat, index) => (
          <UserInboxComponent
            key={index}
            {...chat}
            selectedUser={
              chat.users[0]._id === userInfo._id ? chat.users[1] : chat.users[0]
            }
            socket={socket}
          />
        ))}
    </Container>
  );
};

export default RecentChatList;
