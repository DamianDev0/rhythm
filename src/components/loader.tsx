import React from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';

interface LoaderProps {
  color?: string;
}

const Loader = ({color}: LoaderProps) => (
  <View style={styles.loaderContainer}>
    <ActivityIndicator size="large" color={color ? color : '#000'} />
  </View>
);

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loader;
