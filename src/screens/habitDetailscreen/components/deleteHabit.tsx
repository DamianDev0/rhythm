import React from 'react';

import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

import BottomSheet from '../../../components/bottomSheet';
import GenericButton from '../../../components/genericButton';
import Loader from '../../../components/loader';
import {fontBold, height, width} from '../../../styles/globalStyles';
import {useDeleteHabit} from '../hooks/useDeleteHabit';

interface DeleteHabitProps {
  habitId: number;
}

const DeleteHabit: React.FC<DeleteHabitProps> = ({habitId}) => {
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  const {handleDeleteHabit, loading, error} = useDeleteHabit();

  const handleDelete = () => {
    handleDeleteHabit(habitId);
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleModal}>
        <View style={styles.iconContainer}>
          <Image
            source={require('../../../assets/img/deleteIcon.png')}
            style={styles.icon}
          />
        </View>
      </TouchableOpacity>
      <BottomSheet
        isVisible={modalVisible}
        onClose={toggleModal}
        height={500}
        backgroundColor="#f3ede7">
        <Image
          source={require('../../../assets/img/delete.png')}
          style={styles.image}
        />
        <Text style={styles.confirmText}>
          Are you sure you want to delete this Habit?
        </Text>
        <View style={styles.buttonContainer}>
          <GenericButton
            title="Cancel"
            onPress={toggleModal}
            color="#FFF"
            backgroundColor="#000"
            width={150}
            height={45}
          />
          <GenericButton
            title="Confirm"
            onPress={handleDelete}
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
    padding: 20,
    justifyContent: 'center',
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
    width: width * 0.19,
    height: height * 0.07,
    resizeMode: 'contain',
  },
  image: {
    width: width * 0.7,
    height: height * 0.3,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  confirmText: {
    fontSize: 13,
    fontFamily: fontBold,
    marginBottom: 20,
    color: '#000',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default DeleteHabit;
