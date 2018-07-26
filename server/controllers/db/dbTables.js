const createUsersTable = 'DROP TABLE IF EXISTS users ;' + 
	'CREATE TABLE users (' +
	'user_id SERIAL PRIMARY KEY NOT NULL,' +
	'name CHARACTER VARYING(50) NOT NULL,' +
	'username CHARACTER VARYING(25) UNIQUE NOT NULL,' +
	'email CHARACTER VARYING(50) UNIQUE NOT NULL,' +
	'password CHARACTER VARYING(255) NOT NULL' +
')';

const createEntriesTable = 'DROP TABLE IF EXISTS entries ;' +
	'CREATE TABLE entries (' +
	'entry_id SERIAL PRIMARY KEY NOT NULL,' +
	'username CHARACTER VARYING(25) NOT NULL,' +
	'title CHARACTER VARYING(20) NOT NULL,' +
	'description CHARACTER VARYING(255) NOT NULL,' +
	'date TIMESTAMP NOT NULL DEFAULT (NOW())' +
')';

const createRemindersTable = 'DROP TABLE IF EXISTS reminders ;' +
	'CREATE TABLE reminders (' +
	'reminder_id SERIAL PRIMARY KEY NOT NULL,' +
	'username CHARACTER VARYING(25) NOT NULL,' +
	'email CHARACTER VARYING(50) NOT NULL,' +
	'title CHARACTER VARYING(20) NOT NULL,' +
	'date TIMESTAMP NOT NULL' +
')';

const sellectAllUsers = 'select * from users';
const sellectAllEntries = 'select * from entries';
const sellectAllReminders = 'select * from reminders';

const allTables = {
  createUsersTable,
  createEntriesTable,
  createRemindersTable,
  sellectAllUsers,
  sellectAllEntries,
  sellectAllReminders
};

export default allTables;
