import SQLite from 'react-native-sqlite-storage';

import {HabitTable} from '../models/Habit';

const database = SQLite.openDatabase(
  {
    name: 'Rhythm',
    location: 'default',
  },
  () => {
    console.log('Database opened successfully');
    database.transaction(tx => {
      tx.executeSql(
        HabitTable,
        [],
        () => {
          console.log('Table "habits" created successfully');
          console.log('table', HabitTable);
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
