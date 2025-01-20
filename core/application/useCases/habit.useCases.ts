import {CreateHabitRequest} from '../../domain/entities/habit/request/createHabitRequest';
import {HabitRepository} from '../../domain/interfaces/habit.repository';

export const createHabit = (
  habitRepository: HabitRepository,
  data: CreateHabitRequest,
) => {
  return habitRepository.createHabit(data);
};

export const allHabits = (habitRepository: HabitRepository) => {
  return habitRepository.allHabits();
};
