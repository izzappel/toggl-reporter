const moment = require('moment');
const config = require('./config');

const TimeEntry = require('./model/TimeEntry');
const GroupedTimeEntries = require('./model/GroupedTimeEntries');

function getStartOfDeepImpact() {
	const startOfDeepImpact = moment('2017-01-09', 'YYYY-MM-DD').startOf('day');
	return startOfDeepImpact;
} 

function onlyUnique(value, index, self) {
	return self.indexOf(value) === index;
}

function calculateTotalDuration(group) {
	return group
		.valueSeq()
		.reduce((totalDuration, timeEntry) => totalDuration + timeEntry.getDuration(), 0);
}

function groupTimeEntriesByDay(timeEntries) {
	return timeEntries.groupBy(timeEntry => {
		const dateString = moment(timeEntry.get('start')).format('DD.MM.YYYY');
		return dateString;
	});
}

function groupTimeEntriesByMonth(timeEntries) {
	return timeEntries.groupBy(timeEntry => {
		const dateString = moment(timeEntry.get('start')).format('YYYY-MM');
		return dateString;
	});
}

function groupTimeEntriesByDescription(timeEntries) {
	return timeEntries
		.groupBy(timeEntry => timeEntry.get('description'))
		.map(group => {
			return new GroupedTimeEntries({
				project: group.first().get('project'),
				description: group.first().get('description'),
				duration: calculateTotalDuration(group),
				timeEntries: group,
			});
		});
}

function sortTimeEntriesByDescription(timeEntries) {
	return timeEntries.sort((timeEntry1, timeEntry2) => timeEntry1.get('description').localeCompare(timeEntry2.get('description')));
}

function calculateBillableDuration(timeEntries) {
	return timeEntries
		.valueSeq()
		.reduce((totalDuration, timeEntry) => totalDuration + timeEntry.getBillableDuration(), 0);
}

module.exports = {
	getStartOfDeepImpact: getStartOfDeepImpact,
	onlyUnique: onlyUnique,
	groupTimeEntriesByDay: groupTimeEntriesByDay,
	groupTimeEntriesByMonth: groupTimeEntriesByMonth,
	groupTimeEntriesByDescription: groupTimeEntriesByDescription,
	sortTimeEntriesByDescription: sortTimeEntriesByDescription,
	calculateBillableDuration: calculateBillableDuration,
};
