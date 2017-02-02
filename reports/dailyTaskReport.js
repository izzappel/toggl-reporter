const colors = require('colors/safe');
const moment = require('moment');
const taskReport = require('./taskReport');
const momentUtils = require('../momentUtils');
const utils = require('../utils');

function printTimeEntriesGroupedByTask(timeEntries) {
  printGroupedTimeEntries(utils.groupTimeEntriesByDay(timeEntries));
}

function printGroupedTimeEntries(groupedTimeEntries) {
  groupedTimeEntries.forEach(printGroupedTimeEntry);
}

function printGroupedTimeEntry(group) {
  const date = momentUtils.getMomentAsString(moment(group.first().get('start')));
  console.log('Tasks for', colors.red.bold(date));
  taskReport(group);
}

module.exports = printTimeEntriesGroupedByTask;
