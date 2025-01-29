import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {
  fontBold,
  fontMedium,
  fourColor,
  height,
  width,
} from '../../../styles/globalStyles';

interface HeaderHabitDetailsProps {
  name: string;
  description: string;
  image: string;
  frequency: string;
}

const HeaderHabitDetails: React.FC<HeaderHabitDetailsProps> = ({
  name,
  description,
  image,
  frequency,
}) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.frequency}>{frequency}</Text>
      </View>
      <Image source={{uri: image}} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width * 0.9,
    backgroundColor: fourColor,
    borderRadius: 10,
    padding: width * 0.05,
    marginBottom: 20,
    height: height * 0.16,
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
    gap: width * 0.03,
  },
  title: {
    fontSize: 14,
    fontFamily: fontBold,
    color: '#FFF',
    marginBottom: 5,
  },
  description: {
    fontSize: 11,
    fontFamily: fontMedium,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  frequency: {
    fontSize: 10,
    fontFamily: fontMedium,
    color: '#000',
    textTransform: 'capitalize',
  },
  image: {
    width: width * 0.3,
    height: height * 0.13,
    borderRadius: 10,
  },
});

export default HeaderHabitDetails;
