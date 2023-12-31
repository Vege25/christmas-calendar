import React from 'react';
import { MessageObj } from '../interfaces/firebase';
import TweetDefault from './effectComponents/tweetDefault';

const Tweet: React.FC<MessageObj> = ({ message, firebase }) => {
  return (
    <div className='flex items-center justify-between h-full'>
      <TweetDefault message={message} firebase={firebase} />
    </div>
  );
};

export default Tweet;
