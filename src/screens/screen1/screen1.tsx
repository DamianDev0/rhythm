import React from 'react';
import {Text, StyleSheet,} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Screen1 = () => {
  return (
    <LinearGradient
    colors={['#fff', '#fff', '#fff']}
    start={{x: 2, y: 0}}
    end={{x: 0, y: 7}}
      style={styles.gradient}>
      <Text>Screen1</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },

});

export default Screen1;
