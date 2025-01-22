import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ImageBackground,
} from 'react-native';
import GenericButton from '../../../components/genericButton';
import InputGeneric from '../../../components/genericInput';
import useLogin from '../hook/useLogin';
import {
  fontBold,
  fontMedium,
  height,
  width,
} from '../../../styles/globalStyles';

const LoginForm = () => {
  const {credentials, handleInputChange, handleGotoSignUp, handleLogin, loading} =
    useLogin();

  return (
    <ImageBackground
      source={require('../../../assets/img/background.png')}
      style={styles.container}
      resizeMode="cover">
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 100}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled">
          <View style={styles.imageContainer}>
            <Image
              source={require('../../../assets/img/Saly-2.png')}
              style={styles.image}
            />
          </View>
          <View style={styles.formContainer}>
            <View style={styles.containerInput}>
              <InputGeneric
                placeholder="Email"
                keyboardType="email-address"
                iconImage={require('../../../assets/img/email.png')}
                width={width * 0.85}
                backgroundColor="rgba(0, 0, 0, 0.5)"
                iconHeight={width * 0.7}
                iconWidth={height * 0.08}
                value={credentials.email}
                onChangeText={text => handleInputChange('email', text)}
              />
              <InputGeneric
                placeholder="Password"
                secureTextEntry
                iconImage={require('../../../assets/img/lock.png')}
                width={width * 0.85}
                backgroundColor="rgba(0, 0, 0, 0.5)"
                iconHeight={width * 0.7}
                iconWidth={height * 0.08}
                value={credentials.password}
                onChangeText={text => handleInputChange('password', text)}
              />
            </View>
            <View style={styles.loginButton}>
              <GenericButton
             title={loading ? 'Logging in...' : 'Login'}
                backgroundColor="#000"
                color="#FFFF"
                onPress={handleLogin}
                disabled={loading}
              />
            </View>
            <Text style={styles.loginText} onPress={handleGotoSignUp}>
              Don't have an account?{' '}
              <Text style={styles.titleLogin}>Sign Up</Text>
            </Text>
            <Image
              source={require('../../../assets/img/cone.png')}
              style={styles.imageCone}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: width * 1,
    height: height * 0.5,
    resizeMode: 'contain',
  },
  containerInput: {
    alignItems: 'center',
    gap: 25,
  },
  formContainer: {
    paddingHorizontal: 20,
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: width,
    height: height * 0.407,
    shadowColor: '#000',
  },
  loginButton: {
    alignItems: 'center',
    marginTop: 20,
  },
  loginText: {
    color: '#FFF',
    textAlign: 'center',
    marginTop: 15,
    fontSize: 11,
    fontFamily: fontMedium,
  },
  titleLogin: {
    color: '#954D0B',
    fontFamily: fontBold,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageCone: {
    position: 'absolute',
    left: width * -0.24,
    bottom: width * -0.13,
    width: width * 0.5,
    height: height * 0.2,
  },
});

export default LoginForm;
