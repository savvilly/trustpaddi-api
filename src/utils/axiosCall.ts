import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

const AxiosInstance = axios.create({
  baseURL: 'https://catererhub.com',
  // adapter: cache.adapter,
});

AxiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {

    if (config.headers === undefined) {
      config.headers
    }
    config.headers['Content-Type'] = 'application/json';
    // if (token) {
    //   config.headers['Authorization'] = `Bearer ${token}`;
    // }
    return config;
  },

  (error: AxiosError) => {
    return Promise.reject(error);
  },
);
export default AxiosInstance;
