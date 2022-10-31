import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, Button } from 'react-bootstrap';

import {
  accessChat,
  makeRecentChatApi,
  fetchCurrentMessages,
} from '../../actions/chatActions';

// const UserChatComponent = ({
//   selectedUserId,
//   email,
//   name,
//   image,
//   token,
//   recent_chat,
//   currentUser,
// }) => {
//   const dispatch = useDispatch();
//   console.log(name);

//   const handleSelectChat = () => {
//     console.log(selectedUserId, token, recent_chat, currentUser);
//     dispatch(accessChat(selectedUserId, token, recent_chat, currentUser));
//   };

//   return (
//     <>
//       <Row key={selectedUserId} className='d-grip gap-2'>
//         <Button
//           key={selectedUserId}
//           variant='outline-primary rounded'
//           size='lg'
//           onClick={handleSelectChat}
//         >
//           <Col>
//             <Image src={image} />
//           </Col>
//           <Col>
//             <p>{name}</p>
//           </Col>
//         </Button>
//       </Row>
//     </>
//   );
// };

const UserInboxComponent = ({
  selectedUserId,
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
  const { messages, chat } = useSelector((state) => state.chat);

  useEffect(() => {
    //currentChat is selected chatId so that user retreat the messages of the selected user
    if (!currentChat) return;
    setSocketMessages([...messages]);
  }, [messages]);

  //Fetches selected chat messages
  const handleSelectChat = () => {
    let currentChatId = _id;
    dispatch(fetchCurrentMessages(currentChatId, socket));
    setCurrentChat(_id);
    // setSocketMessages([...messages]);
  };

  //creates new chat when selecting user
  // const handleSelectChat = () => {
  //   console.log(selectedUserId, token, recent_chat, currentUser);
  //   dispatch(accessChat(selectedUserId, token, recent_chat, currentUser));
  // };

  console.log(chat);

  return (
    <>
      <Row key={selectedUserId} className='d-grip userChat-row'>
        <Button
          key={selectedUserId}
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
            <p>{selectedUserId.name}</p>
          </Col>
        </Button>
      </Row>
    </>
  );
};

export default UserInboxComponent;
