import {apiService} from '../../../src/utils/service/authService';
import {LoginRequest} from '../../domain/entities/user/request/loginRequest';
import {RegisterRequest} from '../../domain/entities/user/request/registerRequest';
import {LoginResponse} from '../../domain/entities/user/response/loginResponse';
import {RegisterResponse} from '../../domain/entities/user/response/registerResponse';
import {UserRepository} from '../../domain/interfaces/user.repository';

export class UserRepositoryImp implements UserRepository {
  async register(data: RegisterRequest): Promise<RegisterResponse> {
    try {
      return await apiService.register(data);
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  }

  async login(data: LoginRequest): Promise<LoginResponse> {
    try {
      return await apiService.login(data);
    } catch (error) {
      console.error('Error logging in user:', error);
      throw error;
    }
  }
}
