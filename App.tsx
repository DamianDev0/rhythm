import 'react-native-reanimated';
import React from 'react';
import MainRoutes from './src/navigation/mainNavigation';
import Toast from 'react-native-toast-message';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <MainRoutes />
        <Toast />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
