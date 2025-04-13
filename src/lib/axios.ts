import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export const API_BACKEND = 'http://localhost:3000';
export const API_DUMMY = 'https://dummyjson.com';

const createAxiosInstance = (config: AxiosRequestConfig): AxiosInstance => {
	return axios.create(config);
};

export const client = createAxiosInstance({
	baseURL: API_BACKEND,
});

export const clientDummy = createAxiosInstance({
	baseURL: API_DUMMY,
});