const moment = require('moment');
const config = require('./config');

const TimeEntry = require('./model/TimeEntry');
const GroupedTimeEntries = require('./model/GroupedTimeEntries');

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

function calculateFlextimePerDay(groupedTimeEntriesByDay) {
	return groupedTimeEntriesByDay.map(timeEntries => {
		return calculateBillableDuration(timeEntries) - config.dailyWorkTime;
	});
}

function calculateFlextime(timeEntries) {
	const flextimePerDays = calculateFlextimePerDay(groupTimeEntriesByDay(timeEntries));
	return flextimePerDays.reduce((flextime, flextimePerDay) => flextime + flextimePerDay, 0);
}

module.exports = {
	onlyUnique: onlyUnique,
	groupTimeEntriesByDay: groupTimeEntriesByDay,
	groupTimeEntriesByDescription: groupTimeEntriesByDescription,
	sortTimeEntriesByDescription: sortTimeEntriesByDescription,
	calculateFlextime: calculateFlextime,
};
