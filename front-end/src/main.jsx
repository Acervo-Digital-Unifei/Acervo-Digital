import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import axios from 'axios';
import * as Constants from './constants';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

axios.interceptors.request.use((config) => {
  // We don't want to give our tokens for any external site
  if(!config.url.startsWith(Constants.BASE_API_URL)) 
    return config;
  
  const token = sessionStorage.getItem('token');
  if(token) config.headers['Authorization'] = token;
  return config;
});