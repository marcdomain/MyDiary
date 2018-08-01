/*
 * Class representing Reminder Settings Validator
 *
 * @class reminderSettingsValidator
 */

class ReminderSettingsValidator {
  /*
     * Post for a reminder entry
     *
     * @param {object} request object
     * @param {object} response object
     * @param {function} next - Calls the next route handler
     * @returns {object} JSON object representing failure message
     * @memberof reminderSettingsValidator
     */
  static postReminderValidator(request, response, next) {
    let { title, time, setdate } = request.body;

    if (title === undefined) {
      return response.status(406)
        .json({
          message: 'You have made no input for Diary Entry Title',
        });
    }

    title = title.trim();
    if (title === '') {
      return response.status(406)
        .json({
          message: 'Title field cannot be empty',
        });
    }
    if (title.length < 3 || title.length > 20) {
      return response.status(406)
        .json({
          message: 'Your title should be 3 to 20 characters long',
        });
    }

    const validTitleText = /^[a-z0-9-.!@&' ]+$/i;
    if (!validTitleText.test(title)) {
      return response.status(406)
        .json({
          message: "Title should not contain special characters except for ! . - @ & '",
        });
    }

    if (setdate === undefined) {
      return response.status(406)
        .json({
          message: 'You have made no input for Diary Entry description',
        });
    }
    setdate = setdate.trim();
    if (setdate === '') {
      return response.status(404)
        .json({
          message: 'setdate field cannot be empty',
        });
    }

    if (time === undefined) {
      return response.status(406)
        .json({
          message: 'You have made no input for Diary Entry description',
        });
    }

    time = time.trim();
    if (time === '') {
      return response.status(404)
        .json({
          message: 'time field cannot be empty',
        });
    }
    request.body.title = title;
    request.body.date = setdate;
    request.body.time = time;
    return next();
  }
}
export default ReminderSettingsValidator;
