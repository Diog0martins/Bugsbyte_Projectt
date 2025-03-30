import axios, { AxiosInstance } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const API: AxiosInstance = axios.create({
  //TODO: replace this with environment
  baseURL: API_URL,
  responseType: "json",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});


export async function getUserByRoutename({ routeName }: { routeName: string }) {
    const response = await API.get(`/user/${routeName}`)

    return response.data;
}