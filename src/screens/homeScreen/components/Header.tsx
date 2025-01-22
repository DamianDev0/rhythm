import React from 'react';
import {Image, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {fontBold, height, width} from '../../../styles/globalStyles';
import {useDispatch} from 'react-redux';
import {clearToken} from '../../../redux/tokenSlice';
import useNavigation from '../../../hook/useNavigation';

const HeaderHome = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();


  const handleLogout = () => {
    dispatch(clearToken());
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image
          source={require('../../../assets/img/avatar.png')}
          style={styles.image}
        />
        <Text style={styles.text}>Schedule</Text>
      </View>
      <TouchableOpacity onPress={handleLogout}>
        <Image
          source={require('../../../assets/img/logOut.png')}
          style={styles.logoutImage}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.04,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 5,
    justifyContent: 'space-between',
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: width * 0.1,
    height: height * 0.045,
    marginRight: 5,
  },
  text: {
    fontSize: 14,
    color: '#FFF',
    fontFamily: fontBold,
  },
  logoutImage: {
    width: width * 0.16,
    height: height * 0.2,
    resizeMode: 'contain',
  },
});

export default HeaderHome;
