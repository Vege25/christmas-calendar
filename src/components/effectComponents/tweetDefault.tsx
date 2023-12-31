import React from 'react';
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

  return (
    // Add your JSX code here
    <div className='w-full bg-white'>
      <ProfileComponent props={message} firebase={firebase} />
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
