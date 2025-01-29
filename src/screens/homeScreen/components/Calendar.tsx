import React from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import moment from 'moment';
import {
  fontBold,
  fontLight,
  fourColor,
  height,
  width,
} from '../../../styles/globalStyles';

const CalendarHome = () => {
  const today = moment();
  const dates = Array.from({length: 30}, (_, i) =>
    today.clone().add(i, 'days').format('YYYY-MM-DD'),
  );

  const renderItem = ({item}: {item: string}) => (
    <View
      style={[
        styles.dateContainer,
        item === today.format('YYYY-MM-DD') && styles.today,
      ]}>
      <Text style={styles.dateText}>{moment(item).format('ddd')}</Text>
      <Text style={styles.dateTextDay}>{moment(item).format('DD')}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={dates}
        renderItem={renderItem}
        keyExtractor={item => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.dateList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateList: {
    justifyContent: 'space-between',
  },
  dateContainer: {
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: fourColor,
    borderRadius: 10,
    alignItems: 'center',
    width: width * 0.14,
    height: height * 0.067,
  },
  today: {
    backgroundColor: '#c26d30',
  },
  dateText: {
    color: '#000',
    fontFamily: fontBold,
    fontSize: 11,
  },
  dateTextDay: {
    color: '#ffffff',
    fontFamily: fontLight,
    fontSize: 14,
    marginTop: width * 0.01,
  },
});

export default CalendarHome;
