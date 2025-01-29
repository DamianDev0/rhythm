import React from 'react';
import {View, StyleSheet} from 'react-native';
import EditHabit from './editHabit';
import DeleteHabit from './deleteHabit';
import { width } from '../../../styles/globalStyles';

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
    alignItems: 'center',
    width: width,
    gap: width * 0.45
  },
});

export default HeaderHabitEditAndDelete;
