import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {
  fontBold,
  fontLight,
  fourColor,
  height,
  width,
} from '../../../styles/globalStyles';

interface StreakProps {
  streak: number;
}

const Streak: React.FC<StreakProps> = ({streak}) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.textContainer}>
          <Text style={styles.largeText}>
            {streak} Day{streak !== 1 ? 's' : ''}
          </Text>
          <Text style={styles.smallText}>Your current streak</Text>
        </View>
        <Image
          source={require('../../../assets/img/streak.png')}
          style={styles.image}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.55,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: width * 0.1,
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: fourColor,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width * 0.9,
    height: height * 0.37,
  },
  textContainer: {
    flexDirection: 'column',
    gap: width * 0.02,
  },
  largeText: {
    fontSize: 22,
    color: '#FFFFFF',
    fontFamily: fontBold,
  },
  smallText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontFamily: fontLight,
  },
  image: {
    width: width * 0.45,
    height: height * 0.18,
  },
});

export default Streak;
