import {CreateHabitRequest} from '../../domain/entities/habit/request/createHabitRequest';
import {HabitRepository} from '../../domain/interfaces/habit.repository';

export const createHabit = (
  habitRepository: HabitRepository,
  data: CreateHabitRequest,
) => {
  return habitRepository.createHabit(data);
};

export const allHabits = (habitRepository: HabitRepository, userId: string) => {
  return habitRepository.allHabits(userId);
};

export const updateHabitStreak = (
  habitRepository: HabitRepository,
  habitId: number,
  streak: number,
  lastCompleted: string,
) => {
  return habitRepository.updateHabitStreak(habitId, streak, lastCompleted);
};

export const deleteHabit = (
  habitRepository: HabitRepository,
  habitId: number,
) => {
  return habitRepository.deleteHabit(habitId);
};

export const updateHabit = (
  habitRepository: HabitRepository,
  habitId: number,
  data: Partial<CreateHabitRequest>,
) => {
  return habitRepository.updateHabit(habitId, data);
};
