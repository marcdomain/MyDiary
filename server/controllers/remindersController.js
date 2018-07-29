import pool from '../db/connectDb';
import queries from '../db/dbQueries';

const { insertIntoReminders, deleteEntryReminder } = queries;

/*
 * Class representing Reminder Settings Handler
 *
 * @class ReminderSettingsHandler
 */

class ReminderSettingsHandler {
  /*
   * Set reminder
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @memberof ReminderSettingsHandler
   */
  static setReminder(req, res) {
    req.body.username = req.authData.authUser[0].username;
    req.body.email = req.authData.authUser[0].email;
    const reminderDate = `${req.body.date} ${req.body.time}`;
    const params = [
      req.body.username,
      req.body.email,
      req.body.title,
      reminderDate
    ];

    pool.query(insertIntoReminders, params)
      .then(() => res.status(201)
        .json({
          message: 'Reminder recorded successfully!',
        }))
      .catch((err) => {
        res.status(500)
          .json({
            message: err.message
          });
      });
  } // End setReminder

  static deleteReminder(req, res) {
    const params = [req.authData.authUser[0].username];
    pool.query(deleteEntryReminder, params)
      .then((result) => {
        const entryReminders = result.rows;
        const { reminderId } = req.params;

        const foundReminder = entryReminders
          .find(reminder => reminder.reminder_id === parseInt(reminderId, 10));
        if (foundReminder) {
          const param1 = [reminderId];
          pool.query(deleteEntryReminder, param1)
            .then(() => res.status(200)
              .json({
                message: 'Reminder deleted successfully'
              }))
            .catch(err => res.status(500)
              .json({
                message: err.message
              }));
        } else {
          res.status(404)
            .json({
              message: 'Reminder not found'
            });
        }
      })
      .catch((err) => {
        res.status(500)
          .json({
            message: err.message
          });
      });
  }// End deleteReminder
}

export default ReminderSettingsHandler;
