import React from 'react';

interface ProfileComponentProps {
  props: any;
}

const ProfileComponent: React.FC<ProfileComponentProps> = ({ props }) => {
  const { photoURL, displayName, createdAt } = props;
  return (
    <>
      <div className='flex items-center m-2 gap-2'>
        <div className='tweet-image'>
          <img
            className='rounded-full w-14 h-14 border-2 border-solid border-dark'
            src={
              photoURL ||
              'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg'
            }
            alt='Profile picture'
          />
        </div>
        <div className='tweet-text text-lg'>
          <h6>
            {displayName || 'Unknown'} -{' '}
            {(createdAt as any).toDate().toLocaleDateString()}
          </h6>
        </div>
      </div>
    </>
  );
};

export default ProfileComponent;
