import {LoginRequest} from '../../domain/entities/user/request/loginRequest';
import {RegisterRequest} from '../../domain/entities/user/request/registerRequest';
import {LoginResponse} from '../../domain/entities/user/response/loginResponse';
import {RegisterResponse} from '../../domain/entities/user/response/registerResponse';
import { TokenValidateResponse } from '../../domain/entities/user/response/validateTokenResponse';
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

export const ValidateToken = async (
  userRepository: UserRepository,
  token: string
): Promise<TokenValidateResponse> => {
  return await userRepository.validateToken(token);
};
