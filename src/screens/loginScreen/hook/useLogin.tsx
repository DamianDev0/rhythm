import {useState} from 'react';
import useNavigation from '../../../hook/useNavigation';
import {setToken} from '../../../redux/tokenSlice';
import {useDispatch} from 'react-redux';
import {UserController} from '../../../../core/infrastructure/controllers/user.controller';
import {CustomToast} from '../../../components/toastComponent';

const useLogin = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setCredentials(prev => ({...prev, [field]: value}));
  };

  const handleGotoSignUp = () => {
    navigation.navigate('SignUp');
  };

  const handleGoToHome = () => {
    navigation.navigate('Home');
  };

  const handleLogin = async () => {
    const {email, password} = credentials;

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
      const response = await UserController.LoginUser({email, password});

      if (response.data.accessToken) {
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
          text2: 'Invalid credentials.',
        });
      }
    } catch {
      CustomToast({
        type: 'error',
        text1: 'Error',
        text2: 'Unable to log in, password or email is invalid',
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
