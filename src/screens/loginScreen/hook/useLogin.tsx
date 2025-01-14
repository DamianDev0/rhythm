import useNavigation from '../../../hook/useNavigation';

const useLogin = () => {
  const navigation = useNavigation();

  const handleGotoSignUp = () => {
    navigation.navigate('SignUp');
  };

  return {handleGotoSignUp};
};

export default useLogin;
