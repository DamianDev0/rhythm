import {useState} from 'react';

import {ErrorResponse} from '../../../../core/domain/entities/user/response/errorResponse';
import {RegisterResponse} from '../../../../core/domain/entities/user/response/registerResponse';
import {UserController} from '../../../../core/infrastructure/controllers/user.controller';
import {CustomToast} from '../../../components/toastComponent';
import useNavigation from '../../../hook/useNavigation';

const useSignUp = () => {
  const navigation = useNavigation();

  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const handleGotoLogin = () => {
    navigation.navigate('Login');
  };

  const handleInputChange = (field: string, value: string) => {
    setCredentials(prev => ({...prev, [field]: value}));
  };

  const handleRegister = async () => {
    const {name, email, password} = credentials;

    if (!name || !email || !password) {
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
      const response: RegisterResponse | ErrorResponse =
        await UserController.RegisterUser({
          name,
          email,
          password,
        });

      if ('code' in response && response.code === 201) {
        CustomToast({
          type: 'success',
          text1: 'Success',
          text2: 'User registered successfully.',
        });
        handleGotoLogin();
      } else {
        CustomToast({
          type: 'error',
          text1: 'Error',
          text2: response.message || 'Registration failed.',
        });
      }
    } catch (error) {
      CustomToast({
        type: 'error',
        text1: 'Error',
        text2: 'There was a problem registering the user.',
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    credentials,
    loading,
    handleInputChange,
    handleGotoLogin,
    handleRegister,
  };
};

export default useSignUp;
