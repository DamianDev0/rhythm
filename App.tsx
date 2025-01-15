import 'react-native-reanimated';
import React from 'react';
import MainRoutes from './src/navigation/mainNavigation';
import Toast from 'react-native-toast-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <MainRoutes />
      <Toast />
    </GestureHandlerRootView>
  );
};

export default App;
