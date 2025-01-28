import React from 'react';
import {enableScreens} from 'react-native-screens';
import PublicRoutes from './public/publicNavigation';
import PrivateRoutes from './private/privateNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';

enableScreens();

const MainRoutes = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.token.isAuthenticated,
  );
  return (
    <NavigationContainer>
      {isAuthenticated ? <PrivateRoutes /> : <PublicRoutes />}
    </NavigationContainer>
  );
};

export default MainRoutes;
