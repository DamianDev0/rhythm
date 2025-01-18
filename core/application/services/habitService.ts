import {Habit} from '../../domain/entities/Habit';
import { SQLiteHabitRepository } from '../../infrastructure/repositories/SQLiteHabitRepository';

const habitRepository = new SQLiteHabitRepository();

export const HabitService = {
  addHabit: async (habit: Habit) => {
    await habitRepository.saveHabit(habit);
  },
  getHabits: async (): Promise<Habit[]> => {
    return await habitRepository.getAllHabits();
  },
  getHabitById: async (id: number): Promise<Habit | null> => {
    return await habitRepository.getHabitById(id);
  },
  deleteHabit: async (id: number) => {
    await habitRepository.deleteHabit(id);
  },
};
