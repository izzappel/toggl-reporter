const colors = require('colors/safe');
const moment = require('moment');
const momentUtils = require('../../../momentUtils');
const dailyPrint = require('../daily/print');

function printGroupedTimeEntriesPerDay(groupedTimeEntriesPerDay) {
  groupedTimeEntriesPerDay.forEach(printTimeEntriesForDay);
}

function printTimeEntriesForDay(timeEntriesForDay) {
  const date = momentUtils.getMomentAsString(moment(timeEntriesForDay.first().get('timeEntries').first().get('start')));
  console.log('Tasks for', colors.red.bold(date));
  dailyPrint(timeEntriesForDay);
}

module.exports = printGroupedTimeEntriesPerDay;
