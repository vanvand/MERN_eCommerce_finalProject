import React from 'react';
import { Image } from 'react-bootstrap';

const MessageStarter = ({ image, name }) => {
  return (
    <div className='messageStarter-container'>
      <div>
        <Image src={image} sx={{ width: 70, height: 70 }} />
        <h5>Welcome, {name}</h5>
        <p>Please select a chat to start messaging.</p>
      </div>
    </div>
  );
};

export default MessageStarter;
