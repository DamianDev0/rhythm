import React from 'react';

import {ImageBackground, StyleSheet, View} from 'react-native';

import HeaderChart from './components/HeaderChart';
import PieChartComponent from './components/pieChart';

const ChartScreen = () => {
  return (
    <ImageBackground
      source={require('../../assets/img/background.png')}
      style={styles.background}>
      <HeaderChart />
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
