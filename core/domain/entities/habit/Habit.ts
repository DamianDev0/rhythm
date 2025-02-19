export interface Habit {
  id: number;
  name: string;
  description: string;
  image?: string;
  frequency?: string;
  userId: string;
  streak: number
  lastCompleted: string
  time: string;
}
