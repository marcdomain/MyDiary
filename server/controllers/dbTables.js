const usersTable = 'DROP TABLE IF EXISTS users ;' + 
	'CREATE TABLE users (' +
	'user_id SERIAL PRIMARY KEY NOT NULL,' +
	'name CHARACTER VARYING(50) NOT NULL,' +
	'username CHARACTER VARYING(25) UNIQUE NOT NULL,' +
	'email CHARACTER VARYING(50) UNIQUE NOT NULL,' +
	'password CHARACTER VARYING(255) NOT NULL' +
')';

const entriesTable = 'DROP TABLE IF EXISTS entries ;' +
	'CREATE TABLE entries (' +
	'entry_id SERIAL PRIMARY KEY NOT NULL,' +
	'owner_id INT NOT NULL,' +
	'username CHARACTER VARYING(25) NOT NULL,' +
	'title CHARACTER VARYING(20) NOT NULL,' +
	'description CHARACTER VARYING(255) NOT NULL,' +
	'date TIMESTAMP NOT NULL DEFAULT (NOW())' +
')';

const remindersTable = 'DROP TABLE IF EXISTS reminders ;' +
	'CREATE TABLE reminders (' +
	'reminder_id SERIAL PRIMARY KEY NOT NULL,' +
	'username CHARACTER VARYING(25) NOT NULL,' +
	'email CHARACTER VARYING(50) NOT NULL,' +
	'title CHARACTER VARYING(20) NOT NULL,' +
	'date TIMESTAMP NOT NULL' +
')';

const users = 'select * from users';
const entries = 'select * from entries';
const reminders = 'select * from reminders';

const tables = {
  usersTable,
  entriesTable,
  remindersTable,
  users,
  entries,
  reminders
};

export default tables;
