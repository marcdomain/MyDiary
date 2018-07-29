/*
 * Class representing Diary Entries Validator
 *
 * @class DiaryEntriesValidator
 */

class DiaryEntriesValidator {
  /*
   * Post for a diary entry
   *
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {function} next - Calls the next route handler
   * @returns {object} JSON object representing failure message
   * @memberof DiaryEntriesValidator
   */
  static postEntryValidator(req, res, next) {
    let { title, description } = req.body;

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

    if (description === undefined) {
      return res.status(406)
        .json({
          message: 'You have made no input for Diary Entry description',
        });
    }

    description = description.trim();
    if (description === '') {
      return res.status(404)
        .json({
          message: 'description field cannot be empty',
        });
    }
    if (description.length < 10 || description.length > 255) {
      return res.status(406)
        .json({
          message: 'Your description should be 10 to 255 characters long',
        });
    }

    const validDescriptionText = /^[a-z0-9-.!',:;@& ]+$/i;
    if (!validDescriptionText.test(description)) {
      return res.status(406)
        .json({
          message: "description should not contain special characters except for ! . - ' : ; , @ &",
        });
    }
    req.body.title = title;
    req.body.description = description;
    return next();
  }

  /*
   * Modify a specific diary entry
   *
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {function} next - Calls the next route handler
   * @returns {object} JSON object representing failure message
   * @memberof DiaryEntriesValidator
   */
  static modifyEntryValidator(req, res, next) {
    let { title, description } = req.body;
    if (title === undefined) {
      return res.status(406)
        .json({
          message: 'You have made no input for Diary Entry Title',
        });
    }

    title = title.trim();
    if (title === '') {
      return res.status(404)
        .json({
          message: 'Title field cannot be empty',
        });
    }
    if (title.length < 3 || title.length > 40) {
      return res.status(406)
        .json({
          message: 'Your title should be 3 to 40 characters long',
        });
    }

    const validTitleText = /^[a-z0-9-.!@&' ]+$/i;
    if (!validTitleText.test(title)) {
      return res.status(406)
        .json({
          message: "Title should not contain special characters except for ! . - @ & '",
        });
    }

    if (description === undefined) {
      return res.status(406)
        .json({
          message: 'You have made no input for Diary Entry description',
        });
    }

    description = description.trim();
    if (description === '') {
      return res.status(404)
        .json({
          message: 'description field cannot be empty',
        });
    }
    if (description.length < 10 || description.length > 255) {
      return res.status(406)
        .json({
          message: 'Your description should be 10 to 255 characters long',
        });
    }

    const validDescriptionText = /^[a-z0-9-.!',:;@& ]+$/i;
    if (!validDescriptionText.test(description)) {
      return res.status(406)
        .json({
          message: "description should not contain special characters except for ! . - ' : ; , @ &",
        });
    }

    req.body.title = title;
    req.body.description = description;
    return next();
  }
}

export default DiaryEntriesValidator;
