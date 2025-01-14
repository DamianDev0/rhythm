import {useNavigation as useReactNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {NavigationRoutes} from '../types/navigationRoutes';

const useNavigation = () => {
  return useReactNavigation<NativeStackNavigationProp<NavigationRoutes>>();
};

export default useNavigation;
