import React from 'react';

import {Image, Text} from 'react-native';
import {StyleSheet, View} from 'react-native';

import {fontBold, fourColor, height, width} from '../../../styles/globalStyles';

const HeaderChart = () => {
  return (
    <View style={styles.container}>
      <View style={styles.containerCard}>
        <View style={styles.textContainer}>
          <Text style={styles.textHeader}>
            Keep moving forward and build on your progress!
          </Text>
        </View>
        <Image
          source={require('../../../assets/img/chartHeader.png')}
          style={styles.imageHeader}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: width * 0.115,
  },
  containerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width * 0.9,
    height: height * 0.14,
    backgroundColor: fourColor,
    borderRadius: 10,
    padding: width * 0.05,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: width * 0.03,
  },
  textHeader: {
    fontSize: 12,
    fontFamily: fontBold,
    color: '#000',
    textAlign: 'center',
  },
  imageHeader: {
    flex: 1.4,
    width: width * 1.4,
    height: width * 0.4,
    resizeMode: 'contain',
  },
});

export default HeaderChart;
