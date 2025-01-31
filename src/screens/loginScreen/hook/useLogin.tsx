import { useState } from 'react';

import { useDispatch } from 'react-redux';

import { ErrorResponse } from '../../../../core/domain/entities/user/response/errorResponse';
import { LoginResponse } from '../../../../core/domain/entities/user/response/loginResponse';
import { UserController } from '../../../../core/infrastructure/controllers/user.controller';
import { CustomToast } from '../../../components/toastComponent';
import useNavigation from '../../../hook/useNavigation';
import { setToken } from '../../../redux/tokenSlice';

const useLogin = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setCredentials(prev => ({ ...prev, [field]: value }));
  };

  const handleGotoSignUp = () => {
    navigation.navigate('SignUp');
  };

  const handleGoToHome = () => {
    navigation.navigate('Home');
  };

  const handleLogin = async () => {
    const { email, password } = credentials;

    if (!email || !password) {
      CustomToast({
        type: 'error',
        text1: 'Error',
        text2: 'Please fill in all fields.',
        position: 'top',
      });
      return;
    }

    setLoading(true);

    try {
      const response: LoginResponse | ErrorResponse = await UserController.LoginUser({ email, password });

      if ('data' in response) {
        dispatch(setToken({ token: response.data.accessToken, userId: response.data.id }));
        CustomToast({
          type: 'success',
          text1: 'Success',
          text2: 'Logged in successfully.',
          position: 'top',
        });
        handleGoToHome();
      } else {
        CustomToast({
          type: 'error',
          text1: 'Error',
          text2: response.message,
        });
      }
    } catch (error) {
      CustomToast({
        type: 'error',
        text1: 'Error',
        text2: 'Unable to log in, please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    credentials,
    loading,
    handleInputChange,
    handleGotoSignUp,
    handleLogin,
  };
};

export default useLogin;
