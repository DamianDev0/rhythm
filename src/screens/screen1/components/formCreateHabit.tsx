import React from 'react';
import {View, StyleSheet} from 'react-native';
import InputGeneric from '../../../components/genericInput';
import {height, width} from '../../../styles/globalStyles';
import GenericButton from '../../../components/genericButton';

const FormHabit = () => {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <InputGeneric
          placeholder="Name Habit"
          backgroundColor="rgba(0, 0, 0, 0.5)"
          iconImage={require('../../../assets/img/cup.png')}
          iconHeight={width * 0.8}
          iconWidth={height * 0.06}
           width={width * 0.85}
        />
        <InputGeneric
          placeholder="Name Habit"
          backgroundColor="rgba(0, 0, 0, 0.5)"
          iconImage={require('../../../assets/img/cup.png')}
          iconHeight={width * 0.8}
          iconWidth={height * 0.06}
           width={width * 0.85}
        />
          <InputGeneric
          placeholder="Name Habit"
          backgroundColor="rgba(0, 0, 0, 0.5)"
          iconImage={require('../../../assets/img/cup.png')}
          iconHeight={width * 0.8}
          iconWidth={height * 0.06}
           width={width * 0.85}
        />
        <View style={styles.buttonContainer}>
          <GenericButton title="Save" color="#FFF" backgroundColor="#000" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',

  },
  inputContainer: {
    width: width * 0.8,
    alignItems: 'center',
    gap: width * 0.05,
  },
  buttonContainer: {
    marginTop: width * 0.05,
    width: width * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FormHabit;
