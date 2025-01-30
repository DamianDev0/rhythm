import {LoginRequest} from '../../../core/domain/entities/user/request/loginRequest';
import {RegisterRequest} from '../../../core/domain/entities/user/request/registerRequest';
import {ErrorResponse} from '../../../core/domain/entities/user/response/errorResponse';
import {LoginResponse} from '../../../core/domain/entities/user/response/loginResponse';
import {RegisterResponse} from '../../../core/domain/entities/user/response/registerResponse';
import {TokenValidateResponse} from '../../../core/domain/entities/user/response/validateTokenResponse';
import apiAuth from '../api/apiAuth';
import {handleApiError} from '../errorHandler';

export const apiService = {
  async register(
    data: RegisterRequest,
  ): Promise<RegisterResponse | ErrorResponse> {
    try {
      const response = await apiAuth.post<RegisterResponse>('register', data);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  async login(data: LoginRequest): Promise<LoginResponse | ErrorResponse> {
    try {
      const response = await apiAuth.post<LoginResponse>('login', data);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  async validateToken(token: string): Promise<TokenValidateResponse> {
    const response = await apiAuth.post<TokenValidateResponse>(
      'validate-token',
      {token},
    );
    return response.data;
  },
};
