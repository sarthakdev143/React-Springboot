import axios from "axios";
export const BASE_URL = 'http://localhost:8080';
export const MYAXIOS = axios.create({ baseURL: BASE_URL })

