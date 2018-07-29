import pool from '../db/connectDb';
import queries from '../db/dbQueries';

const {
  queryEntriesByUsername, insertIntoEntries, updateDiaryEntry
} = queries;

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
    pool.query(queryEntriesByUsername, params)
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
    pool.query(queryEntriesByUsername, params)
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
    req.body.username = req.authData.authUser[0].username;
    const params = [
      req.body.username,
      req.body.title,
      req.body.description
    ];

    pool.query(insertIntoEntries, params)
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
    const params = [req.authData.authUser[0].username];
    pool.query(queryEntriesByUsername, params)
      .then((result) => {
        const userEntries = result.rows;
        const { entryId } = req.params;
        const diaryEntry = userEntries.find(entry => entry.entry_id === parseInt(entryId, 10));
        if (diaryEntry) {
          const dateCreated = new Date(diaryEntry.date);
          const convertDateCreated = dateCreated.getTime();
          const currentDate = new Date();
          const convertCurrentDate = currentDate.getTime();
          const entryLifeSpan = convertCurrentDate - convertDateCreated;
          if (entryLifeSpan < 86400000) {
            const params1 = [
              req.authData.authUser[0].username,
              req.body.title,
              req.body.description,
              entryId
            ];
            pool.query(updateDiaryEntry, params1)
              .then((modifyResult) => {
                if (modifyResult.rowCount) {
                  res.status(205)
                    .json({
                      message: 'Entry modified successfully'
                    });
                }
              })
              .catch((err) => {
                res.status(500)
                  .json({
                    message: err.message
                  });
              });
          } else {
            res.status(403)
              .json({
                message: "You can't modify this entry, it's over 24hrs already"
              });
          }
        } else {
          res.status(404)
            .json({
              message: 'Entry not found'
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
}

export default DiaryEntriesHandler;
