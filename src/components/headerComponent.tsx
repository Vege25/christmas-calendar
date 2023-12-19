import React, { useEffect, useState } from 'react';
import { User } from '../interfaces/firebase';

const Header: React.FC<User> = ({ user }) => {
  const { photoURL, displayName } = user;
  const [isSticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 5607);
    };

    // Attach the event listener when the component mounts
    window.addEventListener('scroll', handleScroll);

    // Detach the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Select the element with the class '.tweets-container'
    const paddingElement = document.querySelector(
      '.tweets-container'
    ) as HTMLDivElement;

    // Conditionally add or remove padding based on the 'isSticky' state
    if (paddingElement) {
      if (isSticky) {
        paddingElement.style.paddingTop = '56px';
      } else {
        paddingElement.style.paddingTop = '0';
      }
    }
  }, [isSticky]);

  return (
    <header
      className={`flex flex-row justify-between w-full items-center h-16 bg-light max-w-xl ${
        isSticky ? 'fixed top-0 transform translate-y-0' : ''
      }`}
    >
      <div className='flex flex-row items-center justify-between w-full p-2 px-4 profileContainer'>
        <div className='flex items-center gap-2'>
          <img
            className='border-2 border-solid rounded-full h-14 dark-border'
            src={photoURL}
            alt='Home image'
          />
          {displayName}
        </div>
        <div className='flex gap-10 text-lg'>
          <div className=''>
            <a href='/logout'>
              <i className='fa-solid fa-right-from-bracket'></i>
            </a>
          </div>
          <div className=''>
            <a href='/compose'>
              <i className='cursor-pointer fa-solid fa-upload dark-text'></i>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
