import entries from '../dummyModels/entries';

class DiaryEntriesHandler {

  static getAllEntries(req, res) {
    res.status(200)
      .json({
        diaryEntries: entries,
        message: 'All diary entries served'
      });
  }

  static getADiaryEntry(req,res) {
    res.status(200)
      .json({
        Entry: req.body.foundEntry,
        message: 'Entry fetched successfully',
      });
  }

  static postEntry(req, res) {
    const {
      username, email, title, description
    } = req.body;
    const id = entries[entries.length - 1].id + 1;
    const newEntry = {
      id,
      username,
      email,
      title,
      description,
    };
    entries.push(newEntry);
    res.status(201)
      .json({
        newEntry,
        status: 'created',
        message: 'Success'
      });
  }

  static modifyEntry(req, res) {
    const { foundEntry } = req.body;
    foundEntry.username = req.body.username;
    foundEntry.email = req.body.email;
    foundEntry.title = req.body.title;
    foundEntry.description = req.body.description;
    return res.status(205)
      .json({
        foundEntry,
        message: 'Entry modified successfully',
      });
  }

}

export default DiaryEntriesHandler;
