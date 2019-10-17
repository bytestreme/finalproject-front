import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'http://10.101.40.170:8080/'
})
export default axiosInstance