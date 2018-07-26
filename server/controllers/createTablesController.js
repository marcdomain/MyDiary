import pool from './connect';
import table from './dbTables';

class TablesHandler {
  static createTable(req, res) {
    pool.query(table.entriesTable)
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
