import axios, { AxiosError } from 'axios';

export function setupAPIClient(ctx = undefined) {
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASEURL,
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  return api;
}
