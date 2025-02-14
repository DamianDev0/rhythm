import React, {useEffect} from 'react';

import {StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import MainRoutes from './src/navigation/mainNavigation';
import {persistor, store} from './src/redux/store';
import {initializeOneSignal} from './src/utils/oneSignal';

const App = () => {
  useEffect(() => {
    initializeOneSignal();
  }, []);
  //dnnded
  return (
    <Provider store={store}>
      <PersistGate
        loading={<GestureHandlerRootView style={styles.flex} />}
        persistor={persistor}>
        <GestureHandlerRootView style={styles.flex}>
          <MainRoutes />
          <Toast />
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});

export default App;
