import {
  createHabit,
  allHabits,
  updateHabitStreak,
  deleteHabit,
  updateHabit,
  getHabitStatistics,
} from '../../application/useCases/habit.useCases';
import {Habit} from '../../domain/entities/habit/Habit';
import {CreateHabitRequest} from '../../domain/entities/habit/request/createHabitRequest';
import {HabitStatistics} from '../../domain/entities/habit/request/HabitStatistics';
import {HabitRepositoryImp} from '../repositories/habit.repositoryImp';

const habitRepository = new HabitRepositoryImp();

export class HabitController {
  static async CreateHabit(data: CreateHabitRequest) {
    try {
      createHabit(habitRepository, data);
    } catch (error) {
      console.error('Error creating habit:', error);
    }
  }

  static async GetAllHabits(userId: string): Promise<Habit[]> {
    try {
      const habits = await allHabits(habitRepository, userId);
      return habits;
    } catch (error) {
      console.error('Error fetching habits:', error);
      throw error;
    }
  }

  static async UpdateHabitStreak(
    habitId: number,
    streak: number,
    lastCompleted: string,
  ): Promise<boolean> {
    try {
      const result = await updateHabitStreak(
        habitRepository,
        habitId,
        streak,
        lastCompleted,
      );
      return result;
    } catch (error) {
      console.error('Error updating habit streak:', error);
      throw error;
    }
  }

  static async DeleteHabit(habitId: number): Promise<boolean> {
    try {
      const result = await deleteHabit(habitRepository, habitId);
      return result;
    } catch (error) {
      console.error('Error deleting habit:', error);
      throw error;
    }
  }

  static async EditHabit(
    habitId: number,
    data: Partial<CreateHabitRequest>,
  ): Promise<boolean> {
    try {
      const result = await updateHabit(habitRepository, habitId, data);
      return result;
    } catch (error) {
      console.error('Error editing habit:', error);
      throw error;
    }
  }

  static async GetStastHabit(userId: string): Promise<HabitStatistics> {
    try {
      const result = await getHabitStatistics(habitRepository, userId);
      return result;
    } catch (error) {
      console.error('Error getting stats:', error);
      throw error;
    }
  }
}
