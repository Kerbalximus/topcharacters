import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './pages/Layout';
import Login from './pages/Login'
import Info from './pages/Info'
import Character from './pages/Character'
import Home from './pages/Home';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="info" element={<Info />} />
          {/* <Route path="*" element={<Character />} /> */}
          <Route path='character/:number' element={<Character/>}></Route>
        </Route>
        {/* <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="info" element={<Info />} />
          <Route path="*" element={<Character />} />*/}
      </Routes> 
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
