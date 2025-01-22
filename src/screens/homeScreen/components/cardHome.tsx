import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {
  fontBold,
  fontLight,
  fourColor,
  height,
  width,
} from '../../../styles/globalStyles';

const CardHome = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.textContainer}>
          <Text style={styles.largeText}>1 Day</Text>
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
    flex: 0.23,
    alignItems: 'center',
    justifyContent: 'center',
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
    marginTop: width * 0.03,
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

export default CardHome;
