import axios from 'axios';
import { store } from '../store/store';

const client = axios.create({
  baseURL: 'http://localhost:4000/api',
});

client.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default client;
