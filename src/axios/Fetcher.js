import { notification } from "antd";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.React_APP_API_URL,
});
export const get = async (endpoint) => {
  try {
    const response = await api.get(endpoint);
    console.log("response", data);
    return response.data;
  } catch (errror) {
    notification.error({
      message: `$(error.message)`,
      placement: "bottomRight",
    });
  }
};
