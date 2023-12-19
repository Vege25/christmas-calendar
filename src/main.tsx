import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Compose from './pages/composePage';
import Login from './pages/loginPage';
import Home from './pages/homePage';
import LogOut from './pages/logOutPage';
import { initializeApp } from 'firebase/app'; // Add this import
import './index.css'; // Import your styles

const firebaseConfig = {
  apiKey: 'AIzaSyBGgvgbuF0CZMtf4hZFkd2h4eXJODAYAfM',
  authDomain: 'mv-twitter.firebaseapp.com',
  projectId: 'mv-twitter',
  storageBucket: 'mv-twitter.appspot.com',
  messagingSenderId: '227687372666',
  appId: '1:227687372666:web:2554eb27e9774adf5ee8c3',
};
const firebaseApp = initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/compose' element={<Compose firebase={firebaseApp} />} />
        <Route path='/login' element={<Login firebase={firebaseApp} />} />
        <Route path='/logout' element={<LogOut firebase={firebaseApp} />} />
        <Route index path='/' element={<Home firebase={firebaseApp} />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
