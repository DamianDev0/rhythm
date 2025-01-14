import useNavigation from '../../../hook/useNavigation';

const useSignUp = () => {
  const navigation = useNavigation();

  const handleGotoLogin = () => {
    navigation.navigate('Login');
  };

  return {handleGotoLogin};
};

export default useSignUp;
