import axios from 'axios';

const API_URL = 'https://5932-190-113-115-107.ngrok-free.app'; // Add endpoint api

const axiosInstance = axios.create({
  baseURL: API_URL,
});

const requestInterceptor = config => {
    config.headers['Content-Type'] = 'application/json';
    return config;
}

axiosInstance.interceptors.request.use(requestInterceptor);

export const getUsers = async () => {
    try {
      const response = await axiosInstance.get('/Usuario/%22/%22/%22/%22/%22?filtro=%22');
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const createUser = async (postData) => {
    try {
      const response = await axiosInstance.post('/posts', postData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };