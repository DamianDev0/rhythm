import React from 'react';

import {StyleSheet, ImageBackground} from 'react-native';

import FormHabit from './components/formCreateHabit';
import HeaderHabit from './components/HeaderHabit';

const HabitScreen = () => {
  return (
    <ImageBackground
      source={require('../../assets/img/background.png')}
      style={styles.background}>
      <HeaderHabit />
      <FormHabit />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});

export default HabitScreen;
