import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const baseURL_prod  = `${process.env.EXPO_PUBLIC_API_URL}/api/`;

const api = axios.create({
    baseURL: baseURL_prod,
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
