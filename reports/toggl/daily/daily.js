const utils = require('../../../utils');

function groupAndSortByDescription(timeEntries) {
  const timeEntriesPerGroup =
    utils.sortTimeEntriesByDescription(
      utils.groupTimeEntriesByDescription(timeEntries)
    );

	return timeEntriesPerGroup;
}

module.exports = {
	groupAndSortByDescription: groupAndSortByDescription,
};
