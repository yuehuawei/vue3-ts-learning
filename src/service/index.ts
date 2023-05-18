// service 统一出口
import AckRequest from "./request/request";
import { BASE_URL, TIME_OUT } from "./request/config";
const ackRequest = new AckRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      console.log("requestInterceptor");
      const token = "";
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
      }
      return config;
    },
    requestInterceptorCatch: (err) => {
      console.log("requestInterceptorCatch");

      return err;
    },
    responseInterceptor: (res) => {
      console.log("responseInterceptor");
      return res.data;
    },
    responseInterceptorCatch: (err) => {
      console.log("responseInterceptorCatch");
      return err;
    },
  },
});
export default ackRequest;
