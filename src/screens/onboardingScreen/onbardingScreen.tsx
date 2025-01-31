/* eslint-disable react/no-unstable-nested-components */
import React from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import Ionicons from 'react-native-vector-icons/Ionicons';

import useNavigation from '../../hook/useNavigation';
import {
  fontBold,
  fontLight,
  fontMedium,
  height,
  primaryColor,
  secondaryColor,
  terceryColor,
  width,
} from '../../styles/globalStyles';

const OnboardingScreen = () => {
  const navigation = useNavigation();

  const handleSkipOrDone = async () => {
    await AsyncStorage.setItem('onboardingCompleted', 'true');
    navigation.navigate('Login');
  };

  const SkipButton = ({...props}) => (
    <TouchableOpacity style={styles.skipButton} {...props}>
      <Text style={styles.skipText}>Skip</Text>
    </TouchableOpacity>
  );

  const NextButton = ({...props}) => (
    <TouchableOpacity style={styles.nextButton} {...props}>
      <View style={styles.nextContent}>
        <Text style={styles.nextText}>Next</Text>
        <Ionicons
          name="arrow-forward"
          size={18}
          color={primaryColor}
          style={styles.icon}
        />
      </View>
    </TouchableOpacity>
  );

  const DoneButton = ({...props}) => (
    <TouchableOpacity style={styles.doneButton} {...props}>
      <View style={styles.doneContent}>
        <Text style={styles.doneText}>Get Started</Text>
        <Ionicons
          name="checkmark"
          size={25}
          color={primaryColor}
          style={styles.icon}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      style={styles.container}
      source={require('../../assets/img/background.png')}
      resizeMode="cover">
      <Onboarding
        onDone={handleSkipOrDone}
        onSkip={handleSkipOrDone}
        bottomBarHighlight={false}
        SkipButtonComponent={SkipButton}
        NextButtonComponent={NextButton}
        DoneButtonComponent={DoneButton}
        pages={[
          {
            backgroundColor: 'transparent',
            image: (
              <Image
                source={require('../../assets/img/onboarding1.png')}
                style={styles.image}
              />
            ),
            title: 'Welcome to rhythm',
            subtitle:
              'Discover the power of small, consistent changes. Start building habits that improve your well-being every day.',
            titleStyles: styles.title,
            subTitleStyles: styles.subtitle,
          },
          {
            backgroundColor: 'transparent',
            image: (
              <Image
                source={require('../../assets/img/onboarding2.png')}
                style={styles.image}
              />
            ),
            title: 'Find Your Inner Balance',
            subtitle:
              'Track your mindfulness journey and embrace the calm with guided meditations and progress insights',
            titleStyles: styles.title,
            subTitleStyles: styles.subtitle,
          },
          {
            backgroundColor: 'transparent',
            image: (
              <Image
                source={require('../../assets/img/onboarding3.png')}
                style={styles.imagebag}
              />
            ),
            title: 'Stay Active, Stay Healthy',
            subtitle:
              'Achieve your fitness goals by monitoring your daily workouts and building a stronger, healthier you.',
            titleStyles: styles.title,
            subTitleStyles: styles.subtitle,
          },
        ]}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: width * 2,
    height: height * 0.5,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 20,
    color: terceryColor,
    marginBottom: 10,
    fontFamily: fontBold,
  },
  subtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.6)',
    fontFamily: fontLight,
    marginBottom: width * 0.3,
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: width * 0.8,
  },
  imagebag: {
    width: width * 2,
    height: height * 0.5,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  skipButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 10,
    backgroundColor: secondaryColor,
    width: width * 0.3,
    height: height * 0.06,
  },
  skipText: {
    color: terceryColor,
    fontSize: 16,
    fontFamily: fontMedium,
    textAlign: 'center',
  },
  nextButton: {
    backgroundColor: secondaryColor,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 10,
    height: height * 0.06,
  },
  nextContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nextText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: fontMedium,
    textAlign: 'center',
    marginRight: 8,
  },
  doneButton: {
    backgroundColor: secondaryColor,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.9,
    position: 'absolute',
    bottom: -25,
    right: 20,
  },
  doneContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  doneText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: fontMedium,
    textAlign: 'center',
    marginRight: 8,
  },
  icon: {
    marginLeft: 5,
  },
});

export default OnboardingScreen;
