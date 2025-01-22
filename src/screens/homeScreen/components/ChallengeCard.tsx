import React from 'react';
import { View, Text, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import moment from 'moment';
import { width, fontBold, fontLight, fourColor, height } from '../../../styles/globalStyles';

interface ChallengeCardProps {
  title: string;
  imageSource: ImageSourcePropType;
  status: string;
  startDate?: string;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({
  title,
  imageSource,
  status,
  startDate,
}) => {
  const daysLeft = startDate ? 7 - moment().diff(moment(startDate), 'days') : null;
  return (
    <View style={styles.card}>
      <Image source={imageSource} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.statusContainer}>
          <Text style={styles.status}>{status}</Text>
          {daysLeft !== null && (
            <Text style={styles.daysLeft}>{daysLeft} days left</Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: fourColor,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width * 0.7,
    height: width * 0.35,
    marginBottom: 10,
  },
  image: {
    width: width * 0.25,
    height: width * 0.3,
    marginRight: 15,
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    gap: width * 0.05,
  },
  title: {
    fontSize: 13,
    width: width * 0.3,
    fontFamily: fontBold,
    color: '#FFF',
    marginBottom: 10,
  },
  status: {
    fontSize: 10,
    fontFamily: fontLight,
    color: '#FFF',
    textAlign: 'center',
    paddingVertical: 4,
  },
  statusContainer: {
    backgroundColor: '#000',
    borderRadius: 10,
    height: height * 0.03,
  },
  daysLeft: {
    fontSize: 10,
    fontFamily: fontLight,
    color: '#FFF',
    textAlign: 'center',
    marginTop: 5,
  },
});

export default ChallengeCard;
