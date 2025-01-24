import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {Calendar} from 'react-native-calendars';
import HeaderHabitDetails from './components/HeaderHabitDetails';
import Streak from './components/Streak';
import useStreakLogic from './hooks/useStreakLogic';



const HabitDetailsScreen = () => {
  const route = useRoute();
  const item = route.params as {
    id: string;
    name: string;
    description: string;
    image: string;
    streak: number;
    lastCompleted: string;
  };

  const {streak, markedDates, markDayAsCompleted} = useStreakLogic({
    habitId: parseInt(item.id, 10),
    initialStreak: item.streak,
    initialLastCompleted: item.lastCompleted,
  });

  return (
    <View style={styles.container}>
      <HeaderHabitDetails
        name={item.name}
        description={item.description}
        image={item.image}
      />

      <Streak streak={streak} />

      <Calendar
        style={styles.calendar}
        markedDates={markedDates}
        onDayPress={(day: any) => markDayAsCompleted(day.dateString)}
        theme={{
          calendarBackground: '#FFF',
          selectedDayBackgroundColor: '#4CAF50',
          selectedDayTextColor: '#FFF',
          todayTextColor: '#4CAF50',
          arrowColor: '#4CAF50',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF',
  },
  calendar: {

    marginTop: 20,
    borderRadius: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});

export default HabitDetailsScreen;
