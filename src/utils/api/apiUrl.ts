import axios from 'axios';

const apiUrl = axios.create({
  baseURL: 'https://simple-dael-joji-429cc3e2.koyeb.app/rhythm/v1/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiUrl;
