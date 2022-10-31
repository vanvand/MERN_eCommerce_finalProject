import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';

import { listUsers } from '../../actions/userActions';
import { makeRecentChatApi } from '../../actions/chatActions';

import UserInboxComponent from './UserChatComponent';

const RecentChatList = ({
  socket,
  currentChat,
  setCurrentChat,
  socketMessages,
  setSocketMessages,
}) => {
  const dispatch = useDispatch();

  //Temporary solution to create chat rooms
  const userList = useSelector((state) => state.userList);
  const { users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const { recent_chat } = useSelector((state) => state.recentChat);

  //dispatches user list (development only)
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    }
  }, [userInfo, dispatch]);

  //Dispatches recent chats
  useEffect(() => {
    if (userInfo.token) dispatch(makeRecentChatApi());
  }, [dispatch, userInfo.token]);

  //   console.log(chat._id);

  return (
    <Container>
      {/* {users &&
        users.map((user, index) => (
          <UserInboxComponent
            key={index}
            {...user}
            selectedUserId={user._id}
            currentUser={userInfo._id}
            recent_chat={recent_chat}
            socket={socket}
            currentChat={currentChat}
            setCurrentChat={setCurrentChat}
            token={userInfo.token}
          />
        ))} */}
      {recent_chat &&
        recent_chat.map((recent_chats, index) => (
          <UserInboxComponent
            key={index}
            {...recent_chats}
            recent_chat={recent_chat}
            selectedUserId={
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
