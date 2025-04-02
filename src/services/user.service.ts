import type { User } from '@/types/User';
import { ApiCallService } from './apiCall.service';
import type { HttpClientResponse } from '@/types/HttpClientResponse'; 
import type { UserRegistrationPayload } from '@/types/UserRegistrationPayload';

export default class UserService extends ApiCallService {
  async completeRegistration(paylod: UserRegistrationPayload): Promise<HttpClientResponse<User>> {
    return this.makeCall({
        method: 'POST',
        url: '/api/users/'+paylod.user+'/complete-registration',
        data: paylod
    });
  }
}

export const userService = new UserService();
