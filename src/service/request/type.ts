import type { AxiosRequestConfig, AxiosResponse } from "axios";

export interface AckRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => any;
  requestInterceptorCatch?: (error: any) => any;
  responseInterceptor?: (res: T) => T;
  responseInterceptorCatch?: (error: any) => any;
}

export interface AckRequestConfig<T = AxiosResponse>
  extends AxiosRequestConfig {
  interceptors?: AckRequestInterceptors<T>;
  showLoading?: boolean;
}
