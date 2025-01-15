import React from 'react';
import { enableScreens } from 'react-native-screens';
import PublicRoutes from './public/publicNavigation';
import PrivateRoutes from './private/privateNavigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { NavigationRoutes } from '../types/navigationRoutes';

enableScreens();

const Stack = createNativeStackNavigator<NavigationRoutes>();

const MainRoutes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Public">
        <Stack.Screen
          name="Public"
          component={PublicRoutes}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Private"
          component={PrivateRoutes}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainRoutes;
