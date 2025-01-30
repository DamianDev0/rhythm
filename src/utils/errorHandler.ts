import {ErrorResponse} from '../../core/domain/entities/user/response/errorResponse';

export const handleApiError = (error: any): ErrorResponse => {
  if (error.response && error.response.data) {
    const {statusCode, message} = error.response.data;
    return {
      statusCode: statusCode || error.response.status,
      message: message || 'Unknown error occurred',
    };
  } else if (error.request) {
    return {statusCode: 0, message: 'Unable to connect to the server'};
  } else {
    return {
      statusCode: 0,
      message: error.message || 'Unexpected error occurred',
    };
  }
};
