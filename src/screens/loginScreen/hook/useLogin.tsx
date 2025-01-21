import { useState } from 'react';
import { Alert } from 'react-native';
import useNavigation from '../../../hook/useNavigation';
import { setToken } from '../../../redux/tokenSlice';
import { useDispatch } from 'react-redux';
import { UserController } from '../../../../core/infrastructure/controllers/user.controller';

const useLogin = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setCredentials(prev => ({ ...prev, [field]: value }));
  };

  const handleGotoSignUp = () => {
    navigation.navigate('SignUp');
  };

  const handleGoToHome = () => {
    navigation.navigate('Private');
  };

  const handleLogin = async () => {
    const { email, password } = credentials;

    if (!email || !password) {
      Alert.alert('Error', 'Por favor llena todos los campos');
      return;
    }

    try {
      const response = await UserController.LoginUser({ email, password });

      if (response.data.accessToken) {
        dispatch(setToken(response.data.accessToken));
        Alert.alert('Éxito', 'Usuario autenticado correctamente');
        console.log('Token guardado:', response.data.accessToken);
        handleGoToHome();
      } else {
        Alert.alert('Error', 'Credenciales incorrectas');
      }
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al iniciar sesión');
    }
  };

  return {
    credentials,
    handleInputChange,
    handleGotoSignUp,
    handleLogin,
  };
};

export default useLogin;
