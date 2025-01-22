import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

import {width, height, fontBold} from '../../../styles/globalStyles';
import ChallengeCard from './ChallengeCard';

const ChallengeCarousel = () => {
  const challenges = [
    {
      title: 'Eat healthy 7 Days',
      imageSource: require('../../../assets/img/food.png'),
      status: 'In Progress',
    },
    {
      title: 'Stop drinking 7 Days',
      imageSource: require('../../../assets/img/drink.png'),
      status: 'In Progress',
    },
    {
      title: 'Stop drinking 7 Days',
      imageSource: require('../../../assets/img/drink.png'),
      status: 'In Progress',
    },
  ];

  return (
    <View style={styles.carouselContainer}>
        <View style={styles.titleContainer}>
        <Text style={styles.title}>Your Challenges</Text>
      </View>
      <Carousel
        data={challenges}
        renderItem={({item}) => (
          <ChallengeCard
            title={item.title}
            imageSource={item.imageSource}
            status={item.status}
          />
        )}
        width={width * 0.99}
        height={height * 0.18}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    flex: 0.27,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  title: {
    fontSize: 12,
    fontFamily: fontBold,
    color: '#fff',
    marginBottom: 5,
    textAlign: 'left',
    paddingLeft: 10,
  },
  titleContainer: {
    width: width,
    paddingLeft: 10,
  },
});

export default ChallengeCarousel;
