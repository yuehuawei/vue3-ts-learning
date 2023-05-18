import type { AxiosRequestConfig, AxiosResponse } from "axios";

export interface AckRequestInterceptors {
  requestInterceptor?: (config: AxiosRequestConfig) => any;
  requestInterceptorCatch?: (error: any) => any;
  responseInterceptor?: (res: AxiosResponse) => AxiosResponse;
  responseInterceptorCatch?: (error: any) => any;
}

export interface AckRequestConfig extends AxiosRequestConfig {
  interceptors?: AckRequestInterceptors;
  showLoading?: boolean;
}
