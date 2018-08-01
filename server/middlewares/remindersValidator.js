/*
 * Class representing Reminder Settings Validator
 *
 * @class reminderSettingsValidator
 */

class ReminderSettingsValidator {
  /*
     * Post for a reminder entry
     *
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @param {function} next - Calls the next route handler
     * @returns {object} JSON object representing failure message
     * @memberof reminderSettingsValidator
     */
  static postReminderValidator(req, res, next) {
    let { title, time, setdate } = req.body;

    if (title === undefined) {
      return res.status(406)
        .json({
          message: 'You have made no input for Diary Entry Title',
        });
    }

    title = title.trim();
    if (title === '') {
      return res.status(406)
        .json({
          message: 'Title field cannot be empty',
        });
    }
    if (title.length < 3 || title.length > 20) {
      return res.status(406)
        .json({
          message: 'Your title should be 3 to 20 characters long',
        });
    }

    const validTitleText = /^[a-z0-9-.!@&' ]+$/i;
    if (!validTitleText.test(title)) {
      return res.status(406)
        .json({
          message: "Title should not contain special characters except for ! . - @ & '",
        });
    }

    if (setdate === undefined) {
      return res.status(406)
        .json({
          message: 'You have made no input for Diary Entry description',
        });
    }
    setdate = setdate.trim();
    if (setdate === '') {
      return res.status(404)
        .json({
          message: 'setdate field cannot be empty',
        });
    }

    if (time === undefined) {
      return res.status(406)
        .json({
          message: 'You have made no input for Diary Entry description',
        });
    }

    time = time.trim();
    if (time === '') {
      return res.status(404)
        .json({
          message: 'time field cannot be empty',
        });
    }
    req.body.title = title;
    req.body.date = setdate;
    req.body.time = time;
    return next();
  }
}
export default ReminderSettingsValidator;
