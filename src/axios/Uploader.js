import { notification } from "antd";
import axios from "axios";
import { useState } from "react";

const useAxiosPost = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const postData = async (url, formData) => {
    setLoading(true);
    try {
      const response = await axios.post(url, formData);
      console.log("res", data);
      setData(response.data);
    } catch (error) {
      notification.error({
        message: `$(error.message)`,
        placement: "bottomRight",
      });
    } finally {
      setLoading(false);
    }
  };
  return { loading, data, postData };
};
export default useAxiosPost;
