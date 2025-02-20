import React, {useRef} from 'react';

import moment from 'moment';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Carousel, {ICarouselInstance} from 'react-native-reanimated-carousel';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {useSelector, useDispatch} from 'react-redux';

import ChallengeCard from './ChallengeCard';
import useNavigation from '../../../hook/useNavigation';
import {finishChallenge} from '../../../redux/actions/actions';
import {RootState} from '../../../redux/store';
import {width, height, fontBold, fontLight} from '../../../styles/globalStyles';

const ChallengeCarousel = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.token.userId);
  const challengesInProgress = useSelector(
    (state: RootState) => state.challenge.challengesInProgress,
  );
  const navigation = useNavigation();
  const carouselRef = useRef<ICarouselInstance>(null);

  const handleGoToChallenges = () => {
    navigation.navigate('Challenges');
  };

  if (!userId) {
    return;
  }

  const activeChallenges = challengesInProgress.filter(challenge => {
    const daysLeft = 7 - moment().diff(moment(challenge.startDate), 'days');
    if (daysLeft <= 0) {
      dispatch(finishChallenge({challengeId: challenge.id, userId}));
      return false;
    }
    return challenge.userId === userId;
  });

  const challenges = activeChallenges.map(progress => ({
    title: `${progress.title} - ${
      7 - moment().diff(moment(progress.startDate), 'days')
    } days left`,
    imageSource: progress.imageSource,
    status: 'In Progress',
  }));

  const goToNextChallenge = () => {
    if (carouselRef.current) {
      carouselRef.current.next();
    }
  };

  return (
    <View style={styles.carouselContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Your Challenges</Text>
      </View>
      {challenges.length === 0 ? (
        <TouchableOpacity onPress={handleGoToChallenges}>
          <Text style={styles.noChallengesText}>
            You haven't started any challenges yet. Click here to begin!
          </Text>
        </TouchableOpacity>
      ) : challenges.length === 1 ? (
        <View style={styles.singleChallengeContainer}>
          <ChallengeCard
            title={challenges[0].title}
            imageSource={challenges[0].imageSource}
            status={challenges[0].status}
          />
        </View>
      ) : (
        <Carousel
          ref={carouselRef}
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
      )}
      {challenges.length > 1 && (
        <Icon
          name="arrow-right"
          size={32}
          color="#fff"
          style={styles.arrowIcon}
          onPress={goToNextChallenge}
        />
      )}
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
    marginTop: width * 0.028,
  },
  titleContainer: {
    width: width,
    paddingLeft: 10,
  },
  noChallengesText: {
    fontSize: 11,
    fontFamily: fontLight,
    color: '#fff',
    marginTop: width * 0.15,
  },
  arrowIcon: {
    position: 'absolute',
    right: width * 0.14,
    top: width * 0.25,
    transform: [{translateY: -15}],
  },
  singleChallengeContainer: {
    marginRight: width * 0.2,
    marginTop: width * 0.02,
  },
});

export default ChallengeCarousel;
