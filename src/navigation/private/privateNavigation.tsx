import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PrivateTabs from '../components/curvedTab';
import {NavigationRoutes} from '../../types/navigationRoutes';
import ChallengesDetailsScreen from '../../screens/challengesDetailsScreen/challengesDetailsScreen';
import HabitDetailsScreen from '../../screens/habitDetailscreen/habitDetailsScreen';

const Stack = createNativeStackNavigator<NavigationRoutes>();

const PrivateRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={PrivateTabs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChallengesDetails"
        component={ChallengesDetailsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HabitDetails"
        component={HabitDetailsScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default PrivateRoutes;
