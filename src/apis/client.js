import axios from "axios";

const client = axios.create({
  baseURL: "https://lms-api-e6xd.onrender.com/api",
});

export default client;