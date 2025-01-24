import {Habit} from '../../domain/entities/habit/Habit';
import {CreateHabitRequest} from '../../domain/entities/habit/request/createHabitRequest';
import {HabitRepositoryImp} from '../repositories/habit.repositoryImp';
import {
  createHabit,
  allHabits,
} from '../../application/useCases/habit.useCases';

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
}
