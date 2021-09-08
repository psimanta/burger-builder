import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://test-fe9d3.firebaseio.com/'
});

export default instance;