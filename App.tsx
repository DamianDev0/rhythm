import 'react-native-reanimated';
import React, {useEffect} from 'react';
import MainRoutes from './src/navigation/mainNavigation';
import Toast from 'react-native-toast-message';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import store from './src/redux/store';
// import database from './src/utils/database/SQLiteDatabase';

// const resetDatabase = () => {
//   database.transaction(tx => {
//     tx.executeSql('DROP TABLE IF EXISTS habits');
//     tx.executeSql('DROP TABLE IF EXISTS another_table');
//   });
// };

const App = () => {
  useEffect(() => {
    // resetDatabase();
  }, []);

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{flex: 1}}>
        <MainRoutes />
        <Toast />
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;
