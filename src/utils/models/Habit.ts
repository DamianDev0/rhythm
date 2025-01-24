export const HabitTable = `
  CREATE TABLE IF NOT EXISTS habits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    image TEXT,
    description TEXT,
    frequency TEXT,
    userId TEXT
    streak INTEGER DEFAULT 0,
    lastCompleted TEXT
  );
`;
