import {LoginRequest} from '../../../core/domain/entities/user/request/loginRequest';
import {RegisterRequest} from '../../../core/domain/entities/user/request/registerRequest';
import {LoginResponse} from '../../../core/domain/entities/user/response/loginResponse';
import {RegisterResponse} from '../../../core/domain/entities/user/response/registerResponse';
import apiAuth from '../api/apiAuth';

export const apiService = {
  async register(data: RegisterRequest): Promise<RegisterResponse> {
    const response = await apiAuth.post<RegisterResponse>('register', data);
    return response.data;
  },

  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await apiAuth.post<LoginResponse>('login', data);
    return response.data;
  },
};
