import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './appStore'; 
import SideNav from './components/SideNav';
import Home from './components/Home';
import Login from './components/Auth/Login';

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <SideNav /> 
        <Routes>
        <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
         
        </Routes>
      </Router>
    </Provider>
  );
}