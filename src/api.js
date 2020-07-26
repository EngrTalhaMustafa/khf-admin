import axios from "axios";

export default axios.create({
  // baseURL: "",
  baseURL: "http://localhost:3000",
  responseType: "json",
});