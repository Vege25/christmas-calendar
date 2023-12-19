import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginProps } from '../interfaces/firebase';
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
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
        console.log(result);
      })
      .catch((error) => {
        // Handle errors if needed
        console.error(error);
      });
  };

  return (
    <div className='h-screen flex flex-col justify-center items-center bg-light mx-auto max-w-xl'>
      <div className='flex justify-center items-center gap-2 p-5 text-xl'>
        <i className='fa-regular fa-heart font-bold text-red text-3xl text-red-400'></i>
        <h3 className='text-2xl font-bold'>Joulusovellus</h3>
      </div>
      <div className='flex flex-col items-center'>
        <p className='mt-0 text-md'>Jouluaatto</p>
        <button
          onClick={signInWithGoogle}
          className='flex gap-3 items-center justify-center mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-dark focus:outline-none focus:ring focus:border-light'
        >
          <label>Kirjaudu tästä</label>
          <i className='fa-brands fa-google light-text text-2xl'></i>
        </button>
      </div>
      <div className='absolute bottom-0 left-0 snowman w-full '>
        <div className='w-28 h-28 rounded-full bg-white absolute bottom-0 left-1/2 transform -translate-x-1/2'></div>
        <div className='w-20 h-20 rounded-full bg-white absolute bottom-20 left-1/2 transform -translate-x-1/2'></div>
        <div className='w-16 h-16 rounded-full bg-white absolute bottom-36 left-1/2 transform -translate-x-1/2'>
          <div className='absolute w-3 h-5 bg-orange-400 rounded-b-full left-1/2 transform -translate-x-1/2 bottom-1'></div>
        </div>
        <div className='flex gap-2 absolute bottom-44 left-1/2 transform -translate-x-1/2'>
          <div className='w-3 h-3 rounded-full bg-black '></div>
          <div className='w-3 h-3 rounded-full bg-black '></div>
        </div>
        <div className='flex flex-col gap-5 absolute bottom-12 left-1/2 transform -translate-x-1/2'>
          <div className='w-3 h-3 rounded-full bg-black '></div>
          <div className='w-3 h-3 rounded-full bg-black '></div>
          <div className='w-3 h-3 rounded-full bg-black '></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
