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

  static postEntryValidator(req, res, next) {
    let {
      username, email, title, description
    } = req.body;
    if (username === undefined) {
      return res.status(406)
      .json({
        message: 'You have made no input for username',
      });
    }
    if (username === "") {
      return res.status(406)
      .json({
        message: 'Username field cannot be empty',
      });
    }

    username = username.trim();
    username = username.toLowerCase();
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

    if (email === undefined){
      return res.status(406)
        .json({
          message: 'You have made no input for email'
        })
    }
    if(email === ''){
      return res.status(406)
        .json({
          message: 'Email field cannot be empty'
        })
    }
    if(!/^[a-zA-Z0-9._-]{2,}@[a-zA-Z]+\.[a-zA-Z]{2,5}(\.[a-zA-Z]{2,5})?$/.test(email)) {
      return res.status(406)
        .json({
          message: 'Your email format is invalid'
        })
    }
    email = email.trim();
    email = email.toLowerCase();

    if(email.length < 10 || email.length > 50){
      return res.status(406)
        .json({
          message: 'Your email should be 10 to 50 characters long'
        })
    }

    if(title === undefined) {
      return res.status(406)
        .json({
        message: 'You have made no input for Diary Entry Title',
        })
    }

    title = title.trim();
    if(title === '') {
      return res.status(406)
        .json({
        message: 'Title field cannot be empty',
        })
    }
    if(title.length < 3 || title.length > 40) {
      return res.status(406)
        .json({
        message: 'Your title should be 3 to 40 characters long',
        })
    }

    const validTitleText = /^[a-z0-9-.!@&' ]+$/i
    if(!validTitleText.test(title)) {
      return res.status(406)
        .json({
          message: "Title should not contain special characters except for ! . - @ & '",
        })
    }

    if(description === undefined) {
      return res.status(406)
        .json({
        message: 'You have made no input for Diary Entry description',
        })
    }

    description = description.trim();
    if(description === '') {
      return res.status(404)
        .json({
        message: 'description field cannot be empty',
        })
    }
    if(description.length < 10 || description.length > 300) {
      return res.status(406)
        .json({
        message: 'Your description should be 10 to 300 characters long',
        })
    }

    const validDescriptionText = /^[a-z0-9-.!',:;@& ]+$/i
    if(!validDescriptionText.test(description)) {
      return res.status(406)
        .json({
          message: "description should not contain special characters except for ! . - ' : ; , @ &",
        })
    }
    return next();
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
      return res.status(406)
      .json({
        message: 'You have made no input for username',
      });
    }
    if (username === "") {
      return res.status(404)
      .json({
        message: 'Username field cannot be empty',
      });
    }

    username = username.trim();
    username = username.toLowerCase();
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

    if (email === undefined){
      return res.status(406)
        .json({
          message: 'You have made no input for email'
        })
    }
    if(email === ''){
      return res.status(404)
        .json({
          message: 'Email field cannot be empty'
        })
    }
    if(!/^[a-zA-Z0-9._-]{2,}@[a-zA-Z]+\.[a-zA-Z]{2,5}(\.[a-zA-Z]{2,5})?$/.test(email)) {
      return res.status(406)
        .json({
          message: 'Your email format is invalid'
        })
    }
    email = email.trim();
    email = email.toLowerCase();

    if(email.length < 10 || email.length > 50){
      return res.status(406)
        .json({
          message: 'Your email should be 10 to 50 characters long'
        })
    }

    if(title === undefined) {
      return res.status(406)
        .json({
         message: 'You have made no input for Diary Entry Title',
        })
    }

    title = title.trim();
    if(title === '') {
      return res.status(404)
        .json({
         message: 'Title field cannot be empty',
        })
    }
    if(title.length < 3 || title.length > 40) {
      return res.status(406)
        .json({
         message: 'Your title should be 3 to 40 characters long',
        })
    }

    const validTitleText = /^[a-z0-9-.!@&' ]+$/i
    if(!validTitleText.test(title)) {
      return res.status(406)
        .json({
          message: "Title should not contain special characters except for ! . - @ & '",
        })
    }

    if(description === undefined) {
      return res.status(406)
        .json({
         message: 'You have made no input for Diary Entry description',
        })
    }

    description = description.trim();
    if(description === '') {
      return res.status(404)
        .json({
         message: 'description field cannot be empty',
        })
    }
    if(description.length < 10 || description.length > 300) {
      return res.status(406)
        .json({
         message: 'Your description should be 10 to 300 characters long',
        })
    }

    const validDescriptionText = /^[a-z0-9-.!',:;@& ]+$/i
    if(!validDescriptionText.test(description)) {
      return res.status(406)
        .json({
          message: "description should not contain special characters except for ! . - ' : ; , @ &",
        })
    }

    req.body.foundEntry = foundEntry;
    return next();
  } 

}

export default DiaryEntriesValidator;
