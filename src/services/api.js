import axios from "axios";
//172.20.10.3 ou 192.152.85.100

const ApiMananger = axios.create({
  baseURL: "http://172.20.10.2:8080",
});

export default ApiMananger;
