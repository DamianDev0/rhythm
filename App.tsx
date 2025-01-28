import 'react-native-reanimated';
import React from 'react';
import MainRoutes from './src/navigation/mainNavigation';
import Toast from 'react-native-toast-message';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate
        loading={<GestureHandlerRootView style={{flex: 1}} />}
        persistor={persistor}>
        <GestureHandlerRootView style={{flex: 1}}>
          <MainRoutes />
          <Toast />
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
};

export default App;
