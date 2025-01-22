import axios from 'axios';

const apiAuth = axios.create({
  baseURL: 'https://complicated-martguerita-joji-9efd3a1c.koyeb.app/rhythm/v1/auth/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiAuth;
