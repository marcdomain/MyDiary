import entries from '../dummyModels/entries';

/*
 * Class representing Diary Entries Handler
 *
 * @class DiaryEntriesHandler
 */

class DiaryEntriesHandler {
  /*
   * Get all Diary entries
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} - JSON object representing diary entries and success message
   * @memberof DiaryEntriesHandler
   */
  static getAllEntries(req, res) {
    res.status(200)
      .json({
        diaryEntries: entries,
        message: 'All diary entries served'
      });
  }

  /*
   * Get a specific diary entry
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} - JSON object representing the diary entry
   * @memberof DiaryEntriesHandler
   */
  static getADiaryEntry(req, res) {
    const { foundEntry } = req.body;
    res.status(200)
      .json({
        Entry: foundEntry,
        message: 'Entry fetched successfully',
      });
  }

  /*
   * Add a diary entry
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} - JSON object representing success
   * @memberof DiaryEntriesHandler
   */
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
        message: 'Success'
      });
  }

  /*
   * Modify a diary
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} - JSON object representing success
   * @memberof DiaryEntriesHandler
   */
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
