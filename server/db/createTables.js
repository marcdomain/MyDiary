// An idea from stackoverflow https://stackoverflow.com/questions/20155989/if-table-exists-drop-table-then-create-it-if-it-does-not-exist-just-create-it/20156024
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

/* eslint-disable no-console */
pool.query(createUsersTable)
  .then(result => console.log(`usersTable: ${result[0].command}PED and ${result[1].command}D`))
  .catch(err => console.log(`from database ${err}`));

pool.query(createEntriesTable)
  .then(result => console.log(`entriesTable: ${result[0].command}PED and ${result[1].command}D`))
  .catch(err => console.log(`from database ${err}`));

pool.query(createRemindersTable)
  .then(result => console.log(`remindersTable: ${result[0].command}PED and ${result[1].command}D`))
  .catch(err => console.log(`from database ${err}`));
