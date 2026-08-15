import axios from 'axios';

export const login = (username, password) => {
    return axios.post('/api/auth/login', { username, password });
}