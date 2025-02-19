import React, {useEffect} from 'react';

import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

import BottomSheet from '../../../components/bottomSheet';
import GenericDropdown from '../../../components/dropDown';
import GenericButton from '../../../components/genericButton';
import InputGeneric from '../../../components/genericInput';
import Loader from '../../../components/loader';
import {fontBold, height, width} from '../../../styles/globalStyles';
import {frequencyOptions} from '../../../utils/data';
import {useEditHabit} from '../hooks/useEditHabit';

interface EditHabitProps {
  habitId: number;
  habitData: {
    name: string;
    description: string;
    frequency: string;
  };
}

const EditHabit: React.FC<EditHabitProps> = ({habitId, habitData}) => {
  const {
    habit,
    setHabit,
    handleEditHabit,
    modalVisible,
    toggleModal,
    loading,
    error,
  } = useEditHabit(habitId, habitData);

  useEffect(() => {
    setHabit({
      name: habitData.name,
      description: habitData.description,
      frequency: habitData.frequency,
    });
  }, [habitData, setHabit]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleModal}>
        <View style={styles.iconContainer}>
          <Image
            source={require('../../../assets/img/editIcon.png')}
            style={styles.icon}
          />
        </View>
      </TouchableOpacity>

      <BottomSheet
        isVisible={modalVisible}
        onClose={toggleModal}
        height={600}
        backgroundColor="#eacbaf">
        <Image
          source={require('../../../assets/img/edit.png')}
          style={styles.image}
        />
        <Text style={styles.modalTitle}>Edit Habit</Text>

        <View style={styles.inputsContainer}>
          <InputGeneric
            placeholder="Habit Name"
            value={habit.name}
            onChangeText={text => setHabit(prev => ({...prev, name: text}))}
            backgroundColor="rgba(0, 0, 0, 0.5)"
            height={45}
            width={320}
          />
          <InputGeneric
            placeholder="Description"
            value={habit.description}
            onChangeText={text =>
              setHabit(prev => ({...prev, description: text}))
            }
            backgroundColor="rgba(0, 0, 0, 0.5)"
            height={45}
            width={320}
          />
          <GenericDropdown
            placeholder="Frequency"
            selectedValue={habit.frequency}
            setSelectedValue={value =>
              setHabit(prev => ({...prev, frequency: value}))
            }
            data={frequencyOptions}
            dropdownWidth={320}
          />
        </View>

        <View style={styles.buttonContainer}>
          <GenericButton
            title="Save"
            onPress={handleEditHabit}
            disabled={loading}
            color="#FFF"
            backgroundColor="#000"
            width={150}
            height={45}
          />
        </View>
        {loading && <Loader />}
        {error && <Text style={styles.error}>{error}</Text>}
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: fontBold,
    marginBottom: 10,
    color: '#000',
  },
  image: {
    width: width * 0.9,
    height: height * 0.25,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  inputsContainer: {
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 12,
    fontFamily: fontBold,
  },
  iconContainer: {
    backgroundColor: '#f3ede7',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.12,
    height: height * 0.05,
  },
  icon: {
    width: width * 0.12,
    height: height * 0.07,
    resizeMode: 'contain',
  },
});

export default EditHabit;
