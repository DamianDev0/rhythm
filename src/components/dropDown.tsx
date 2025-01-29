import React from 'react';
import {View, StyleSheet, Text, Image, ImageSourcePropType} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {fontBold, fontLight, height, width} from '../styles/globalStyles';

interface GenericDropdownProps {
  data: {label?: string; value: string; iconUrl?: string}[];
  selectedValue: string | null;
  setSelectedValue: (value: string | null) => void;
  placeholder?: string;
  dropdownWidth?: number;
  dropdownHeight?: number;
  iconDropdown?: ImageSourcePropType;
  value?: string;
}

const GenericDropdown: React.FC<GenericDropdownProps> = ({
  data,
  selectedValue,
  setSelectedValue,
  placeholder = 'Select',
  dropdownWidth = 300,
  dropdownHeight = 50,
  iconDropdown,
}) => {
  return (
    <View style={[styles.dropdownContainer, {width: dropdownWidth}]}>
      <Dropdown
        data={data}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={selectedValue}
        onChange={item => setSelectedValue(item.value)}
        style={[
          styles.dropdown,
          {width: dropdownWidth, height: dropdownHeight},
        ]}
        placeholderStyle={styles.dropdownPlaceholder}
        selectedTextStyle={styles.selectedText}
        iconColor="#fff"
        containerStyle={styles.dropdownContainerStyle}
        renderLeftIcon={() =>
          iconDropdown ? (
            <Image source={iconDropdown} style={styles.iconDropdown} />
          ) : null
        }
        renderItem={item => (
          <View style={styles.dropdownItem}>
            {item.iconUrl && (
              <Image
                source={{uri: item.iconUrl}}
                style={styles.dropdownItemImage}
              />
            )}
            <Text style={styles.dropdownItemText}>{item.label}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    marginTop: 1,
    alignSelf: 'center',
  },
  dropdown: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 8,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownPlaceholder: {
    color: 'rgba(255, 255, 255, 0.3)',
    marginLeft: -10,
    fontFamily: fontLight,
    fontSize: 12,
  },
  selectedText: {
    color: '#fff',
    fontFamily: fontLight,
    fontSize: 10,
  },
  dropdownContainerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    borderColor: '#fff',
    borderRadius: 8,
    padding: 10,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  dropdownItemImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  dropdownItemText: {
    color: '#fff',
    flex: 1,
    textAlign: 'left',
    fontFamily: fontBold,
    fontSize: 11,
  },
  iconDropdown: {
    width: width * 0.14,
    height: height * 0.04,
    marginLeft: -15,
  },
});

export default GenericDropdown;
