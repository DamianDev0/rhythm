import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {fontLight, height, width} from '../../../styles/globalStyles';

const ChosseImage = () => {
  const handlePress = () => {
    console.log('Image button pressed!');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress}>
        <Image
          source={require('../../../assets/img/chosee.png')}
          style={styles.image}
        />
      </TouchableOpacity>
      <Text style={styles.text}>Select Image</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.29,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width * 0.9,
    height: height * 0.21,
    resizeMode: 'contain',
  },
  text: {
    color: '#FFF',
    fontSize: 12,
    fontFamily: fontLight,
  },
});

export default ChosseImage;
