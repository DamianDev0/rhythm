import database from '../../../src/utils/database/SQLiteDatabase';
import {Habit} from '../../domain/entities/habit/Habit';
import {CreateHabitRequest} from '../../domain/entities/habit/request/createHabitRequest';
import {HabitRepository} from '../../domain/interfaces/habit.repository';

export class HabitRepositoryImp implements HabitRepository {
  async createHabit(data: CreateHabitRequest) {
    return new Promise((resolve, reject) => {
      database.transaction(tx => {
        tx.executeSql(
          'INSERT INTO habits (name, description, frecuency) VALUES (?, ?, ?)',
          [data.name, data.description, data.frecuency],
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

  async allHabits(): Promise<Habit[]> {
    return new Promise((resolve, reject) => {
      database.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM habits',
          [],
          (tx, results) => {
            const habits: Habit[] = [];
            for (let i = 0; i < results.rows.length; i++) {
              const row = results.rows.item(i);
              habits.push({
                id: row.id,
                name: row.name,
                description: row.description,
                frecuency: row.frecuency,
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
}
