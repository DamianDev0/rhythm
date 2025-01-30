import { handleApiError } from '../../../src/utils/errorHandler';
import {
  LoginUser,
  RegisterUser,
  ValidateToken,
} from '../../application/useCases/user.useCases';
import {LoginRequest} from '../../domain/entities/user/request/loginRequest';
import {RegisterRequest} from '../../domain/entities/user/request/registerRequest';
import { ErrorResponse } from '../../domain/entities/user/response/errorResponse';
import {LoginResponse} from '../../domain/entities/user/response/loginResponse';
import {RegisterResponse} from '../../domain/entities/user/response/registerResponse';
import {TokenValidateResponse} from '../../domain/entities/user/response/validateTokenResponse';
import {UserRepositoryImp} from '../repositories/user.repositoryImp';

const userRepository = new UserRepositoryImp();

export class UserController {
  static async RegisterUser(data: RegisterRequest): Promise<RegisterResponse| ErrorResponse> {
    try {
      const response = await RegisterUser(userRepository, data);
      return response;
    } catch (error) {
      return handleApiError(error);
    }
  }

  static async LoginUser(data: LoginRequest): Promise<LoginResponse | ErrorResponse> {
    try {
      const response = await LoginUser(userRepository, data);
      return response;
    } catch (error) {
      return handleApiError(error);
    }
  }

  static async ValidateToken(token: string): Promise<TokenValidateResponse> {
    try {
      const response = await ValidateToken(userRepository, token);
      return response;
    } catch (error) {
      console.error('Token validation failed:', error);
      throw new Error('Token validation failed');
    }
  }
}
