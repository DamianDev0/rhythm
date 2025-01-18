import {Habit} from '../entities/Habit';

export interface HabitRepository {
  getAllHabits(): Promise<Habit[]>;
  saveHabit(habit: Habit): Promise<void>;
}
