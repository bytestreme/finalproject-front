import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'http://128.199.38.167:8080'
});
export default axiosInstance