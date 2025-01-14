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
import useRegister from '../hook/useRegister';
import {
  fontBold,
  fontMedium,
  height,
  width,
} from '../../../styles/globalStyles';

const SignUpForm = () => {
  const {handleGotoLogin} = useRegister();

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
              source={require('../../../assets/img/Saly-3.png')}
              style={styles.image}
            />
          </View>
          <View style={styles.formContainer}>
            <View style={styles.containerInput}>
              <InputGeneric
                placeholder="Full Name"
                iconImage={require('../../../assets/img/user.png')}
                width={width * 0.85}
                backgroundColor="rgba(0, 0, 0, 0.5)"
                iconHeight={height * 0.03}
                iconWidth={width * 0.19}
              />
              <InputGeneric
                placeholder="Email"
                keyboardType="email-address"
                iconImage={require('../../../assets/img/email.png')}
                width={width * 0.85}
                backgroundColor="rgba(0, 0, 0, 0.5)"
                iconHeight={height * 0.6}
                iconWidth={width * 0.19}
              />
              <InputGeneric
                placeholder="Password"
                secureTextEntry
                iconImage={require('../../../assets/img/lock.png')}
                width={width * 0.85}
                backgroundColor="rgba(0, 0, 0, 0.5)"
                iconHeight={width * 0.7}
                iconWidth={height * 0.08}
              />
            </View>
            <View style={styles.signupButton}>
              <GenericButton
                title={'Sign Up'}
                backgroundColor="#000"
                color="#FFFF"
              />
            </View>
            <Text style={styles.loginText} onPress={handleGotoLogin}>
              Already have an account?{' '}
              <Text style={styles.titleLogin}>Login</Text>
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
    marginTop : 30
  },
  image: {
    width: width * 0.8,
    height: height * 0.4,
    resizeMode: 'contain',
  },
  containerInput: {
    alignItems: 'center',
    gap: 25,
  },
  formContainer: {
    paddingHorizontal: 20,
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255,0.15)',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: width * 1,
    height: height * 0.47,
    shadowColor: '#000',
  },
  signupButton: {
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

export default SignUpForm;
