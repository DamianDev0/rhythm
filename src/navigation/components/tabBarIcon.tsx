import React from 'react';

import {Image, StyleSheet} from 'react-native';

import { height, width } from '../../styles/globalStyles';

interface TabBarIconProps {
  routeName: string;
}

const TabBarIcon: React.FC<TabBarIconProps> = ({routeName}) => {
  let imageSource: any;

  switch (routeName) {
    case 'HomeTab':
      imageSource = require('../../assets/img/home.png');
      break;
    case 'Habits':
      imageSource = require('../../assets/img/frecuency.png');
      break;
    case 'Chart':
      imageSource = require('../../assets/img/chart.png');
      break;
    case 'Challenges':
      imageSource = require('../../assets/img/challenges.png');
      break;
    case 'ImportDataScreen':
      imageSource = require('../../assets/img/file.png');
      break;
    default:
      imageSource = require('../../assets/img/frecuency.png');
  }

  return <Image source={imageSource} style={[styles.icon]} />;
};

const styles = StyleSheet.create({
  icon: {
    width: width * 0.17,
    height: height * 0.1,
    resizeMode: 'contain',
    marginBottom: 5,
  },
});

export default TabBarIcon;
