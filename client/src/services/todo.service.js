import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://tech-ex-61efee9424c2.herokuapp.com/api/todos/";

const findAll = (params) => {
  const { page, order_by } = params;
  return axios
    .get(
      API_URL +
        `?page=${page ? page : 0}&limit=3&order_by=${order_by ? order_by : ""}`
    )
    .then((response) => {
      return response.data;
    });
};

const create = (body) => {
  return axios.post(API_URL, body).then((response) => {
    return response.data;
  });
};

const update = (body) => {
  return axios.put(API_URL, body, authHeader()).then((response) => {
    return response.data;
  });
};

const authService = {
  findAll,
  create,
  update,
};

export default authService;
