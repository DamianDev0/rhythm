import {
  LoginUser,
  RegisterUser,
  ValidateToken,
} from '../../application/useCases/user.useCases';
import {LoginRequest} from '../../domain/entities/user/request/loginRequest';
import {RegisterRequest} from '../../domain/entities/user/request/registerRequest';
import {LoginResponse} from '../../domain/entities/user/response/loginResponse';
import {RegisterResponse} from '../../domain/entities/user/response/registerResponse';
import {TokenValidateResponse} from '../../domain/entities/user/response/validateTokenResponse';
import {UserRepositoryImp} from '../repositories/user.repositoryImp';

const userRepository = new UserRepositoryImp();

export class UserController {
  static async RegisterUser(data: RegisterRequest): Promise<RegisterResponse> {
    try {
      const response = await RegisterUser(userRepository, data);
      return response;
    } catch (error) {
      throw new Error('Failed to register user. Please try again later.');
    }
  }

  static async LoginUser(data: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await LoginUser(userRepository, data);
      return response;
    } catch (error) {
      throw new Error('Failed to log in. Please check your credentials.');
    }
  }

  static async ValidateToken(token: string): Promise<TokenValidateResponse> {
    try {
      console.log('Validating token in UserController:', token);  // Añade log
      const response = await ValidateToken(userRepository, token);
      console.log('Token validation result:', response);  // Añade log de la respuesta
      return response;
    } catch (error) {
      console.error('Token validation failed:', error);  // Añade log de error
      throw new Error('Token validation failed');
    }
  }
}
