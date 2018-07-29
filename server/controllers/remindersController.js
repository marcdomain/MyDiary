import pool from '../db/connectDb';
import queries from '../db/dbQueries';

const { insertIntoReminders } = queries;

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
    const params = [
      req.body.username,
      req.body.email,
      req.body.title,
      req.body.date
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
  }
}

export default ReminderSettingsHandler;
