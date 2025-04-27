// fetch data

import axios from "axios";

export const instance = axios.create({
  baseURL: "/api",
  timeout: 40000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
  },
});
