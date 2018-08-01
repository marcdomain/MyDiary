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
   * @param {object} request object
   * @param {object} response object
   * @memberof ReminderSettingsHandler
   */
  static setReminder(request, response) {
    request.body.username = request.authData.authUser[0].username;
    request.body.email = request.authData.authUser[0].email;
    const params = [
      request.body.username,
      request.body.email,
      request.body.title,
      request.body.setdate,
      request.body.time
    ];

    pool.query(insertIntoReminders, params)
      .then(() => response.status(201)
        .json({
          message: 'Reminder recorded successfully!',
        }))
      .catch((error) => {
        response.status(500)
          .json({
            message: error.message
          });
      });
  } // End setReminder

  static deleteReminder(request, response) {
    const params = [request.authData.authUser[0].username];
    pool.query(deleteEntryReminder, params)
      .then((result) => {
        const entryReminders = result.rows;
        const { reminderId } = request.params;

        const foundReminder = entryReminders
          .find(reminder => reminder.reminder_id === parseInt(reminderId, 10));
        if (foundReminder) {
          const reminderParam = [reminderId];
          pool.query(deleteEntryReminder, reminderParam)
            .then(() => response.status(200)
              .json({
                message: 'Reminder deleted successfully'
              }))
            .catch(error => response.status(500)
              .json({
                message: error.message
              }));
        } else {
          response.status(404)
            .json({
              message: 'Reminder not found'
            });
        }
      })
      .catch((error) => {
        response.status(500)
          .json({
            message: error.message
          });
      });
  }// End deleteReminder
}

export default ReminderSettingsHandler;
