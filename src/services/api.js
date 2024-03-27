import axios from "axios";

const ApiMananger = axios.create({
  baseURL: "http://192.152.85.100:8080",
});

export default ApiMananger;
