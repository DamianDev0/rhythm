import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {Calendar} from 'react-native-calendars';
import HeaderHabitDetails from './components/HeaderHabitDetails';
import Streak from './components/Streak';
import useStreakLogic from './hooks/useStreakLogic';
import {width} from '../../styles/globalStyles';
import LinearGradient from 'react-native-linear-gradient';

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
    <LinearGradient
    colors={['#000000', '#D09E7E', '#000000']}
    start={{x: 1, y: 2}}
    end={{x: 1, y: 0.6}}
        style={styles.gradientContainer}>
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
            selectedDayBackgroundColor: '#a9dfbf',
            selectedDayTextColor: '#FFF',
            todayTextColor: '#e59866',
            arrowColor: '#edbb99',
          }}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'transparent',
  },
  calendar: {
    marginTop: width * 0.02,
    borderRadius: 5,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});

export default HabitDetailsScreen;
