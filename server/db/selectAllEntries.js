/* eslint-disable no-console */
import pool from './connectDb';

const selectAllEntries = 'select * from entries';

pool.query(selectAllEntries)
  .then(result => (result.rowCount ? console.log(result.rows) : console.log('No Entries received yet')))
  .catch(err => console.log(`from database ${err}`));
