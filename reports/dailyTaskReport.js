const colors = require('colors/safe');
const moment = require('moment');
const taskReport = require('./taskReport');
const momentUtils = require('../momentUtils');

function printTimeEntriesGroupedByTask(timeEntries) {
  printGroupedTimeEntries(groupByDay(timeEntries));
}

function printGroupedTimeEntries(groupedTimeEntries) {
  groupedTimeEntries.forEach(printGroupedTimeEntry);
}

function printGroupedTimeEntry(group) {
  const date = momentUtils.getMomentAsString(moment(group.first().get('start')));
  console.log('Tasks for', colors.red.bold(date));
  taskReport(group);
}

function groupByDay(timeEntries) {
  return timeEntries.groupBy(timeEntry => {
    const dateString = moment(timeEntry.get('start')).format('DD.MM.YYYY');
    return dateString;
  });
}

module.exports = printTimeEntriesGroupedByTask;
