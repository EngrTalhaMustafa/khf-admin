import axios from "axios";

export default axios.create({
  // baseURL: config.host[config.evn],
  baseURL: "http://localhost:3000",
  responseType: "json",
});