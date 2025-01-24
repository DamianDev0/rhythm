import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Modal from 'react-native-modal';

interface BottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  backgroundColor?: string;
  height?: number;
  width?: number;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  isVisible,
  onClose,
  children,
  backgroundColor = '#fff',
  height,
  width,
}) => {
  const screenHeight = Dimensions.get('screen').height;
  const screenWidth = Dimensions.get('screen').width;

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection="down"
      style={styles.modal}>
      <View
        style={[
          styles.container,
          {
            backgroundColor,
            height: height || screenHeight * 0.73,
            width: width || screenWidth,
          },
        ]}>
        <View style={styles.dragIndicator} />
        {children}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
    alignItems: 'center',
  },
  container: {
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dragIndicator: {
    width: 40,
    height: 5,
    backgroundColor: '#000',
    borderRadius: 2.5,
    alignSelf: 'center',
    marginBottom: 10,
  },
});

export default BottomSheet;
