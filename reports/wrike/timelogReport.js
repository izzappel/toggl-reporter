const immutable = require('immutable');
const colors = require('colors/safe');
const Table = require('cli-table2');
const Timelog = require('../../model/Timelog');
const momentUtils = require('../../momentUtils');
const utils = require('../../utils');


function printTimelogsGroupedByTask(timelogs) {
  const table = new Table({
    head: ['Task', 'Duration'],
    colWidths: [50, 20]
  });

  const timelogsPerGroup =
    sortByTask(
      createReportData(
        groupByTask(timelogs)
      )
    );

  timelogsPerGroup.forEach(timelog => printTimelog(timelog, table));
  printFooterReportTotal(timelogsPerGroup, table);

  printTable(table);
}

function groupByTask(timelogs) {
  return timelogs.groupBy(timelogs => timelogs.get('taskId'));
}

function createReportData(timelogGroups) {
  return timelogGroups.map(createReportDataForGroup);
}

function sortByTask(timelogs) {
  return timelogs.sort((timelog1, timelog2) => timelog1.getTaskTitle().localeCompare(timelog2.getTaskTitle()));
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
    timelog.getTaskTitle(),
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
