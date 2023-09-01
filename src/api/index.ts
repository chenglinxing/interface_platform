import axios from 'axios';

const service = axios.create({
    // 配置接口请求的基本 URL
    baseURL: window.location.origin,
});

export default service;
