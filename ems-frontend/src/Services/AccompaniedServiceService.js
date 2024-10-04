import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/accompaniedService';

export const listAccompaniedService = (page = 0, size = 10) => axios.get(`${REST_API_BASE_URL}?page=${page}&size=${size}`);

export const addAccompaniedService = (AccompaniedService) => axios.get({ REST_API_BASE_URL }, AccompaniedService);

export const updateAccompaniedService = (AccompaniedService, idAccompaniedService) => axios.post(REST_API_BASE_URL + '/updateaccompaniedService/' + idAccompaniedService, AccompaniedService);

export const createAccompaniedService = (AccompaniedService) => axios.post(REST_API_BASE_URL + '/createaccompaniedService', AccompaniedService);

export const getAccompaniedServiceById = (idAccompaniedService) => axios.get(REST_API_BASE_URL + '/' + idAccompaniedService);

export const deleteAccompaniedServiceById = (idAccompaniedService) => axios.get(REST_API_BASE_URL + '/deleteaccompaniedService/' + idAccompaniedService);

