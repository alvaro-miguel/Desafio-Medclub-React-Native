import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const ip_real = '192.168.0.8'

const api = axios.create({
    baseURL: `http://${ip_real}:8000/api/`,
    timeout: 10000,
    headers:{
        'Content-Type':'application/json',
        'Accept':'application/json',
    }
});

api.interceptors.request.use(
    async(config) => {
        const token = await SecureStore.getItemAsync('user_acess_token');

        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api
