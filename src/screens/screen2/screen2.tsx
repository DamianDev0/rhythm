import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from 'react-native';
import { CreateHabitRequest } from '../../../core/domain/entities/habit/request/createHabitRequest';
import { Habit } from '../../../core/domain/entities/habit/Habit';
import { HabitController } from '../../../core/infrastructure/controllers/habit.controller';

const HabitManager = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [frecuency, setFrecuency] = useState('');
  const [habits, setHabits] = useState<Habit[]>([]);

  const handleCreateHabit = async () => {
    const habitData: CreateHabitRequest = {
      name,
      description,
      frecuency,
    };

    await HabitController.CreateHabit(habitData);
    fetchHabits();
  };

  const fetchHabits = async () => {
    try {
      const fetchedHabits = await HabitController.GetAllHabits();
      setHabits(fetchedHabits);
    } catch (error) {
      console.error('Error fetching habits:', error);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Your Habits</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Frecuency"
        value={frecuency}
        onChangeText={setFrecuency}
      />
      <Button title="Create Habit" onPress={handleCreateHabit} />
      <FlatList
        data={habits}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.habitItem}>
            <Text style={styles.habitText}>Name: {item.name}</Text>
            <Text style={styles.habitText}>
              Description: {item.description}
            </Text>
            <Text style={styles.habitText}>Frequency: {item.frecuency}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  habitItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  habitText: {
    fontSize: 16,
  },
});

export default HabitManager;
