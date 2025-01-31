import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {enableScreens} from 'react-native-screens';
import {useSelector} from 'react-redux';

import PrivateRoutes from './private/privateNavigation';
import PublicRoutes from './public/publicNavigation';
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
