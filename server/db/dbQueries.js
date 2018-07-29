const queryUsersByUsername = 'select * from users where username = $1';

const queryEntriesByUsername = 'select * from entries where username = $1 order by entry_id desc';

const insertIntoUsers = 'insert into users (name, username, email, password) values ($1, $2, $3, $4)';

const insertIntoEntries = 'insert into entries (username, title, description) values ($1, $2, $3)';

const updateDiaryEntry = 'update entries set username = $1, title = $2, description = $3 where entry_id = $4';

const deleteDiaryEntry = 'delete from entries where entry_id = $1';

const insertIntoReminders = 'insert into reminders (username, email, title, date) values ($1, $2, $3, $4)';

const deleteEntryReminder = 'delete from entries where entry_id = $1';

const dbQueries = {
  queryUsersByUsername,
  queryEntriesByUsername,
  insertIntoEntries,
  insertIntoUsers,
  updateDiaryEntry,
  deleteDiaryEntry,
  insertIntoReminders,
  deleteEntryReminder
};

export default dbQueries;
