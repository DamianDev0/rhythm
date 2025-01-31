/* eslint-disable react/no-unstable-nested-components */
import React, {useCallback} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {PieChart} from 'react-native-gifted-charts';
import {useHabitStatistics} from '../hooks/useHabitStatistics';
import Loader from '../../../components/loader';
import {
  fontBold,
  fontLight,
  fontMedium,
  height,
  width,
} from '../../../styles/globalStyles';
import {useFocusEffect} from '@react-navigation/native';

const PieChartComponent = () => {
  const {stats, loading, fetchStats} = useHabitStatistics();

  useFocusEffect(
    useCallback(() => {
      fetchStats();
    }, [fetchStats]),
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Loader color="#fff" />
      </View>
    );
  }

  if (!stats || !stats.frequencyStats || stats.frequencyStats.length === 0) {
    return (
      <View style={styles.noDataContainer}>
        <Image
          source={require('../../../assets/img/notChart.png')}
          style={styles.noDataImage}
        />
        <Text style={styles.noDataText}>You haven't created any habits to view statistics.</Text>
      </View>
    );
  }


  const colors = ['#51395B', '#CC6058', '#63A3B4', '#F4C09D', '#34495e'];

  const frequencyData = stats.frequencyStats.map((item, index) => ({
    value: item.count,
    label: item.frequency,
    color: colors[index % colors.length],
  }));

  const renderDot = (color: string) => {
    return <View style={[styles.dot, {backgroundColor: color}]} />;
  };

  const renderLegendComponent = () => {
    return (
      <View style={styles.legendRow}>
        {frequencyData.map((item, index) => (
          <View style={styles.legendItem} key={index}>
            {renderDot(item.color)}
            <Text style={styles.legendText}>
              {item.label}: {item.value}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Frequent Habits</Text>
      <View style={styles.chartContainer}>
        <PieChart
          data={frequencyData}
          donut
          showGradient
          sectionAutoFocus
          radius={120}
          innerRadius={75}
          innerCircleColor={'rgba(0,0,0,0.7)'}
          centerLabelComponent={() => {
            const total = frequencyData.reduce(
              (sum, item) => sum + item.value,
              0,
            );
            return (
              <View style={styles.centerLabel}>
                <Text style={styles.centerLabelText}>{total}</Text>
                <Text style={styles.centerLabelSubText}>Total Habits</Text>
              </View>
            );
          }}
        />
      </View>
      {renderLegendComponent()}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 20,
    padding: 14,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
    width: width * 0.9,
    height: height * 0.52,
  },
  title: {
    color: '#fff',
    fontSize: 15,
    fontFamily: fontBold,
  },
  chartContainer: {
    padding: 20,
    alignItems: 'center',
  },
  centerLabel: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerLabelText: {
    fontSize: 27,
    color: '#FFF',
    fontFamily: fontBold,
  },
  centerLabelSubText: {
    fontSize: 12,
    color: '#FFF',
    fontFamily: fontLight,
  },
  legendRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 120,
    margin: 5,
    fontFamily: fontBold,
  },
  legendText: {
    color: '#fff',
    fontFamily: fontMedium,
    fontSize: 13,
    textTransform: 'capitalize',
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  container: {
    paddingVertical: 100,
    backgroundColor: '#34448B',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noDataImage: {
    width: width * 0.7,
    height: height * 0.3,
    marginBottom: 20,
  },
  noDataText: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
    fontFamily: fontLight,
  },
});

export default PieChartComponent;
