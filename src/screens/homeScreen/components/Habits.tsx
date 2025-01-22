import React from 'react';
import {View, StyleSheet} from 'react-native';

const HabitsHome = () => {
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 0.6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255, 0.4)',
    marginTop: 15,
    borderTopRightRadius: 200,
  },
});

export default HabitsHome;
