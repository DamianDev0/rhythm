import React from 'react';
import {enableScreens} from 'react-native-screens';
import PublicRoutes from './public/publicNavigation';

enableScreens();

const MainRoutes = () => {
  return <PublicRoutes />;
};

export default MainRoutes;
