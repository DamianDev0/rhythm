import SQLite from 'react-native-sqlite-storage';

const database = SQLite.openDatabase(
  {
    name: 'Rhythm',
    location: 'default',
  },
  () => console.log('Database opened successfully'),
  (error : any) => console.error('Error opening database:', error),
);



export default database;
