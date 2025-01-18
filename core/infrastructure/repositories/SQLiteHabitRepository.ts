import {Habit} from '../../domain/entities/Habit';
import {HabitRepository} from '../../domain/repositories/IHabitRepository';
import database from '../database/SQLiteDatabase';

export class SQLiteHabitRepository implements HabitRepository {
  getAllHabits(): Promise<Habit[]> {
    return new Promise((resolve, reject) => {
      database.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM habits',
          [],
          (_, result) => {
            const habits = [];
            for (let i = 0; i < result.rows.length; i++) {
              habits.push(result.rows.item(i));
            }
            resolve(habits);
          },
          (_, error) => {
            reject(error);
            return false;
          },
        );
      });
    });
  }

  getHabitById(id: number): Promise<Habit | null> {
    return new Promise((resolve, reject) => {
      database.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM habits WHERE id = ?',
          [id],
          (_, result) => {
            if (result.rows.length > 0) {
              resolve(result.rows.item(0));
            } else {
              resolve(null);
            }
          },
          (_, error) => {
            reject(error);
            return false;
          },
        );
      });
    });
  }

  saveHabit(habit: Habit): Promise<void> {
    return new Promise((resolve, reject) => {
      database.transaction(tx => {
        tx.executeSql(
          'INSERT INTO habits (name, description) VALUES (?, ?)',
          [habit.name, habit.description],
          () => {
            resolve();
          },
          (_, error) => {
            reject(error);
            return false;
          },
        );
      });
    });
  }

  deleteHabit(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      database.transaction(tx => {
        tx.executeSql(
          'DELETE FROM habits WHERE id = ?',
          [id],
          () => {
            resolve();
          },
          (_, error) => {
            reject(error);
            return false;
          },
        );
      });
    });
  }
}
