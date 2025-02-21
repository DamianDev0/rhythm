import React from 'react';

import {View, StyleSheet} from 'react-native';

import DeleteHabit from './deleteHabit';
import EditHabit from './editHabit';
import {width} from '../../../styles/globalStyles';

interface HeaderHabitEditAndDeleteProps {
  habitId: number;
  habitData: {
    name: string;
    description: string;
    frequency: string;
  };
}

const HeaderHabitEditAndDelete: React.FC<HeaderHabitEditAndDeleteProps> = ({
  habitId,
  habitData,
}) => {
  return (
    <View style={styles.container}>
      <EditHabit habitId={habitId} habitData={habitData} />
      <DeleteHabit habitId={habitId} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: width,
    gap: width * 0.4,
    paddingBottom: width * 0.02,
  },
});

export default HeaderHabitEditAndDelete;
