import jwt from 'jsonwebtoken';
import pool from '../db/connectDb';
import queries from '../db/dbQueries';

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
    const params = [req.authData.authUser[0].username];
    pool.query(queries.queryEntriesByUsername, params)
      .then((result) => {
        const userEntries = result.rows;
        if (!userEntries.length) {
          return res.status(200)
            .json({
              message: 'Your diary entries list is empty, create one now'
            });
        }
        res.status(200)
          .json({
            Entries: userEntries,
            message: 'all entries successfully served'
          });
      })
      .catch((err) => {
        res.status(500)
          .json({
            message: err.message
          });
      });
  } // End getAllEntries


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
    const params = [req.authData.authUser[0].username];
    pool.query(queries.queryEntriesByUsername, params)
      .then((result) => {
        const userEntries = result.rows;

        const { entryId } = req.params;
        const diaryEntry = userEntries.find(entry => entry.entry_id === parseInt(entryId, 10));
        if (diaryEntry) {
          res.status(200)
            .json({
              diaryEntry,
              message: 'entry successfully served'
            });
        } else {
          res.status(404)
            .json({
              message: 'Entry id is invalid'
            });
        }
      })
      .catch((err) => {
        res.status(500)
          .json({
            message: err.message
          });
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
      }

      req.body.username = authInfo.authUser[0].username;
      const params = [
        req.body.username,
        req.body.title,
        req.body.description
      ];

      pool.query(queries.insertIntoEntries, params)
        .then(() => res.status(201)
          .json({
            message: `${req.body.username}, your entry was recorded!`,
          }))
        .catch((err) => {
          res.status(500)
            .json({
              message: err.message
            });
        });
    });
  } // End postEntry

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
