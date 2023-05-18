import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./i18n/config";
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './Pages';
import './index.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <ToastContainer />
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </>
);



