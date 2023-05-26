import axios from "axios";
import { AxiosInstance } from "axios";
import { ElLoading } from "element-plus";
import type { AckRequestInterceptors, AckRequestConfig } from "./type";
class AckRequest {
  instance: AxiosInstance;
  interceptors?: AckRequestInterceptors;
  showLoading: boolean;
  loading: any;
  constructor(config: AckRequestConfig) {
    this.instance = axios.create(config);
    this.interceptors = config.interceptors;
    this.showLoading = config.showLoading ?? false;
    // 从config中取出的拦截器是对应实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch,
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch,
    );
    // 添加所有实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
          });
        }
        return config;
      },
      (err) => {
        return err;
      },
    );
    this.instance.interceptors.response.use(
      (res) => {
        this.loading?.close();
        const data = res.data;
        // if (data.returnCode === "-1001") {
        //   console.log("请求失败~");
        // } else {
        //   return data;
        // }
        return data;
      },
      (err) => {
        return err;
      },
    );
  }
  request<T = any>(config: AckRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res);
          }
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  get<T = any>(config: AckRequestConfig<T>): Promise<T> {
    return this.request<T>({
      ...config,
      method: "GET",
    });
  }
  post<T = any>(config: AckRequestConfig<T>): Promise<T> {
    return this.request<T>({
      ...config,
      method: "POST",
    });
  }
  delete<T = any>(config: AckRequestConfig<T>): Promise<T> {
    return this.request<T>({
      ...config,
      method: "DELETE",
    });
  }
  patch<T = any>(config: AckRequestConfig<T>): Promise<T> {
    return this.request<T>({
      ...config,
      method: "PATCH",
    });
  }
}
export default AckRequest;
