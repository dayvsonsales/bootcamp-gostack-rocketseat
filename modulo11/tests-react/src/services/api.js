import axios from 'axios';

const api = axios.create({
  host: 'http://localhost:3333',
});

export default api;
