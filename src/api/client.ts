import axios from 'axios';

export const BASE_URL = 'https://rickandmortyapi.com/api';

export const httpClient = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
});
