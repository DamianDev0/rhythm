import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationRoutes} from '../../types/navigationRoutes';
import LoginScreen from '../../screens/loginScreen/loginScreen';
import SignUpScreen from '../../screens/signUpScreen/signUpScreen';
import OnboardingScreen from '../../screens/onboardingScreen/onbardingScreen';
import useOnboardingStatus from '../../hook/useInicialPublicRoute';
import Loader from '../../components/loader';

const Stack = createNativeStackNavigator<NavigationRoutes>();

const PublicRoutes = () => {
  const {initialRoute, loading} = useOnboardingStatus();

  if (loading) {
    return <Loader />;
  }

  return (
    <Stack.Navigator initialRouteName={initialRoute || 'Onboarding'}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false, animation: 'slide_from_right'}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{headerShown: false, animation: 'slide_from_right'}}
      />
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{headerShown: false, animation: 'slide_from_right'}}
      />
    </Stack.Navigator>
  );
};

export default PublicRoutes;
