import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PrivateTabs from '../components/curvedTab';
import { NavigationRoutes } from '../../types/navigationRoutes';

const Stack = createNativeStackNavigator<NavigationRoutes>();

const PrivateRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={PrivateTabs}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default PrivateRoutes;
