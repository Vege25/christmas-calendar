import React from 'react';
import ProfileComponent from '../profileComponent';

interface Message {
  // Add your component props here
  message: Values;
}
interface Values {
  photoURL: string;
  displayName: string;
  createdAt: string;
  text: string;
  imageUrl: any;
}

const TweetDefault: React.FC<Message> = ({ message }) => {
  // Add your component logic here
  const { text } = message;

  return (
    // Add your JSX code here
    <div className='w-full bg-white'>
      <ProfileComponent props={message} />
      <div className='flex flex-col w-full'>
        <div className='w-full m-2'>
          <p className='text-md '>{text}</p>
        </div>
        <div className='w-full tweet-content-image'>
          {message.imageUrl && (
            <img className='m-auto' src={message.imageUrl} alt='Tweet Image' />
          )}
        </div>
      </div>
      <hr />
    </div>
  );
};

export default TweetDefault;
