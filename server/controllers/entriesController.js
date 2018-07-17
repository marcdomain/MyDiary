import entries from '../dummyModels/entries';

class DiaryEntriesHandler {

  static getAllEntries(req, res) {
    res.status(200)
      .json({
        diaryEntries: entries,
        message: 'All diary entries served'
      });
  }
}

export default DiaryEntriesHandler;
