import axios from 'axios';

export const baseURL = 'http://localhost:8080/api/v1'

export const apiInstance = axios.create({
    baseURL
});