import entries from '../dummyModels/entries';

class DiaryEntriesValidator {

  static getADiaryEntryValidator(req, res, next) {
    const { entryId } = req.params;
    const foundEntry = entries.find(entry =>
      entry.id === parseInt(entryId, 10));
    if (!foundEntry) {
      return res.status(404)
        .json({
          message: 'Entry not found',
        });
    }
    req.body.foundEntry = foundEntry;
    next();
  }
}

export default DiaryEntriesValidator;
