import axios from 'axios';

const BASE_URL = 'https://localhost:7051/';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export const createUser = async (name, email, password) => {
  try {
    const response = await api.post('/api/register', {
      name: name,
      email: email,
      password: password
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao criar os dados:', error);
    throw error; 
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await api.post('/api/login', {
      email: email,
      password: password
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao conectar usuário:', error);
    throw error; 
  }
};

export default api;
