import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import GenericButton from '../../../components/genericButton';
import BottomSheet from '../../../components/bottomSheet';
import InputGeneric from '../../../components/genericInput';
import {fontBold, height, width} from '../../../styles/globalStyles';
import Loader from '../../../components/loader';
import {useEditHabit} from '../hooks/useEditHabit';
import GenericDropdown from '../../../components/dropDown';
import {frequencyOptions} from '../../../utils/data';

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
        <Icon name="pencil-outline" size={30} color="#FFF" />
      </TouchableOpacity>

      <BottomSheet
        isVisible={modalVisible}
        onClose={toggleModal}
        height={600}
        backgroundColor="#FFF">
        <Image
          source={require('../../../assets/img/avatar.png')}
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
    padding: 20,
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: fontBold,
    marginBottom: 20,
    color: '#000',
  },
  image: {
    width: width * 0.7,
    height: height * 0.2,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  inputsContainer: {
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default EditHabit;
