import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {fontLight, height, width} from '../../../styles/globalStyles';
import BottomSheet from '../../../components/bottomSheet';
import useChosseImage from '../hook/useChosseImage';

const ChosseImage = ({
  onImageSelect,
}: {
  onImageSelect: (image: any) => void;}) => {
  const {
    modalVisible,
    selectedImage,
    handlePress,
    handleSelectImage,
    setModalVisible,
  } = useChosseImage(require('../../../assets/img/chosee.png'));

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress}>
        <Image source={selectedImage} style={styles.image} />
      </TouchableOpacity>
      <Text style={styles.text}>Select Image</Text>

      <BottomSheet
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}>
        <View style={modalStyles.imageContainer}>
          <TouchableOpacity
            onPress={() =>
              handleSelectImage(
                require('../../../assets/img/image1.png'),
                onImageSelect,
              )
            }>
            <Image
              source={require('../../../assets/img/image1.png')}
              style={modalStyles.modalImage}
            />
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width * 0.9,
    height: height * 0.21,
    resizeMode: 'contain',
  },
  text: {
    color: '#FFF',
    fontSize: 12,
    fontFamily: fontLight,
  },
});

const modalStyles = StyleSheet.create({
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalImage: {
    width: 100,
    height: 100,
    margin: 10,
    borderRadius: 10,
  },
});

export default ChosseImage;
