import pool from './connectDb';

const usersTable = 'DROP TABLE IF EXISTS users ;' + 
	'CREATE TABLE users (' +
	'user_id SERIAL PRIMARY KEY NOT NULL,' +
	'name CHARACTER VARYING(50) NOT NULL,' +
	'username CHARACTER VARYING(25) UNIQUE NOT NULL,' +
	'email CHARACTER VARYING(50) UNIQUE NOT NULL,' +
	'password CHARACTER VARYING(255) NOT NULL' +
')';

// pending
/*
pool.query(usersTable)
  .then(result => console.log(result))
  .catch(err => console.log(`from database ${err}`));
  */
