const queryUsersByUsername = 'select * from users where username = $1';

const queryEntriesByUsername = 'select * from entries where username = $1 order by entry_id desc';

const insertIntoUsers = 'insert into users (name, username, email, password) values ($1, $2, $3, $4) returning *';

const insertIntoEntries = 'insert into entries (username, title, description) values ($1, $2, $3) returning *';

const updateDiaryEntry = 'update entries set username = $1, title = $2, description = $3 where entry_id = $4 returning *';

const deleteDiaryEntry = 'delete from entries where entry_id = $1';

const insertIntoReminders = 'insert into reminders (username, email, title, setdate, time) values ($1, $2, $3, $4, $5) returning *';

const queryRemindersByUsername = 'select * from reminders where username = $1 order by reminder_id desc';

<<<<<<< HEAD
=======
const deleteEntryReminder = 'delete from reminders where reminder_id = $1';

>>>>>>> ft-implement-feedback-on-api-endpoints-159471108
export {
  queryUsersByUsername,
  queryEntriesByUsername,
  insertIntoEntries,
  insertIntoUsers,
  updateDiaryEntry,
  deleteDiaryEntry,
  insertIntoReminders,
  queryRemindersByUsername,
  deleteEntryReminder
};
