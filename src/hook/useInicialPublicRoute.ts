import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationRoutes} from '../types/navigationRoutes';

const useOnboardingStatus = () => {
  const [initialRoute, setInitialRoute] = useState<
    keyof NavigationRoutes | null
  >(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const onboardingCompleted = await AsyncStorage.getItem(
          'onboardingCompleted',
        );
        setInitialRoute(onboardingCompleted ? 'Login' : 'Onboarding');
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    checkOnboardingStatus();
  }, []);

  return {initialRoute, loading};
};

export default useOnboardingStatus;
