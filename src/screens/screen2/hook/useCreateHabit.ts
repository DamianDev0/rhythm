import {useState, useEffect} from 'react';
import { Habit } from '../../../../core/domain/entities/Habit';
import { SQLiteHabitRepository } from '../../../../core/infrastructure/repositories/SQLiteHabitRepository';
import { HabitController } from '../../../../core/application/controllers/HabitController';


const habitRepository = new SQLiteHabitRepository();
const habitController = new HabitController(habitRepository);

interface HabitFormState {
  name: string;
  description: string;
}

export const useHabit = () => {
  const [formState, setFormState] = useState<HabitFormState>({
    name: '',
    description: '',
  });
  const [habits, setHabits] = useState<Habit[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchHabits();
  }, []);

  const handleInputChange = (field: keyof HabitFormState, value: string) => {
    setFormState({...formState, [field]: value});
  };

  const handleCreateHabit = async () => {
    try {
      const {name, description} = formState;
      await habitController.createHabit(name, description);
      setSuccess('Habit added successfully');
      setError(null);
      setFormState({name: '', description: ''});
      fetchHabits(); // Refresh the list of habits
    } catch (error) {
      setError('Failed to add habit');
      setSuccess(null);
    }
  };

  const fetchHabits = async () => {
    try {
      const fetchedHabits = await habitController.getHabits();
      setHabits(fetchedHabits);
    } catch (error) {
      setError('Failed to fetch habits');
    }
  };

  return {
    formState,
    handleInputChange,
    handleCreateHabit,
    habits,
    error,
    success,
  };
};
