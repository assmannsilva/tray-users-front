import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';

export interface HttpClientResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface GoogleAuthResponse { auth_url: string;}

export default class GoogleAuthService {

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

  private async makeCall<T>(config: AxiosRequestConfig): Promise<HttpClientResponse<T>> {
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

  async signIn(): Promise<HttpClientResponse<GoogleAuthResponse>> {
    return this.makeCall({
      method: 'GET',
      url: '/api/auth/generate-token',
    });
  }

}

export const googleAuthService = new GoogleAuthService();
