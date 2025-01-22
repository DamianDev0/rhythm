import React from 'react';
import {Image, Text, View, StyleSheet} from 'react-native';
import {
  fontBold,
  fontMedium,
  fourColor,
  height,
  width,
} from '../../../styles/globalStyles';


interface ChallengeCardProps {
  imageSource: any;
  title: string;
  description: string;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({
  imageSource,
  title,
  description,
}) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        <Image source={imageSource} style={styles.cardImage} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDescription}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: fourColor,
    borderRadius: 10,
    overflow: 'hidden',
    margin: 7,
    elevation: 4,
    shadowColor: '#F87929',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    width: width * 0.44,
    height: height * 0.285,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  cardImage: {
    width: width * 0.7,
    height: height * 0.18,
    resizeMode: 'contain',
  },
  textContainer: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 13,
    fontFamily: fontBold,
    marginBottom: 5,
    color: '#FFF',
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.8)',
    fontFamily: fontMedium,
    textAlign: 'center',
  },
});

export default ChallengeCard;
