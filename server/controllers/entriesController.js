import entries from '../dummyModels/entries';

class DiaryEntriesHandler {

  static getAllEntries(req, res) {
    res.status(200)
      .json({
        diaryEntries: entries,
        message: 'All diary entries served'
      });
  }

  static getADiaryEntry(req,res) {
    const { entryId } = req.params;
    const foundEntry = entries.find(entries => entries.id === parseInt(entryId, 10));
    if (!foundEntry) {
      return res.status(404)
        .json({
          message: 'Entry not found',
        });
    }
    return res.status(200)
      .json({
        entries: foundEntry,
        message: 'Entry fetched successfully',
      });
  }

}

export default DiaryEntriesHandler;
