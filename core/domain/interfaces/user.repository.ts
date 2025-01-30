import {LoginRequest} from '../entities/user/request/loginRequest';
import {RegisterRequest} from '../entities/user/request/registerRequest';
import {ErrorResponse} from '../entities/user/response/errorResponse';
import {LoginResponse} from '../entities/user/response/loginResponse';
import {RegisterResponse} from '../entities/user/response/registerResponse';
import {TokenValidateResponse} from '../entities/user/response/validateTokenResponse';

export interface UserRepository {
  register(data: RegisterRequest): Promise<RegisterResponse | ErrorResponse>;
  login(data: LoginRequest): Promise<LoginResponse | ErrorResponse>;
  validateToken(token: string): Promise<TokenValidateResponse>;
}
