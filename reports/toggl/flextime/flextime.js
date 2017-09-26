const moment = require('moment');
const colors = require('colors/safe');
const Table = require('cli-table2');
const momentUtils = require('../../../momentUtils');
const utils = require('../../../utils');
const config = require('../../../config');

function calculate(timeEntries) {
	return calculateFlextime(timeEntries);
}

function printDetails(flextimePerMonth) {
	const table = new Table({
    head: ['Month', 'Duration'],
    colWidths: [20, 20]
	});
	flextimePerMonth
		.sortBy((flextime, month) => month)
		.forEach((duration, month) => table.push([colors.gray(month), colors.gray(momentUtils.getDurationInSecondsAsString(duration))]));
	console.log(table.toString());
}

function calculateFlextime(timeEntries) {
	const flextimePerMonth = calculateFlextimePerMonth(utils.groupTimeEntriesByMonth(timeEntries)).concat(config.flextimePerMonth);
	printDetails(flextimePerMonth);
	
	const cumulatedFlextime = flextimePerMonth.reduce((flextime, flextimePerDay) => flextime + flextimePerDay, 0);
	const cumulatedSolltime = calculateNumberOfSollHours();
	return cumulatedFlextime - cumulatedSolltime;
}

function calculateFlextimePerMonth(groupedTimeEntriesByMonth) {
	return groupedTimeEntriesByMonth.map(timeEntries => utils.calculateBillableDuration(timeEntries));
}

function calculateNumberOfSollHours() {
	const startDate = utils.getStartOfDeepImpact();
	const endDate = momentUtils.getToday().endOf('day');

	const numberOfVacations = config.vacations.reduce((sum, vacationDate) => {
		const isBetween = moment(vacationDate).isBetween(startDate, endDate, 'day', '[]');
		return isBetween ? sum + 1 : sum;
	}, 0);

	const numberOfPublicHolidays = config.publicHolidays.reduce((sum, holidayDate) => {
		const isBetween = moment(holidayDate).isBetween(startDate, endDate, 'day', '[]');
		return isBetween ? sum + 1 : sum;
	}, 0);

	console.log('Number of taken vacations:', numberOfVacations);
	console.log('Number of public holidays:', numberOfPublicHolidays);

	const numberOfWorkDays = getNumberOfWorkdays(startDate, endDate) - numberOfVacations - numberOfPublicHolidays;
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