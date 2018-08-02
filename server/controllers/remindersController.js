import pool from '../db/connectDb';
<<<<<<< HEAD
import { insertIntoReminders, deleteEntryReminder } from '../db/dbQueries';
=======
import { insertIntoReminders, queryRemindersByUsername, deleteEntryReminder } from '../db/dbQueries';
>>>>>>> ft-implement-feedback-on-api-endpoints-159471108

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
      .then(result => response.status(201)
        .json({
          message: 'Reminder recorded successfully!',
          reminderData: result.rows[0]
        }))
      .catch((error) => {
        response.status(500)
          .json({
            status: 'error',
            message: error.message
          });
      });
  } // End setReminder

  static deleteReminder(request, response) {
    const params = [request.authData.authUser[0].username];
    pool.query(queryRemindersByUsername, params)
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
