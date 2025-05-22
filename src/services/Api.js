// src/services/api.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Generic Helpers
export const getData = async (endpoint) => {
  try {
    const res = await api.get(endpoint);
    return res.data;
  } catch (err) {
    console.error('API GET Error:', err);
    throw err;
  }
};

export const postData = async (endpoint, data) => {
  const res = await api.post(endpoint, data);
  return res.data;
};

export const putData = async (endpoint, data) => {
  const res = await api.put(endpoint, data);
  return res.data;
};

export const deleteData = async (endpoint) => {
  const res = await api.delete(endpoint);
  return res.data;
};
