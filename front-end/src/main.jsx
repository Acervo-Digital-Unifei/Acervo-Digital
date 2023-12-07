import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import * as Constants from './constants';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <App />
    <ToastContainer floatingTime={5000} position='top-left'/>
  </>,
)

axios.interceptors.request.use((config) => {
  // We don't want to give our tokens for any external site
  if(!config.url.startsWith(Constants.BASE_API_URL)) 
    return config;
  
  const token = sessionStorage.getItem('token');
  if(token) config.headers['Authorization'] = token;
  return config;
});