import {Habit} from '../entities/habit/Habit';
import {CreateHabitRequest} from '../entities/habit/request/createHabitRequest';

export interface HabitRepository {
  createHabit(data: CreateHabitRequest): any;
  allHabits(userId: string): Promise<Habit[]>;
  updateHabitStreak(habitId: number, streak: number, lastCompleted: string): Promise<boolean>;
  deleteHabit(habitId: number) : any
  updateHabit(habitId: number, data: Partial<CreateHabitRequest>): Promise<boolean>;
}
