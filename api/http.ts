import axios from 'axios';

const http = axios.create({
    baseURL: '/api',
    timeout: 5000,
    withCredentials: true,
});

http.interceptors.response.use(
    (res) => {
        return res.data;
    },
    (error) => {
        console.error("请求异常", error);
        if (error.status === 401) {
            window.location.href = '/login';
            return Promise.reject(new Error('Unauthorized'));
        }
        return Promise.reject(error);
    }
);


export default http;
