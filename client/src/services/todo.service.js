import axios from "axios";

const API_URL = "http://localhost:8000/api/todos/";

const user = JSON.parse(localStorage.getItem("user"));

const config = {
  headers: { Authorization: `Bearer ${user?.accessToken}` },
};

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
  return axios.put(API_URL, body, config).then((response) => {
    return response.data;
  });
};

const authService = {
  findAll,
  create,
  update,
};

export default authService;
