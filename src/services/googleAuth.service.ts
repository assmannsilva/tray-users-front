
import type { GoogleAuthResponse } from '@/types/GoogleAuthResponse';
import { ApiCallService } from './apiCall.service';
import type { HttpClientResponse } from '@/types/HttpClientResponse';

export default class GoogleAuthService extends ApiCallService {

  async signIn(): Promise<HttpClientResponse<GoogleAuthResponse>> {
    return this.makeCall({
      method: 'GET',
      url: '/api/auth/generate-token',
    });
  }
}

export const googleAuthService = new GoogleAuthService();
