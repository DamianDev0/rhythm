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
}

const HeaderHabitDetails: React.FC<HeaderHabitDetailsProps> = ({
  name,
  description,
  image,
}) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
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
    fontSize: 16,
    fontFamily: fontBold,
    color: '#FFF',
    marginBottom: 5,
  },
  description: {
    fontSize: 12,
    fontFamily: fontMedium,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  image: {
    width: width * 0.2,
    height: height * 0.13,
    borderRadius: 10,
  },
});

export default HeaderHabitDetails;
