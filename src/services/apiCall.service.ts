import type { HttpClientResponse } from '@/types/HttpClientResponse';
import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';

export abstract class ApiCallService {

  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: "http://localhost:8000",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
  }

  protected async makeCall<T>(config: AxiosRequestConfig): Promise<HttpClientResponse<T>> {
    try {
      const response = await this.axiosInstance.request<T>(config);
      return { success: true, data: response.data };
    } catch (error: any) {
      console.error(error);

      return {
        success: false,
        error: error.response?.data?.error || "Internal Error",
      };
    }
  }
}
