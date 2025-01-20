import React from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import HeaderHabit from './components/HeaderHabit';
import ChosseImage from './components/ChosseImage';
import FormHabit from './components/formCreateHabit';

const Screen1 = () => {
  return (
    <ImageBackground
      source={require('../../assets/img/background.png')}
      style={styles.background}>
      <HeaderHabit />
      <ChosseImage />
      <FormHabit />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
 
  },
});

export default Screen1;
