/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {useRoute} from '@react-navigation/native';
import {StyleSheet, ImageBackground, View, Text, Image} from 'react-native';
import Timeline from 'react-native-timeline-flatlist';
import {
  fontBold,
  fontLight,
  fontMedium,
  fourColor,
  height,
  width,
} from '../../styles/globalStyles';
import {useChallengeStatus} from './hook/useChallengeStatus';
import GenericButton from '../../components/genericButton';

const ChallengesDetailsScreen = () => {
  const route = useRoute();
  const item = route.params as {
    id: string;
    title: string;
    description: string | null;
    imageSource: any;
    timeline: {time: string; title: string; description: string}[];
  };

  const {isChallengeInProgress, toggleChallengeStatus} = useChallengeStatus(
    item.id,
    item.imageSource,
    item.title,
  );

  return (
    <ImageBackground
      source={require('../../assets/img/background.png')}
      style={styles.background}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
          <Image source={item.imageSource} style={styles.image} />
        </View>
        <View style={styles.timelineContainer}>
          <Timeline
            data={item.timeline}
            circleSize={20}
            circleColor="#000"
            lineColor="#fff"
            lineWidth={4}
            timeContainerStyle={{minWidth: 70, marginTop: 0}}
            timeStyle={{
              textAlign: 'center',
              backgroundColor: '#ccc',
              color: '#000',
              padding: 6,
              borderRadius: 13,
              fontFamily: fontMedium,
            }}
            descriptionStyle={{
              color: '#FFF',
              fontFamily: fontLight,
              fontSize: 12,
            }}
            titleStyle={{color: '#FFF', fontSize: 14, fontFamily: fontBold}}
            innerCircle={'icon'}
            iconStyle={{
              height: 10,
              width: 10,
              borderRadius: 10,
              backgroundColor: fourColor,
            }}
            separator={false}
            detailContainerStyle={{
              marginBottom: 20,
              paddingHorizontal: 10,
              backgroundColor: fourColor,
              borderRadius: 10,
            }}
            style={{flex: 1}}
          />
        </View>
        <GenericButton
          onPress={toggleChallengeStatus}
          title={isChallengeInProgress ? 'Finish Challenge' : 'Start Challenge'}
          color="#fff"
          backgroundColor="#000"
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: width * 0.1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width * 0.9,
    backgroundColor: fourColor,
    borderRadius: 10,
    padding: width * 0.05,
    marginBottom: 20,
    height: height * 0.18,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: width * 0.03,
  },
  image: {
    flex: 1.5,
    width: width * 1.8,
    height: height * 0.29,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontFamily: fontBold,
    color: '#FFF',
    marginBottom: 10,
  },
  description: {
    fontSize: 11,
    color: '#FFF',
    textAlign: 'left',
    marginBottom: 20,
    fontFamily: fontLight,
  },
  timelineContainer: {
    flex: 1,
    width: width * 0.9,
    paddingTop: 20,
  },
  startButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  startButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: fontBold,
  },
});

export default ChallengesDetailsScreen;
