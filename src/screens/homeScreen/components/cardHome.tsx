import React, {useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {
  fontBold,
  fontMedium,
  fourColor,
  height,
  width,
} from '../../../styles/globalStyles';
import {quotes} from '../../../utils/data';

const getRandomQuote = () => {
  return quotes[Math.floor(Math.random() * quotes.length)];
};

const CardHome = () => {
  const [quote, setQuote] = useState(getRandomQuote());

  useFocusEffect(
    React.useCallback(() => {
      setQuote(getRandomQuote());
    }, []),
  );

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.textContainer}>
          <Text style={styles.largeText}>{quote.title}</Text>
          <Text style={styles.smallText}>{quote.text}</Text>
        </View>
        <Image
          source={require('../../../assets/img/homeavatars.png')}
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
    fontSize: 15,
    color: '#000',
    fontFamily: fontBold,
  },
  smallText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontFamily: fontMedium,
    maxWidth: width * 0.5,
  },
  image: {
    width: width * 0.3,
    height: height * 0.132,
  },
});

export default CardHome;
