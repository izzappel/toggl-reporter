const immutable = require('immutable');
const colors = require('colors/safe');
const momentUtils = require('../momentUtils');
const utils = require('../utils');
const config = require('../config');

function printTimeEntriesGroupedByTask(timeEntries) {
  const flextime = cummulateFlextime(calculateFlextimePerDay(utils.groupByDay(timeEntries)));
  console.log('acutal cummulated flextime:', colors.red.bold(momentUtils.getDurationInSecondsAsString(flextime)));
}

function cummulateFlextime(flextimePerDays) {
  return flextimePerDays.reduce((flextime, flextimePerDay) => flextime + flextimePerDay, 0);
}

function calculateFlextimePerDay(groupedTimeEntries) {
  return groupedTimeEntries.map(timeEntries => {
    return  calculateDuration(timeEntries) - config.dailyWorkTime;
  });
}

function calculateDuration(timeEntries) {
  return timeEntries
    .valueSeq()
    .reduce((totalDuration, timeEntry) => totalDuration + timeEntry.getBillableDuration(), 0);
}

module.exports = printTimeEntriesGroupedByTask;