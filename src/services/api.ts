import axios from 'axios';


const commonApi = axios.create({
  baseURL: process.env.REACT_APP_COMMON_API,
});

export {  commonApi };
