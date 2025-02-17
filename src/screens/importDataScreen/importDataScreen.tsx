import React from 'react';

import {
  View,
  StyleSheet,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';

import useExportHabits from './hooks/useExportData';
import useImportHabits from './hooks/useImportData';
import HeaderComponent from '../../components/HeaderComponent';
import Loader from '../../components/loader';
import {
  fontBold,
  fontMedium,
  fourColor,
  height,
  width,
} from '../../styles/globalStyles';

const ImportDataScreen = () => {
  const {exportHabits, loading: exportLoading} = useExportHabits();
  const {importHabits, loading: importLoading} = useImportHabits();

  const DataButtons = [
    {
      id: '1',
      title: 'Export Habits',
      description: 'Save the habits you created to your device.',
      icon: require('../../assets/img/basball.png'),
      onPress: exportHabits,
      loading: exportLoading,
    },
    {
      id: '2',
      title: 'Import Habits',
      description: 'Load habits from your device into the app.',
      icon: require('../../assets/img/basket.png'),
      onPress: importHabits,
      loading: importLoading,
    },
  ];

  return (
    <ImageBackground
      source={require('../../assets/img/background.png')}
      style={styles.background}>
      <HeaderComponent
        title="Save Your Habits & Upload Your Habits"
        imageSource={require('../../assets/img/Saly-44.png')}
      />
     

      <View style={styles.container}>
        <FlatList
          data={DataButtons}
          numColumns={2}
          keyExtractor={item => item.id}
          columnWrapperStyle={styles.row}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.button} onPress={item.onPress}>
              <Image source={item.icon} style={styles.buttonImage} />
              <Text style={styles.buttonText}>{item.title}</Text>
              <Text style={styles.buttonDescription}>{item.description}</Text>
              {item.loading && <Loader />}
            </TouchableOpacity>
          )}
        />
         <HeaderComponent
        title="Your habits will be saved in the download/rhythmApp"
        imageSource={require('../../assets/img/Saly-23.png')}
      />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  description: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  container: {
    flex: 0.76,
    padding: width * 0.03,
    justifyContent: 'center',
  },
  row: {
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    height: height * 0.44,
    width: width * 0.9,
    backgroundColor: fourColor,
    margin: width * 0.02,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    elevation: 5,
    gap: width * 0.03,
  },
  buttonImage: {
    width: width * 1,
    height: height * 0.23,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  buttonText: {
    color: '#000',
    fontSize: 14,
    fontFamily: fontBold,
    textAlign: 'center',
  },
  buttonDescription: {
    color: '#ddd',
    fontSize: 11,
    textAlign: 'center',
    fontFamily: fontMedium,
  },
});

export default ImportDataScreen;
