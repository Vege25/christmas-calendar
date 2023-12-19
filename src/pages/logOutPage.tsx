import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { LoginProps } from '../interfaces/firebase';
import Loading from '../components/loadingComonent';

const LogOut: React.FC<LoginProps> = ({ firebase }) => {
  const navigate = useNavigate();
  const auth = getAuth(firebase);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Call handleSignOut as soon as the component is mounted
  handleSignOut();

  // You can render some loading indicator while the sign-out process is happening
  return <Loading />;
};

export default LogOut;
