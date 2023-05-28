import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/LoginForm';
import Dashboar from './components/Dashboard';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboar/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

