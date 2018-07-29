/* eslint-disable no-console */
import pool from './connectDb';

const selectAllReminders = 'select * from reminders';

pool.query(selectAllReminders)
  .then(result => (result.rowCount ? console.log(result.rows) : console.log('No Reminder has been created')))
  .catch(err => console.log(`from database ${err}`));
