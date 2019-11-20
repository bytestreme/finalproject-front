import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'http://10.101.36.16:8080/'
});
export default axiosInstance