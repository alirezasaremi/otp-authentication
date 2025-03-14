// fetch data

import axios from "axios";

export const instance = axios.create({
  baseURL: '/api',
  timeout: 40000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
  },
});

const fetcher = (url: string, headers?: any) => {

  return instance
    .get(url, {
      headers: headers,
    })
    .then((res) => {
      if (!res.data) {
        throw Error(res.data.message);
      }

      return res.data;
    })
    .catch((error) => {
      throw error
      
      // handling errors in SWRProvider.tsx file
      
    });
};

export default fetcher;
