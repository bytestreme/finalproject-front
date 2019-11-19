import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'http://10.110.114.116:8080/'
});
export default axiosInstance