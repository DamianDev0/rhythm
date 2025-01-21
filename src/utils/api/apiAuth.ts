import axios from 'axios';

const apiAuth = axios.create({
  baseURL: 'http://192.168.1.4:4000/rhythm/v1/auth/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiAuth;
