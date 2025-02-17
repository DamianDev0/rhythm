import React from 'react';

import {ImageBackground, StyleSheet, View} from 'react-native';

import PieChartComponent from './components/pieChart';
import HeaderComponent from '../../components/HeaderComponent';

const ChartScreen = () => {
  return (
    <ImageBackground
      source={require('../../assets/img/background.png')}
      style={styles.background}>
      <HeaderComponent
        title="Keep moving forward and build on your progress!"
        imageSource={require('../../assets/img/chartHeader.png')}
      />
      <View style={styles.chartContainer}>
        <PieChartComponent />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  chartContainer: {
    flex: 1,
  },
});

export default ChartScreen;
