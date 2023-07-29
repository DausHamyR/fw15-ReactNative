import axios from 'axios';
import {BACKEND_URL} from '@env';

const http = token => {
  const headers = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const instance = axios.create({
    baseURL: BACKEND_URL,
    headers,
  });
  return instance;
};

console.log(BACKEND_URL, 'tes');
console.log(http());

export default http;
