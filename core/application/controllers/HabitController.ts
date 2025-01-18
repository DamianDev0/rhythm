// src/core/application/controllers/HabitController.ts
import {SQLiteHabitRepository} from '../../infrastructure/repositories/SQLiteHabitRepository';
import {Habit} from '../../domain/entities/Habit';

export class HabitController {
  private habitRepository: SQLiteHabitRepository;

  constructor(habitRepository: SQLiteHabitRepository) {
    this.habitRepository = habitRepository;
  }

  async createHabit(name: string, description: string): Promise<void> {
    try {
      const habit = new Habit(0, name, description);
      await this.habitRepository.saveHabit(habit);
    } catch (error) {
      throw new Error('Failed to insert habit');
    }
  }


  async getHabits(): Promise<Habit[]> {
    try {
      return await this.habitRepository.getAllHabits();
    } catch (error) {
      throw new Error('Failed to fetch habits');
    }
  }

  async getHabitById(id: number): Promise<Habit | null> {
    try {
      return await this.habitRepository.getHabitById(id);
    } catch (error) {
      throw new Error('Failed to fetch habit');
    }
  }


  async deleteHabit(id: number): Promise<void> {
    try {
      await this.habitRepository.deleteHabit(id);
    } catch (error) {
      throw new Error('Failed to delete habit');
    }
  }
}
