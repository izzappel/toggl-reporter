const colors = require('colors/safe');
const moment = require('moment');
const timelogReport = require('./timelogReport');
const momentUtils = require('../../momentUtils');
const utils = require('../../utils');

function printTimelogsGroupedByDay(timelogs) {
  printGroupedTimelogs(
    sortGroupByDate(
      groupTimelogsByDate(timelogs)
    )
  );
}

function groupTimelogsByDate(timelogs) {
  return timelogs.groupBy(timelog => timelog.get('trackedDate'));
}

function sortGroupByDate(groupedTimelogs) {
  return groupedTimelogs.sort((group1, group2) => momentUtils.compareMoments(moment(group1.first().get('trackedDate')), moment(group2.first().get('trackedDate'))));
}

function printGroupedTimelogs(groupedTimelogs) {
  groupedTimelogs.forEach(printGroupedTimelog);
}

function printGroupedTimelog(group) {
  const date = momentUtils.getMomentAsString(moment(group.first().get('trackedDate')));
  console.log('Tasks for', colors.red.bold(date));
  timelogReport(group);
}

module.exports = printTimelogsGroupedByDay;
