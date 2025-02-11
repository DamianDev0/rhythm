export interface NotificationErrorResponse {
  code: number;
  data: {
    id: string;
    errors: string;
  };
}
