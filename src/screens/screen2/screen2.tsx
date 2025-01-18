import React from 'react';
import { View, TextInput, Button, Text, FlatList } from 'react-native';
import { useHabit } from './hook/useCreateHabit';


const HabitForm: React.FC = () => {
  const {
    formState,
    handleInputChange,
    handleCreateHabit,
    habits,
    error,
    success,
  } = useHabit();

  return (
    <View>
      <TextInput
        placeholder="Name"
        value={formState.name}
        onChangeText={(value) => handleInputChange('name', value)}
      />
      <TextInput
        placeholder="Description"
        value={formState.description}
        onChangeText={(value) => handleInputChange('description', value)}
      />
      <Button
        title="Add Habit"
        onPress={handleCreateHabit}
      />
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
      {success && <Text style={{ color: 'green' }}>{success}</Text>}

      <FlatList
        data={habits}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>Name: {item.name}</Text>
            <Text>Description: {item.description}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default HabitForm;
