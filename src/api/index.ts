import axios from "axios";

const instance = axios.create({
  baseURL: "https://safe-beach-85460.herokuapp.com",
  timeout: 7000,
});

export default instance;
