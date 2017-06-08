const utils = require('../../../utils');
const config = require('../../../config');

function calculate(timeEntries) {
	return calculateFlextime(timeEntries);
}

function calculateFlextime(timeEntries) {
	const flextimePerDays = calculateFlextimePerDay(utils.groupTimeEntriesByDay(timeEntries));
	return flextimePerDays.reduce((flextime, flextimePerDay) => flextime + flextimePerDay, 0);
}

function calculateFlextimePerDay(groupedTimeEntriesByDay) {
	return groupedTimeEntriesByDay.map(timeEntries => {
		return utils.calculateBillableDuration(timeEntries) - config.dailyWorkTime;
	});
}


module.exports = {
	calculate: calculate,
};