import React from 'react';

import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';

import BottomSheet from '../../../components/bottomSheet';
import {fontLight, height, width} from '../../../styles/globalStyles';
import {images} from '../../../utils/data';
import useChosseImage from '../hook/useChosseImage';

const ChosseImage = ({
  onImageSelect,
}: {
  onImageSelect: (imageUri: string) => void;
}) => {
  const {
    modalVisible,
    selectedImage,
    handlePress,
    handleSelectImage,
    setModalVisible,
  } = useChosseImage(
    'https://ucarecdn.com/a157e0d7-60eb-4928-8151-c88ff0b47556/chosee.png',
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress}>
        <Image source={{uri: selectedImage}} style={styles.image} />
      </TouchableOpacity>
      <Text style={styles.text}>Select Image</Text>

      <BottomSheet
        isVisible={modalVisible}
        backgroundColor="#eacbaf"
        onClose={() => setModalVisible(false)}>
        <FlatList
          data={images}
          keyExtractor={item => item}
          numColumns={3}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => handleSelectImage(item, onImageSelect)}>
              <Image source={{uri: item}} style={modalStyles.modalImage} />
            </TouchableOpacity>
          )}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={modalStyles.flatListContainer}
        />
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width * 0.9,
    height: height * 0.2,
    resizeMode: 'contain',
  },
  text: {
    color: '#FFF',
    fontSize: 12,
    fontFamily: fontLight,
    marginBottom: width * 0.04,
  },
});

const modalStyles = StyleSheet.create({
  flatListContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  modalImage: {
    width: width * 0.28,
    height: height * 0.13,
    margin: 5,
    borderRadius: 10,
  },
});

export default ChosseImage;
