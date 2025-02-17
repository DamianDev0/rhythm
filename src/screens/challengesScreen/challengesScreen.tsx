import React from 'react';

import {StyleSheet, ImageBackground} from 'react-native';

import Challenges from './components/challenges';
import HeaderComponent from '../../components/HeaderComponent';

const ChallengesScreen = () => {
  return (
    <ImageBackground
      source={require('../../assets/img/background.png')}
      style={styles.background}>
      <HeaderComponent
        title=" Many Challeges Waiting for you ahead"
        imageSource={require('../../assets/img/challenge.png')}
      />
      <Challenges />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});

export default ChallengesScreen;
