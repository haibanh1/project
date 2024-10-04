import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/rooms';

export const listRooms = (page = 0, size = 10) => axios.get(`${REST_API_BASE_URL}?page=${page}&size=${size}`);

export const addRoom = (room) => axios.get({ REST_API_BASE_URL }, room);

export const updateRoom = (room, idRoom) => axios.post(REST_API_BASE_URL + '/updateRoom/' + idRoom, room);

export const createRoom = (room) => axios.post(REST_API_BASE_URL + '/createRoom', room);

export const getRoomById = (idRoom) => axios.get(REST_API_BASE_URL + '/' + idRoom);

export const deleteRoomById = (idRoom) => axios.get(REST_API_BASE_URL + '/deleteRoom/' + idRoom);

