import axios from "axios";

const API_URL = "http://localhost:8089"; // 스프링 서버 주소

export default axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
