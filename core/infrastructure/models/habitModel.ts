// src/core/infrastructure/database/models/HabitModel.ts
import database from '../database/SQLiteDatabase';

export const createHabitTable = (): void => {
  database.transaction(tx => {
    tx.executeSql(
      `
      CREATE TABLE IF NOT EXISTS habits (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        frequency TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
      `,
      [],
      () => console.log('Habit table created successfully'),
      (_, error) => {
        console.error('Error creating habit table:', error);
        return false;
      },
    );
  });
};
