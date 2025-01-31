/* eslint-disable @typescript-eslint/no-shadow */
import database from '../../../src/utils/database/SQLiteDatabase';
import {Habit} from '../../domain/entities/habit/Habit';
import {CreateHabitRequest} from '../../domain/entities/habit/request/createHabitRequest';
import {HabitStatistics} from '../../domain/entities/habit/request/HabitStatistics';
import {HabitRepository} from '../../domain/interfaces/habit.repository';

export class HabitRepositoryImp implements HabitRepository {
  async createHabit(data: CreateHabitRequest) {
    return new Promise((resolve, reject) => {
      database.transaction(tx => {
        tx.executeSql(
          'INSERT INTO habits (name, description, frequency, userId, image) VALUES (?, ?, ?, ?, ?)',
          [
            data.name,
            data.description,
            data.frequency,
            data.userId,
            data.image || null,
          ],
          (tx, results) => {
            if (results.rowsAffected > 0) {
              resolve(true);
            } else {
              reject(new Error('Failed to insert habit'));
            }
          },
          error => {
            reject(error);
          },
        );
      });
    });
  }

  async allHabits(userId: string): Promise<Habit[]> {
    return new Promise((resolve, reject) => {
      database.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM habits WHERE userId = ?',
          [userId],
          (tx, results) => {
            const habits: Habit[] = [];
            for (let i = 0; i < results.rows.length; i++) {
              const row = results.rows.item(i);
              habits.push({
                id: row.id,
                name: row.name,
                description: row.description,
                image: row.image,
                frequency: row.frequency,
                userId: row.userId,
                streak: row.streak,
                lastCompleted: row.lastCompleted,
              });
            }
            resolve(habits);
          },
          error => {
            reject(error);
          },
        );
      });
    });
  }

  async updateHabitStreak(
    habitId: number,
    streak: number,
    lastCompleted: string,
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      database.transaction(tx => {
        tx.executeSql(
          'UPDATE habits SET streak = ?, lastCompleted = ? WHERE id = ?',
          [streak, lastCompleted, habitId],
          (tx, results) => {
            if (results.rowsAffected > 0) {
              resolve(true);
            } else {
              reject(new Error('Failed to update habit streak'));
            }
          },
          error => {
            reject(error);
          },
        );
      });
    });
  }

  async deleteHabit(habitId: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      database.transaction(tx => {
        tx.executeSql(
          'DELETE FROM habits WHERE id = ?',
          [habitId],
          (tx, results) => {
            if (results.rowsAffected > 0) {
              resolve(true);
            } else {
              reject(new Error('Failed to delete habit'));
            }
          },
          error => {
            reject(error);
          },
        );
      });
    });
  }

  async updateHabit(
    habitId: number,
    data: Partial<CreateHabitRequest>,
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      database.transaction(tx => {
        const fields = Object.keys(data)
          .map(key => `${key} = ?`)
          .join(', ');
        const values = Object.values(data);

        tx.executeSql(
          `UPDATE habits SET ${fields} WHERE id = ?`,
          [...values, habitId],
          (tx, results) => {
            if (results.rowsAffected > 0) {
              resolve(true);
            } else {
              reject(new Error('Failed to update habit'));
            }
          },
          error => {
            reject(error);
          },
        );
      });
    });
  }

  async getHabitStatistics(userId: string): Promise<HabitStatistics> {
    return new Promise((resolve, reject) => {
      database.transaction(tx => {
        tx.executeSql(
          `
          SELECT frequency, COUNT(*) AS count 
          FROM habits 
          WHERE userId = ? 
          GROUP BY frequency
          ORDER BY count DESC
          `,
          [userId],
          (tx, freqResults) => {
            const frequencyStats: {frequency: string; count: number}[] = [];
            for (let i = 0; i < freqResults.rows.length; i++) {
              const row = freqResults.rows.item(i);
              frequencyStats.push({frequency: row.frequency, count: row.count});
            }

            tx.executeSql(
              `
              SELECT strftime('%w', createdAt) AS day, COUNT(*) AS count
              FROM habits 
              WHERE userId = ? AND createdAt IS NOT NULL
              GROUP BY day
              `,
              [userId],
              (tx, dayResults) => {
                const createdByDay: Record<string, number> = {};
                for (let i = 0; i < dayResults.rows.length; i++) {
                  const row = dayResults.rows.item(i);
                  createdByDay[row.day] = row.count;
                }

                resolve({
                  frequencyStats,
                  createdByDay,
                });
              },
              error => {
                reject(error);
              },
            );
          },
          error => {
            reject(error);
          },
        );
      });
    });
  }
}
