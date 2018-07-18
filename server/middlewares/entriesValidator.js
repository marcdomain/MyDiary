import entries from '../dummyModels/entries';

class DiaryEntriesValidator {

  static getADiaryEntryValidator(req, res, next) {
    const { entryId } = req.params;
    const foundEntry = entries.find(entry =>
      entry.id === parseInt(entryId, 10));
    if (!foundEntry) {
      return res.status(404)
        .json({
          message: 'Entry not found',
        });
    }
    req.body.foundEntry = foundEntry;
    next();
  }

  static modifyEntryValidator(req, res, next) {
    const foundEntry = entries.find(entry => entry.id === parseInt(req.params.entryId, 10));
    if(!foundEntry) {
    return res.status(404)
      .json({
        message: 'Invalid Entry Id',
      });
    }

    let {
      username, email, title, description
    } = req.body;
    if (username === undefined) {
      return res.status(404)
      .json({
        message: 'You made no input for username',
      });
    }
    if (username === "") {
      return res.status(404)
      .json({
        message: 'Username field cannot be empty',
      });
    }

    username = username.trim();
    if (username.length < 3 || username.length >25) {
      return res.status(406)
        .json({
          message: 'Your username should be 3 to 25 characters long',
        });
    }

    const alphaNumeric = /^[a-z0-9]+$/i;
    if(!alphaNumeric.test(username)) {
      return res.status(406)
        .json({
          message: 'Only Alphanumeric charaters are allowed for username',
        });
    }

    req.body.foundEntry = foundEntry;
    return next();
  }


}

export default DiaryEntriesValidator;
