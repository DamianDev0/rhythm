import {useState} from 'react';

const useChosseImage = (initialImage: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any>(initialImage);

  const handlePress = () => {
    setModalVisible(true);
  };

  const handleSelectImage = (
    image: any,
    onImageSelect: (image: any) => void,
  ) => {
    setSelectedImage(image);
    setModalVisible(false);
    onImageSelect(image);
  };

  return {
    modalVisible,
    selectedImage,
    handlePress,
    handleSelectImage,
    setModalVisible,
  };
};

export default useChosseImage;
