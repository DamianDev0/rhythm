import React from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import InputGeneric from '../../../components/genericInput';
import {height, width} from '../../../styles/globalStyles';
import GenericButton from '../../../components/genericButton';
import useCreateHabit from '../hook/useCreateHabit';
import ChosseImage from './ChosseImage';

const FormHabit = () => {
  const {habitData, handleInputChange, handleSubmit, handleImageChange} =
    useCreateHabit();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 100}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled">
        <View style={styles.innerContainer}>
          <ChosseImage onImageSelect={handleImageChange} />
          <View style={styles.inputContainer}>
            <InputGeneric
              placeholder="Habit Name"
              backgroundColor="rgba(0, 0, 0, 0.5)"
              iconImage={require('../../../assets/img/name.png')}
              iconHeight={width * 0.7}
              iconWidth={height * 0.055}
              width={width * 0.85}
              value={habitData.name}
              onChangeText={text => handleInputChange('name', text)}
            />
            <InputGeneric
              placeholder="Description"
              backgroundColor="rgba(0, 0, 0, 0.5)"
              iconImage={require('../../../assets/img/description.png')}
              iconHeight={width * 0.8}
              iconWidth={height * 0.06}
              width={width * 0.85}
              value={habitData.description}
              onChangeText={text => handleInputChange('description', text)}
            />
            <InputGeneric
              placeholder="Frequency"
              backgroundColor="rgba(0, 0, 0, 0.5)"
              iconImage={require('../../../assets/img/frecuency.png')}
              iconHeight={width * 0.8}
              iconWidth={height * 0.06}
              width={width * 0.85}
              value={habitData.frequency}
              onChangeText={text => handleInputChange('frequency', text)}
            />
            <View style={styles.buttonContainer}>
              <GenericButton
                title="Save"
                color="#FFF"
                backgroundColor="#000"
                onPress={handleSubmit}
                height={50}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 50,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: width * 0.8,
    alignItems: 'center',
    gap: width * 0.04,
  },
  buttonContainer: {
    marginTop: width * 0.05,
    width: width * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
});

export default FormHabit;
