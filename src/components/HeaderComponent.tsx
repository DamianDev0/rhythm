import React from 'react';

import {Image, Text, View, StyleSheet, ImageSourcePropType} from 'react-native';

import {fontBold, fourColor, height, width} from '../styles/globalStyles';

interface HeaderProps {
  title: string;
  imageSource: ImageSourcePropType;
}

const HeaderComponent: React.FC<HeaderProps> = ({title, imageSource}) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerCard}>
        <View style={styles.textContainer}>
          <Text style={styles.textHeader}>{title}</Text>
        </View>
        <Image source={imageSource} style={styles.imageHeader} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: width * 0.1,
  },
  containerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width * 0.9,
    height: height * 0.135,
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
    fontSize: 11.5,
    fontFamily: fontBold,
    color: '#000',
    textAlign: 'center',
  },
  imageHeader: {
    flex: 1.4,
    width: width * 1.4,
    height: width * 0.25,
    resizeMode: 'contain',
  },
});

export default HeaderComponent;
