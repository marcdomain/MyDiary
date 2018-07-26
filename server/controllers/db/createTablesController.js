import pool from './connect';
import table from './dbTables';

/*
 * Class representing User Database Tables Handler
 *
 * @class TablesHandler
 */

class TablesHandler {
  /*
   * Reset or get a database table
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} JSON object representing the response message
   * @memberof TablesHandler
   */
  static createTable(req, res) {
    pool.query(table.usersTable)
      .then(result => res.status(201)
        .json({
          result,
          message: 'Created'
        }))
      .catch(err => res.status(500)
        .json({
          message: `from database ${err}`
        }));
  }
}

export default TablesHandler;
