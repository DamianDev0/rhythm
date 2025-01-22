import { LoginUser, RegisterUser } from '../../application/useCases/user.useCases';
import { LoginRequest } from '../../domain/entities/user/request/loginRequest';
import { RegisterRequest } from '../../domain/entities/user/request/registerRequest';
import { LoginResponse } from '../../domain/entities/user/response/loginResponse';
import { RegisterResponse } from '../../domain/entities/user/response/registerResponse';
import { UserRepositoryImp } from '../repositories/user.repositoryImp';

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
}
