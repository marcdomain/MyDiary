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
    const { entryId } = req.params;
    const foundEntry = entries.find(entry => entry.id === parseInt(entryId, 10));
    if (!foundEntry) {
      return res.status(404)
        .json({
          message: 'Entry not found',
        });
    }
    return res.status(200)
      .json({
        Entry: foundEntry,
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
    const foundEntry = entries.find(entry =>
      entry.id === parseInt(req.params.entryId, 10));
    if (foundEntry) {
      foundEntry.username = req.body.username;
      foundEntry.email = req.body.email;
      foundEntry.title = req.body.title;
      foundEntry.description = req.body.description;
      return res.status(200)
        .json({
          foundEntry,
          message: 'Entry modified successfully',
        });
    }
    return res.status(404)
      .json({
        message: 'Invalid Entry Id',
      });
  }

}

export default DiaryEntriesHandler;
