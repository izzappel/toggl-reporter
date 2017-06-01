const immutable = require('immutable');
const colors = require('colors/safe');
const momentUtils = require('../../momentUtils');
const utils = require('../../utils');
const config = require('../../config');

function printTimeEntriesGroupedByTask(timeEntries) {
	const flextime = utils.calculateFlextime(timeEntries);
	console.log('acutal cummulated flextime:', colors.red.bold(momentUtils.getDurationInSecondsAsString(flextime)));
}

module.exports = printTimeEntriesGroupedByTask;