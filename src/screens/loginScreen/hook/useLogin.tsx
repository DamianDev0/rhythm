import useNavigation from '../../../hook/useNavigation';

const useLogin = () => {
  const navigation = useNavigation();

  const handleGotoSignUp = () => {
    navigation.navigate('SignUp');
  };

  const handleGoToHome = () => {
    navigation.navigate('Private');
  };

  return {handleGotoSignUp, handleGoToHome};
};

export default useLogin;
