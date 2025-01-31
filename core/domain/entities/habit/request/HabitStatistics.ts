export interface HabitStatistics {
  frequencyStats: { frequency: string; count: number }[];
  createdByDay: Record<string, number>;
}
