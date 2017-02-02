const colors = require('colors/safe');
const moment = require('moment');
const timelogReport = require('./timelogReport');
const momentUtils = require('../momentUtils');
const utils = require('../utils');

function printTimelogsGroupedByDay(timelogs) {
  printGroupedTimelogs(groupTimelogsByDate(timelogs));
}

function printGroupedTimelogs(groupedTimelogs) {
  groupedTimelogs.forEach(printGroupedTimelog);
}

function printGroupedTimelog(group) {
  const date = momentUtils.getMomentAsString(moment(group.first().get('trackedDate')));
  console.log('Tasks for', colors.red.bold(date));
  timelogReport(group);
}

function groupTimelogsByDate(timelogs) {
  return timelogs.groupBy(timelog => timelog.get('trackedDate'));
}

module.exports = printTimelogsGroupedByDay;
