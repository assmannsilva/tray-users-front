import type { User } from '@/types/User';
import { ApiCallService } from './apiCall.service';
import type { HttpClientResponse } from '@/types/HttpClientResponse'; 
import type { UserRegistrationPayload } from '@/types/UserRegistrationPayload';

type GetUsersReponse = {
  data: User[];
  last_page: number;
  current_page: number;
}

export default class UserService extends ApiCallService {
  async completeRegistration(paylod: UserRegistrationPayload): Promise<HttpClientResponse<User>> {
    return this.makeCall({
        method: 'POST',
        url: '/api/users/'+paylod.user+'/complete-registration',
        data: paylod
    });
  }

  async getUsers(page: number, name: string, cpf: string): Promise<HttpClientResponse<GetUsersReponse>> {
    return this.makeCall({
      method: 'GET',
      url: '/api/users/search',
      params: {
        name,
        cpf,
        page
      }
    });
  }
}

export const userService = new UserService();
