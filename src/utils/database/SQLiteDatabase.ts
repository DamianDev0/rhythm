import SQLite from 'react-native-sqlite-storage';

import {HabitTable} from '../models/Habit';

const database = SQLite.openDatabase(
  {
    name: 'Rhythm',
    location: 'default',
  },
  () => {
    database.transaction(tx => {
      tx.executeSql(
        HabitTable,
        [],
        () => {
        },
        error => {
          console.error('Error creating table "habits":', error);
        },
      );
    });
  },
  error => console.error('Error opening database:', error),
);

export default database;
