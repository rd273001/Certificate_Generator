import axios from 'axios';

const api = axios.create( {
  baseURL: `https://certificate-generator-yof0.onrender.com/api`,
} );

export default api;