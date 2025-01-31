import React from 'react';

import {TouchableOpacity, Text, StyleSheet} from 'react-native';

import {fontBold} from '../styles/globalStyles';

interface GenericButtonProps {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  width?: number;
  height?: number;
  backgroundColor?: string;
  color?: string;
  loading?: boolean;
}

const GenericButton: React.FC<GenericButtonProps> = ({
  title,
  onPress,
  disabled = false,
  width = 200,
  height = 50,
  backgroundColor = '#007BFF',
  color = '#fff',
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          width,
          height,
          backgroundColor,
          opacity: disabled ? 0.5 : 1,
        },
      ]}>
      <Text style={[styles.buttonText, {color}]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    margin: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3.5,
  },
  buttonText: {
    fontSize: 14,
    fontFamily: fontBold,
  },
});

export default GenericButton;
