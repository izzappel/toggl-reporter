const utils = require('../../../utils');
const daily = require('../daily/daily');

function groupByDay(timeEntries) {
	return utils.groupTimeEntriesByDay(timeEntries)
		.map(timeEntriesPerDay => daily.groupAndSortByDescription(timeEntriesPerDay));
}

module.exports = {
	groupByDay: groupByDay,
};
