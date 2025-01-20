import {Habit} from '../Habit';

export interface CreateHabitRequest extends Omit<Habit, 'id' | ''> {}
