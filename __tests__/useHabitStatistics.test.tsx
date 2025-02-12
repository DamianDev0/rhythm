import React, {ReactNode} from 'react';

import {configureStore} from '@reduxjs/toolkit';
import {renderHook, act} from '@testing-library/react-hooks';
import {Provider} from 'react-redux';

import {HabitController} from '../core/infrastructure/controllers/habit.controller';
import {useHabitStatistics} from '../src/screens/chartScreen/hooks/useHabitStatistics';


const mockReducer = (state = {token: {userId: 'test-user-id'}}) => state;

const store = configureStore({
  reducer: mockReducer,
});

jest.mock('../core/infrastructure/controllers/habit.controller', () => ({
  HabitController: {
    GetStastHabit: jest.fn(),
  },
}));

describe('useHabitStatistics Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const wrapper = ({children}: {children: ReactNode}) => (
    <Provider store={store}>{children}</Provider>
  );

  it('should fetch stats and update state', async () => {
    (HabitController.GetStastHabit as jest.Mock).mockResolvedValueOnce({
      frequencyStats: [
        {frequency: 'daily', count: 3},
        {frequency: 'weekly', count: 2},
      ],
      createdByDay: {
        '2022-01-01': 1,
        '2022-01-02': 2,
        '2022-01-03': 2,
      },
    });

    const {result} = renderHook(() => useHabitStatistics(), {wrapper});

    expect(result.current.loading).toBe(true);

    await act(async () => {
      await result.current.fetchStats();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.stats).toEqual({
      frequencyStats: [
        {frequency: 'daily', count: 3},
        {frequency: 'weekly', count: 2},
      ],
      createdByDay: {
        '2022-01-01': 1,
        '2022-01-02': 2,
        '2022-01-03': 2,
      },
    });
  });

  it('should handle error when fetching stats', async () => {
    (HabitController.GetStastHabit as jest.Mock).mockRejectedValueOnce(
      new Error('Failed to fetch'),
    );

    const {result} = renderHook(() => useHabitStatistics(), {wrapper});

    expect(result.current.loading).toBe(true);

    await act(async () => {
      await result.current.fetchStats();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.stats).toBe(null);
  });
});
