import React, {useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import useFetchHabits from '../hooks/useFetchHabits';
import Loader from '../../../components/loader';
import {
  fontBold,
  fontLight,
  fontMedium,
  fourColor,
  height,
  width,
} from '../../../styles/globalStyles';
import useNavigation from '../../../hook/useNavigation';

const HabitsHome = () => {
  const {habits, loading, error, fetchHabits} = useFetchHabits();
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      fetchHabits();
    }, [fetchHabits]),
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Habits</Text>
      {loading ? (
        <Loader />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : habits.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Image
            source={require('../../../assets/img/homeNotCreate.png')}
            style={styles.emptyImage}
          />
          <Text style={styles.emptyText}>No habits created yet.</Text>
        </View>
      ) : (
        <FlatList
          data={habits}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigation.navigate('HabitDetails', {
                  id: item.id,
                  name: item.name,
                  description: item.description,
                  image: item.image || '',
                  streak: item.streak,
                  lastCompleted: item.lastCompleted,
                  frequency: item.frequency || '',
                })
              }>
              <Image source={{uri: item.image}} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(255,255,255, 0.4)',
    marginTop: 20,
    borderTopRightRadius: 120,
    padding: 20,
    paddingBottom: 80,
  },
  heading: {
    fontSize: 13,
    fontFamily: fontBold,
    color: '#FFF',
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    fontFamily: fontBold,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  emptyImage: {
    width: width * 0.9,
    height: height * 0.28,
    resizeMode: 'cover',
  },
  emptyText: {
    fontSize: 13,
    color: '#FFF',
    fontFamily: fontLight,
    textAlign: 'left',
    marginBottom: width * 0.04,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: fourColor,
    borderRadius: 10,
    padding: 10,
    marginVertical: 7,
    width: width * 0.85,
    height: height * 0.09,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  image: {
    width: width * 0.15,
    height: height * 0.079,
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 12,
    fontFamily: fontBold,
    color: '#000',
    marginBottom: 7,
  },
  description: {
    fontSize: 10,
    color: '#FFFF',
    fontFamily: fontMedium,
  },
});

export default HabitsHome;
