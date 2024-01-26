import React, { useState } from 'react';
import ProfileComponent from '../profileComponent';

interface Message {
  // Add your component props here
  message: Values;
  firebase: any;
}
interface Values {
  photoURL: string;
  displayName: string;
  createdAt: string;
  text: string;
  imageUrl: any;
}

const TweetDefault: React.FC<Message> = ({ message, firebase }) => {
  // Add your component logic here
  const { text } = message;
  const [showImage, setShowImage] = useState(false);

  const handleImageClick = () => {
    setShowImage(!showImage);
  };

  return (
    // Add your JSX code here
    <div className='w-full bg-white'>
      <ProfileComponent props={message} firebase={firebase} />
      <div className='flex flex-col w-full'>
        <div className='w-full m-2'>
          <p className='text-md '>{text}</p>
        </div>
        <div
          className='w-full m-auto cursor-pointer tweet-content-image'
          onClick={handleImageClick}
        >
          {message.imageUrl && (
            <img
              className={`m-auto max-h-96 ${
                showImage ? 'flex max-h-none' : ''
              }`}
              src={message.imageUrl}
              alt='Tweet Image'
            />
          )}
        </div>
      </div>
      <hr />
    </div>
  );
};

export default TweetDefault;
