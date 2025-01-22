import React from 'react';
import {useSelector} from 'react-redux';
import {View, StyleSheet, Text} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {width, height, fontBold} from '../../../styles/globalStyles';
import ChallengeCard from './ChallengeCard';
import moment from 'moment';
import {RootState} from '../../../redux/store';

const ChallengeCarousel = () => {
  const challengesInProgress = useSelector(
    (state: RootState) => state.challenge.challengesInProgress,
  );

  const challenges = challengesInProgress.map(progress => ({
    title: `${progress.title} - ${
      7 - moment().diff(moment(progress.startDate), 'days')
    } days left`,
    imageSource: progress.imageSource,
    status: 'In Progress',
  }));

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
