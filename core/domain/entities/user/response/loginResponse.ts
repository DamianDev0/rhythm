export interface LoginResponse {
  code: number;
  message: string;
  data: {
    id: string
    accessToken: string;
  };
}
