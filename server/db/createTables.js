/* eslint-disable no-console */
import pool from './connectDb';

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


pool.query(createUsersTable)
  .then(result => console.log('userTable', result.command))
  .catch(err => console.log(`from database ${err}`));

pool.query(createEntriesTable)
  .then(result => console.log('entriesTable', result.command))
  .catch(err => console.log(`from database ${err}`));

pool.query(createRemindersTable)
  .then(result => console.log('remindersTable', result.command))
  .catch(err => console.log(`from database ${err}`));
