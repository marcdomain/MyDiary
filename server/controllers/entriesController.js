import pool from '../db/connectDb';
import queries from '../db/dbQueries';

const {
  queryEntriesByUsername, insertIntoEntries, updateDiaryEntry, deleteDiaryEntry
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
   * @param {object} request object
   * @param {object} response object
   * @returns {object} - JSON object representing diary entries and success message
   * @memberof DiaryEntriesHandler
   */
  static getAllEntries(request, response) {
    const params = [request.authData.authUser[0].username];
    pool.query(queryEntriesByUsername, params)
      .then((result) => {
        const userEntries = result.rows;
        if (!userEntries.length) {
          return response.status(200)
            .json({
              message: 'Your diary entries list is empty, create one now'
            });
        }
        response.status(200)
          .json({
            entries: userEntries,
            message: 'all entries successfully served'
          });
      })
      .catch((error) => {
        response.status(500)
          .json({
            message: error.message
          });
      });
  } // End getAllEntries


  /*
   * Get a specific diary entry
   *
   * @static
   * @param {object} request object
   * @param {object} response object
   * @returns {object} - JSON object representing the diary entry
   * @memberof DiaryEntriesHandler
   */
  static getDiaryEntry(request, response) {
    const params = [request.authData.authUser[0].username];
    pool.query(queryEntriesByUsername, params)
      .then((result) => {
        const userEntries = result.rows;

        const { entryId } = request.params;
        const diaryEntry = userEntries.find(entry => entry.entry_id === parseInt(entryId, 10));
        if (diaryEntry) {
          response.status(200)
            .json({
              diaryEntry,
              message: 'entry successfully served'
            });
        } else {
          response.status(404)
            .json({
              message: 'Entry id is invalid'
            });
        }
      })
      .catch((error) => {
        response.status(500)
          .json({
            message: error.message
          });
      });
  }

  /*
   * Add a diary entry
   *
   * @static
   * @param {object} request object
   * @param {object} response object
   * @returns {object} - JSON object representing respone message
   * @memberof DiaryEntriesHandler
   */
  static postEntry(request, response) {
    request.body.username = request.authData.authUser[0].username;
    const params = [
      request.body.username,
      request.body.title,
      request.body.description
    ];

    pool.query(insertIntoEntries, params)
      .then(() => response.status(201)
        .json({
          message: 'Success',
        }))
      .catch((error) => {
        response.status(500)
          .json({
            message: error.message
          });
      });
  } // End postEntry

  /*
   * Modify a diary
   *
   * @static
   * @param {object} request object
   * @param {object} response object
   * @returns {object} - JSON object representing success
   * @memberof DiaryEntriesHandler
   */
  static modifyEntry(request, response) {
    const params = [request.authData.authUser[0].username];
    pool.query(queryEntriesByUsername, params)
      .then((result) => {
        const userEntries = result.rows;
        const { entryId } = request.params;
        const diaryEntry = userEntries.find(entry => entry.entry_id === parseInt(entryId, 10));

        if (diaryEntry) {
          const dateCreated = new Date(diaryEntry.date);
          const convertDateCreated = dateCreated.getTime();
          const currentDate = new Date();
          const convertCurrentDate = currentDate.getTime();
          const entryLifeSpan = convertCurrentDate - convertDateCreated;

          if (entryLifeSpan < 86400000) {
            const updateParams = [
              request.authData.authUser[0].username,
              request.body.title,
              request.body.description,
              entryId
            ];
            pool.query(updateDiaryEntry, updateParams)
              .then((modifyResult) => {
                if (modifyResult.rowCount) {
                  response.status(205)
                    .json({
                      message: 'Entry modified successfully'
                    });
                }
              })
              .catch((error) => {
                response.status(500)
                  .json({
                    message: error.message
                  });
              });
          } else {
            response.status(403)
              .json({
                message: "You can't modify this entry, it's over 24hrs already"
              });
          }
        } else {
          response.status(404)
            .json({
              message: 'Entry not found'
            });
        }
      })
      .catch((error) => {
        response.status(500)
          .json({
            message: error.message
          });
      });
  } // End modfyEntry

  /*
   * Delete a diary entry
   *
   * @static
   * @param {object} request object
   * @param {object} response object
   * @memberof DiaryEntriesHandler
   */
  static deleteEntry(request, response) {
    const params = [request.authData.authUser[0].username];
    pool.query(queryEntriesByUsername, params)
      .then((result) => {
        const userEntries = result.rows;
        const { entryId } = request.params;

        const diaryEntry = userEntries.find(entry => entry.entry_id === parseInt(entryId, 10));
        if (diaryEntry) {
          const param1 = [entryId];
          pool.query(deleteDiaryEntry, param1)
            .then(() => response.status(200)
              .json({
                message: 'Entry deleted successfully'
              }))
            .catch(error => response.status(500)
              .json({
                message: error.message
              }));
        } else {
          response.status(404)
            .json({
              message: 'Entry not found'
            });
        }
      })
      .catch((error) => {
        response.status(500)
          .json({
            message: error.message
          });
      });
  }// End deleteEntry
}

export default DiaryEntriesHandler;
