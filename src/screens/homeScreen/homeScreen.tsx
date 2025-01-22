import React from 'react';
import {StyleSheet, ImageBackground} from 'react-native';
import Calendar from './components/Calendar';
import HeaderHome from './components/Header';
import CardHome from './components/cardHome';
import HabitsHome from './components/Habits';
import ChallengeCarousel from './components/carouselChallengesHome';

const HomeScreen = () => {
  return (
    <ImageBackground
      source={require('../../assets/img/background.png')}
      style={styles.background}>
        <HeaderHome />
      <Calendar />
      <CardHome />
      <ChallengeCarousel />
      <HabitsHome />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});

export default HomeScreen;
