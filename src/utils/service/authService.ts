import {LoginRequest} from '../../../core/domain/entities/user/request/loginRequest';
import {RegisterRequest} from '../../../core/domain/entities/user/request/registerRequest';
import {ErrorResponse} from '../../../core/domain/entities/user/response/errorResponse';
import {LoginResponse} from '../../../core/domain/entities/user/response/loginResponse';
import {RegisterResponse} from '../../../core/domain/entities/user/response/registerResponse';
import {TokenValidateResponse} from '../../../core/domain/entities/user/response/validateTokenResponse';
import apiUrl from '../api/apiUrl';
import {handleApiError} from '../errorHandler';

export const apiService = {
  async register(
    data: RegisterRequest,
  ): Promise<RegisterResponse | ErrorResponse> {
    try {
      const response = await apiUrl.post<RegisterResponse>(
        'auth/register',
        data,
      );
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  async login(data: LoginRequest): Promise<LoginResponse | ErrorResponse> {
    try {
      const response = await apiUrl.post<LoginResponse>('auth/login', data);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  async validateToken(token: string): Promise<TokenValidateResponse> {
    const response = await apiUrl.post<TokenValidateResponse>(
      'auth/validate-token',
      {token},
    );
    return response.data;
  },
};
