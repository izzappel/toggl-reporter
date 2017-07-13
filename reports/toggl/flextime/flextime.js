
const moment = require('moment');
const utils = require('../../../utils');
const config = require('../../../config');

function calculate(timeEntries) {
	return calculateFlextime(timeEntries);
}

function calculateFlextime(timeEntries) {
	const flextimePerDays = calculateFlextimePerDay(utils.groupTimeEntriesByDay(timeEntries));
	return flextimePerDays.reduce((flextime, flextimePerDay) => flextime + flextimePerDay, 0) - calculateNumberOfSollHours();
}

function calculateFlextimePerDay(groupedTimeEntriesByDay) {
	return groupedTimeEntriesByDay.map(timeEntries => utils.calculateBillableDuration(timeEntries));
}

function calculateNumberOfSollHours() {
	const startDate = utils.getStartOfDeepImpact();
	const endDate = moment();
	const numberOfWorkDays = getNumberOfWorkdays(startDate, endDate) - config.vacations.length - config.publicHolidays.length;

	const currentSollTime = numberOfWorkDays * config.dailyWorkTime;
	return currentSollTime;
}

function getNumberOfWorkdays(startDate, endDate) {
  const endOfFirstWeek = startDate.clone().endOf('week'); // end of first week
  const endOfLastWeek = endDate.clone().startOf('week'); // start of last week

  const days = endOfLastWeek.diff(endOfFirstWeek, 'days') * 5 / 7; // this will always multiply of 7

  let workDaysInFirstWeek = endOfFirstWeek.day() - startDate.day(); // check first week
  if(startDate.day() == 0) {
		--workDaysInFirstWeek; // -1 if start with sunday 
	}
  
	let workDaysInLastWeek = endDate.day() - endOfLastWeek.day(); // check last week
  if(endDate.day() == 6) {
		--workDaysInLastWeek; // -1 if end with saturday
	}
  
	return workDaysInFirstWeek + days + workDaysInLastWeek; // get the total
}

module.exports = {
	calculate: calculate,
};