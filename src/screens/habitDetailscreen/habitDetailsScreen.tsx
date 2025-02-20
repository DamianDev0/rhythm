import React, {useEffect} from 'react';

import {useRoute} from '@react-navigation/native';
import {View, StyleSheet, ImageBackground} from 'react-native';
import {Calendar} from 'react-native-calendars';

import HeaderHabitDetails from './components/HeaderHabitDetails';
import HeaderHabitEditAndDelete from './components/HeaderHabitEditAndDelete';
import Streak from './components/Streak';
import useScheduleNotification from './hooks/useScheduleNotification';
import useStreakLogic from './hooks/useStreakLogic';
import {fontBold, fourColor, width} from '../../styles/globalStyles';

const HabitDetailsScreen = () => {
  const route = useRoute();
  const item = route.params as {
    id: number;
    name: string;
    description: string;
    image: string;
    streak: number;
    lastCompleted: string;
    frequency: string;
    time: string;
  };

  const {streak, markedDates, markDayAsCompleted} = useStreakLogic({
    habitId: item.id,
    initialStreak: item.streak,
    initialLastCompleted: item.lastCompleted,
    frequency: item.frequency,
  });

  const {scheduleNotification} = useScheduleNotification();

  useEffect(() => {
    if (item.name && item.time) {
      scheduleNotification(item.name, item.time, item.frequency);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.name, item.time]);

  return (
    <ImageBackground
      source={require('../../assets/img/background.png')}
      style={styles.backgroundImage}>
      <View style={styles.container}>
        <HeaderHabitEditAndDelete habitId={item.id} habitData={item} />
        <HeaderHabitDetails
          name={item.name}
          description={item.description}
          image={item.image}
          frequency={item.frequency}
        />
        <Streak streak={streak} />
        <Calendar
          style={styles.calendar}
          markingType="period"
          markedDates={markedDates}
          onDayPress={(day: any) => markDayAsCompleted(day.dateString)}
          theme={{
            calendarBackground: fourColor,
            selectedDayBackgroundColor: '#a9dfbf',
            selectedDayTextColor: '#FFF',
            todayTextColor: '#000',
            arrowColor: '#FFF',
            textSectionTitleColor: '#000',
            monthTextColor: '#000',
            textDayFontFamily: fontBold,
          }}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    paddingBottom: width * 0.05,
  },
  container: {
    flex: 1,
    padding: 20,
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
