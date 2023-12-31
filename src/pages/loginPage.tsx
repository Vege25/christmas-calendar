import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginProps } from '../interfaces/firebase';
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from 'firebase/auth';

const Login: React.FC<LoginProps> = ({ firebase }) => {
  const auth = getAuth(firebase);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // Check the user's UID after successful login
        const user = result.user;
        if (
          user.uid !== 'qxR3IEwUd4aqwXUFAEe8jslJnxh1' &&
          user.uid !== 'aUF22uJVcsMwS1TY7sg31UtQVGy1'
        ) {
          // Log out the user if UID is not allowed
          signOut(auth);
          // Optionally, you can display a message or handle the case
          console.log('User not allowed. Logged out.');
          alert("User not allowed! You've been logged out.");
        } else {
          // Redirect to "/"
          navigate('/');
        }
      })
      .catch((error) => {
        // Handle errors if needed
        console.error(error);
      });
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen max-w-xl mx-auto bg-light'>
      <div className='flex items-center justify-center gap-2 p-5 text-xl'>
        <h3 className='text-2xl font-bold'>Metelle</h3>
        <i className='text-3xl font-bold text-red-400 fa-regular fa-heart text-red'></i>
      </div>
      <div className='flex flex-col items-center'>
        <p className='mt-0 text-md'>
          Kirjaudu sisään avataksesi lahjan
          <i className='pl-2 text-xl text-red-400 fa-solid fa-gift'></i>
        </p>
        <button
          onClick={signInWithGoogle}
          className='flex items-center justify-center gap-3 px-4 py-2 mt-4 text-white rounded-md bg-primary hover:bg-dark focus:outline-none focus:ring focus:border-light'
        >
          <label>Kirjaudu tästä</label>
          <i className='text-2xl fa-brands fa-google light-text'></i>
        </button>
      </div>
      <div className='absolute bottom-0 left-0 w-full snowman '>
        <div className='absolute bottom-0 transform -translate-x-1/2 bg-white rounded-full w-28 h-28 left-1/2'></div>
        <div className='absolute w-20 h-20 transform -translate-x-1/2 bg-white rounded-full bottom-20 left-1/2'></div>
        <div className='absolute w-16 h-16 transform -translate-x-1/2 bg-white rounded-full bottom-36 left-1/2'>
          <div className='absolute w-3 h-5 transform -translate-x-1/2 bg-orange-400 rounded-b-full left-1/2 bottom-1'></div>
        </div>
        <div className='absolute flex gap-2 transform -translate-x-1/2 bottom-44 left-1/2'>
          <div className='w-3 h-3 bg-black rounded-full '></div>
          <div className='w-3 h-3 bg-black rounded-full '></div>
        </div>
        <div className='absolute flex flex-col gap-5 transform -translate-x-1/2 bottom-12 left-1/2'>
          <div className='w-3 h-3 bg-black rounded-full '></div>
          <div className='w-3 h-3 bg-black rounded-full '></div>
          <div className='w-3 h-3 bg-black rounded-full '></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
