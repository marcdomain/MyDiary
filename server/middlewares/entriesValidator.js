/*
 * Class representing Diary Entries Validator
 *
 * @class DiaryEntriesValidator
 */

class DiaryEntriesValidator {
  /*
   * Post for a diary entry
   *
   * @param {object} request object
   * @param {object} response object
   * @param {function} next - Calls the next route handler
   * @returns {object} JSON object representing failure message
   * @memberof DiaryEntriesValidator
   */
  static postEntryValidator(request, response, next) {
    let { title, description } = request.body;

    if (title === undefined) {
      return response.status(406)
        .json({
          status: 'error',
          message: 'You have made no input for Diary Entry Title',
        });
    }

    title = title.trim();
    if (title === '') {
      return response.status(406)
        .json({
          status: 'error',
          message: 'Title field cannot be empty',
        });
    }
    if (title.length < 3 || title.length > 20) {
      return response.status(406)
        .json({
          status: 'error',
          message: 'Your title should be 3 to 20 characters long',
        });
    }

    const validTitleText = /^[a-z0-9-.!@&' ]+$/i;
    if (!validTitleText.test(title)) {
      return response.status(406)
        .json({
          status: 'error',
          message: "Title should not contain special characters except for ! . - @ & '",
        });
    }

    if (description === undefined) {
      return response.status(406)
        .json({
          status: 'error',
          message: 'You have made no input for Diary Entry description',
        });
    }

    description = description.trim();
    if (description === '') {
      return response.status(404)
        .json({
          status: 'error',
          message: 'description field cannot be empty',
        });
    }
    if (description.length < 10 || description.length > 255) {
      return response.status(406)
        .json({
          status: 'error',
          message: 'Your description should be 10 to 255 characters long',
        });
    }

    const validDescriptionText = /^[a-z0-9-.!',:;@& ]+$/i;
    if (!validDescriptionText.test(description)) {
      return response.status(406)
        .json({
          status: 'error',
          message: "description should not contain special characters except for ! . - ' : ; , @ &",
        });
    }
    request.body.title = title;
    request.body.description = description;
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
  static modifyEntryValidator(request, response, next) {
    let { title, description } = request.body;
    if (title === undefined) {
      return response.status(406)
        .json({
          status: 'error',
          message: 'You have made no input for Diary Entry Title',
        });
    }

    title = title.trim();
    if (title === '') {
      return response.status(404)
        .json({
          status: 'error',
          message: 'Title field cannot be empty',
        });
    }
    if (title.length < 3 || title.length > 40) {
      return response.status(406)
        .json({
          status: 'error',
          message: 'Your title should be 3 to 40 characters long',
        });
    }

    const validTitleText = /^[a-z0-9-.!@&' ]+$/i;
    if (!validTitleText.test(title)) {
      return response.status(406)
        .json({
          status: 'error',
          message: "Title should not contain special characters except for ! . - @ & '",
        });
    }

    if (description === undefined) {
      return response.status(406)
        .json({
          status: 'error',
          message: 'You have made no input for Diary Entry description',
        });
    }

    description = description.trim();
    if (description === '') {
      return response.status(404)
        .json({
          status: 'error',
          message: 'description field cannot be empty',
        });
    }
    if (description.length < 10 || description.length > 255) {
      return response.status(406)
        .json({
          status: 'error',
          message: 'Your description should be 10 to 255 characters long',
        });
    }

    const validDescriptionText = /^[a-z0-9-.!',:;@& ]+$/i;
    if (!validDescriptionText.test(description)) {
      return response.status(406)
        .json({
          status: 'error',
          message: "description should not contain special characters except for ! . - ' : ; , @ &",
        });
    }

    request.body.title = title;
    request.body.description = description;
    return next();
  }
}

export default DiaryEntriesValidator;
