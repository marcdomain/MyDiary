import jwt from 'jsonwebtoken';
import entries from '../dummyModels/entries';
import pool from './connect';


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
   * @returns {object} - JSON object representing respone message
   * @memberof DiaryEntriesHandler
   */
  static postEntry(req, res) {
    jwt.verify(req.token, 'secretKey', (err, authInfo) => {
      if (err) {
        res.status(403)
          .json({
            message: 'supplied token is invalid'
          });
      } else {
        req.body.username = authInfo.user[0].username || authInfo.newUser[0].username;
        const sql = 'insert into entries (username, title, description) values ($1, $2, $3)';
        const params = [
          req.body.username,
          req.body.title,
          req.body.description
        ];

        pool.query(sql, params)
          .then(() => res.status(201)
            .json({
              message: 'req.body.username, your entry was recorded!',
            }))
          .catch((err) => {
            res.status(500)
              .json({
                message: err.message
              });
          });
      }
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
