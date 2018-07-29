/* eslint-disable no-console */
import pool from './connectDb';

const selectAllUsers = 'select * from users';

pool.query(selectAllUsers)
  .then(result => (result.rowCount ? console.log(result.rows) : console.log('No user has signedup yet')))
  .catch(err => console.log(`from database ${err}`));
