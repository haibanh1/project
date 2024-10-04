import axios from "axios";

 const REST_API_BASE_URL = 'http://localhost:8080/customers';

 export const listCustomers = (page = 0, size = 10) => axios.get(`${REST_API_BASE_URL}?page=${page}&size=${size}`);

 export const historyCustomer = (customerId) => axios.get(REST_API_BASE_URL + '/history' + '/' + customerId )