import React from 'react';

import {StyleSheet, ImageBackground} from 'react-native';

import FormHabit from './components/formCreateHabit';
import HeaderComponent from '../../components/HeaderComponent';

const HabitScreen = () => {
  return (
    <ImageBackground
      source={require('../../assets/img/background.png')}
      style={styles.background}>
      <HeaderComponent
        title="Take the first step and create a habit"
        imageSource={require('../../assets/img/habitCreate.png')}
      />
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
