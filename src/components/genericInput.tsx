
import React from 'react';

import {
  TextInput,
  StyleSheet,
  TextInputProps,
  View,
  Image,
  ImageSourcePropType,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  fontLight,
  height as screenHeight,
  width as screenWidth,
} from '../styles/globalStyles';

interface InputProps extends TextInputProps {
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  editable?: boolean;
  height?: number;
  width?: number;
  color?: string;
  marginBottom?: number;
  opacity?: number;
  icon?: string;
  iconImage?: ImageSourcePropType;
  iconHeight?: number;
  iconWidth?: number;
  keyboardType?: TextInputProps['keyboardType'];
  secureTextEntry?: boolean;
  backgroundColor?: string;
  textColor?: string;
}

const InputGeneric: React.FC<InputProps> = ({
  placeholder,
  value,
  onChangeText,
  editable = true,
  height = 50,
  width = 350,
  marginBottom,
  opacity = 1,
  icon,
  iconImage,
  iconHeight = screenHeight * 0.05,
  iconWidth = screenWidth * 0.1,
  keyboardType,
  secureTextEntry,
  backgroundColor = '#FFF',
  textColor = '#FFF',
}) => {
  return (
    <View
      style={[
        styles.inputContainer,
        {height, width, marginBottom, backgroundColor, opacity},
      ]}>
      {icon && !iconImage && (
        <Icon name={icon} size={23} color="#FFF" style={styles.icon} />
      )}
      {iconImage && (
        <Image
          source={iconImage}
          style={[styles.iconImage, {width: iconWidth, height: iconHeight}]}
          resizeMode="contain"
        />
      )}
      <TextInput
        style={[styles.input, {color: textColor}]}
        placeholder={placeholder}
        placeholderTextColor="rgba(255, 255, 255, 0.5)"
        value={value}
        onChangeText={onChangeText}
        editable={editable}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowRadius: 4,
  },
  icon: {
    marginRight: 5,
  },
  iconImage: {
    marginRight: screenWidth * -0.03,
    marginHorizontal: screenWidth * -0.05,
  },
  input: {
    flex: 1,
    fontSize: 11,
    alignItems: 'center',
    justifyContent: 'space-between',
    fontFamily: fontLight,
    marginTop: 5,
  },
});

export default InputGeneric;
