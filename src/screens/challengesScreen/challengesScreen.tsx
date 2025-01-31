import React from 'react';

import {StyleSheet, ImageBackground} from 'react-native';

import Challenges from './components/challenges';
import HeaderChallenges from './components/header';

const ChallengesScreen = () => {
  return (
    <ImageBackground
      source={require('../../assets/img/background.png')}
      style={styles.background}>
      <HeaderChallenges />
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
