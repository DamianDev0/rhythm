import {apiService} from '../../../src/utils/service/authService';
import {LoginRequest} from '../../domain/entities/user/request/loginRequest';
import {RegisterRequest} from '../../domain/entities/user/request/registerRequest';
import {LoginResponse} from '../../domain/entities/user/response/loginResponse';
import {RegisterResponse} from '../../domain/entities/user/response/registerResponse';
import {TokenValidateResponse} from '../../domain/entities/user/response/validateTokenResponse';
import {UserRepository} from '../../domain/interfaces/user.repository';

export class UserRepositoryImp implements UserRepository {
  async register(data: RegisterRequest): Promise<RegisterResponse> {
    try {
      return await apiService.register(data);
    } catch (error) {
      throw error;
    }
  }

  async login(data: LoginRequest): Promise<LoginResponse> {
    try {
      return await apiService.login(data);
    } catch (error) {
      throw error;
    }
  }

  async validateToken(token: string): Promise<TokenValidateResponse> {
    try {
      const response = await apiService.validateToken(token);
      return response;
    } catch (error) {
      throw new Error('Token validation failed');
    }
  }
}
