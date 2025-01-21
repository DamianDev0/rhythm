import {LoginRequest} from '../../domain/entities/user/request/loginRequest';
import {RegisterRequest} from '../../domain/entities/user/request/registerRequest';
import {LoginResponse} from '../../domain/entities/user/response/loginResponse';
import {RegisterResponse} from '../../domain/entities/user/response/registerResponse';
import {UserRepository} from '../../domain/interfaces/user.repository';

export const LoginUser = async (
  userRepository: UserRepository,
  data: LoginRequest,
): Promise<LoginResponse> => {
  return await userRepository.login(data);
};

export const RegisterUser = async (
  userRepository: UserRepository,
  data: RegisterRequest,
): Promise<RegisterResponse> => {
  return await userRepository.register(data);
};
