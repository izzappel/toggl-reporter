const immutable = require('immutable');
const colors = require('colors/safe');
const Table = require('cli-table2');
const Timelog = require('../model/Timelog');
const momentUtils = require('../momentUtils');
const utils = require('../utils');


function printTimelogsGroupedByTask(timelogs) {
  const table = new Table({
    head: ['Task', 'Duration'],
    colWidths: [50, 20]
  });

  printTimelogGroups(groupByTask(timelogs), table);
  printTable(table);
}

function printTimelogGroups(timelogGroups, table) {
  const timelogsPerGroup = createReportData(timelogGroups);
  timelogsPerGroup.forEach(timelog => printTimelog(timelog, table));
  printFooterReportTotal(timelogsPerGroup, table);
}

function groupByTask(timelogs) {
  return timelogs.groupBy(timelogs => timelogs.get('taskId'));
}

function createReportData(timelogGroups) {
  return timelogGroups.map(createReportDataForGroup);
}

function createReportDataForGroup(group) {
  const totalDurationForGroup = calculateDurationForGroup(group);

  return new Timelog({
    task: group.first().get('task'),
    hours: totalDurationForGroup,
  });
}

function calculateDurationForGroup(group) {
  return group.valueSeq().reduce((totalDuration, timelog) => { return totalDuration + timelog.get('hours')}, 0);
}

function printTimelog(timelog, table) {
  table.push([
    timelog.getIn(['task', 'title']),
    momentUtils.getDurationInHoursAsString(timelog.get('hours')),
  ]);
}

function printFooterReportTotal(timelogsPerGroup, table) {
  const accumulatedDuration = momentUtils.getDurationInHoursAsString(calculateDurationForTotal(timelogsPerGroup));

  table.push([
    colors.red('Total'),
    colors.red.bold(accumulatedDuration)
  ]);
}

function calculateDurationForTotal(timelogsPerGroup) {
  return timelogsPerGroup
    .valueSeq()
    .reduce((totalDuration, timelog) => totalDuration + timelog.get('hours'), 0);
}

function printTable(table) {
  console.log(table.toString());
}

module.exports = printTimelogsGroupedByTask;
