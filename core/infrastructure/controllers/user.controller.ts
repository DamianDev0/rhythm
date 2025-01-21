import {LoginUser, RegisterUser} from '../../application/useCases/user.useCases';
import { LoginRequest } from '../../domain/entities/user/request/loginRequest';
import {RegisterRequest} from '../../domain/entities/user/request/registerRequest';
import { LoginResponse } from '../../domain/entities/user/response/loginResponse';
import {UserRepositoryImp} from '../repositories/user.repositoryImp';

const userRepository = new UserRepositoryImp();

export class UserController {
  static async RegisterUser(data: RegisterRequest) {
    try {
      RegisterUser(userRepository, data);
      console.log('user created successfully:');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  }
  static async LoginUser(data: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await LoginUser(userRepository, data);
      return response;
    } catch (error) {
      console.error('Error logging in user:', error);
      throw error;
    }
  }

}
