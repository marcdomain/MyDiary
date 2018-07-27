import jwt from 'jsonwebtoken';
import entries from '../dummyModels/entries';
import pool from '../db/connectDb';


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
    jwt.verify(req.token, 'secretKey', (err, authInfo) => {
      if (err) {
        return res.status(403)
          .json({
            message: 'supplied token is invalid'
          });
      }

      const sql = 'select * from entries where username = $1';
      if (authInfo.user === undefined) {
        req.body.username = authInfo.newUser[0].username;
      }
      if (authInfo.newUser === undefined) {
        req.body.username = authInfo.user[0].username;
      }
      const params = [req.body.username];
      pool.query(sql, params)
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
        if (authInfo.user === undefined) {
          req.body.username = authInfo.newUser[0].username;
        }
        if (authInfo.newUser === undefined) {
          req.body.username = authInfo.user[0].username;
        }
        const sql = 'insert into entries (username, title, description) values ($1, $2, $3)';
        const params = [
          req.body.username,
          req.body.title,
          req.body.description
        ];

        pool.query(sql, params)
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
      }
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
