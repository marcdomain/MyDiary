import pool from './connectDb';
/* eslint-disable no-console */

const truncateUsers = 'truncate users';
pool.query(truncateUsers)
  .then(() => (console.log('TRUNCATED users')))
  .catch(err => console.log(`from database ${err}`));
