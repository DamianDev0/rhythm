import React from 'react';

import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const GoBackButton = ({color = '#FFF', size = 24}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
      <Icon name="arrow-back" size={size} color={color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top:5,
    left: 15,
    zIndex: 10,
    padding: 10,
  },
});

export default GoBackButton;
