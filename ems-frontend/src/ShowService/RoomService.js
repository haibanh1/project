import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/rooms';

export const listRooms = () => axios.get(REST_API_BASE_URL + "/getallroom");
