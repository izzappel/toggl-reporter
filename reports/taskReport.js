const immutable = require('immutable');
const colors = require('colors/safe');
const Table = require('cli-table2');
const TimeEntry = require('../model/TimeEntry');
const momentUtils = require('../momentUtils');
const utils = require('../utils');


function printTimeEntriesGroupedByTask(timeEntries) {
  const table = new Table({
    head: ['Project', 'Task', 'Duration'],
    colWidths: [20, 30, 20]
  });

  printTimeEntryGroups(groupByTask(timeEntries), table);
  printTable(table);
}

function printTimeEntryGroups(timeEntryGroups, table) {
  const timeEntriesPerGroup = createReportData(timeEntryGroups);
  timeEntriesPerGroup.forEach(timeEntry => printTimeEntry(timeEntry, table));
  printFooterReportTotal(timeEntriesPerGroup, table);
}

function groupByTask(timeEntries) {
  return timeEntries.groupBy(timeEntry => timeEntry.get('description'));
}

function createReportData(timeEntryGroups) {
  return timeEntryGroups.map(createReportDataForGroup);
}

function createReportDataForGroup(group) {
  const totalDurationForGroup = calculateDurationForGroup(group);

  return new TimeEntry({
    project: group.first().get('project'),
    description: group.first().get('description'),
    duration: totalDurationForGroup,
  });
}

function calculateDurationForGroup(group) {
  return group.valueSeq().reduce((totalDuration, timeEntry) => totalDuration + timeEntry.getDuration(), 0);
}

function printTimeEntry(timeEntry, table) {
  const durationAsString = momentUtils.getDurationInSecondsAsString(timeEntry.getDuration());

  if (timeEntry.get('project').isPrivate()) {
    table.push([
      colors.gray(timeEntry.getProjectName()),
      colors.gray(timeEntry.get('description')),
      colors.gray(durationAsString),
    ]);
  } else {
    table.push([
      timeEntry.getProjectName(),
      timeEntry.get('description'),
      durationAsString,
    ]);
  }
}

function printFooterReportTotal(timeEntriesPerGroup, table) {
  const accumulatedDuration = calculateDurationForTotal(timeEntriesPerGroup);

  table.push([
    { colSpan: 2, content: colors.red('Total') },
    colors.red.bold(momentUtils.getDurationInSecondsAsString(accumulatedDuration))
  ]);
}

function calculateDurationForTotal(timeEntriesPerGroup) {
  return timeEntriesPerGroup
    .valueSeq()
    .reduce((totalDuration, timeEntry) => totalDuration + timeEntry.getBillableDuration(), 0);
}

function printTable(table) {
  console.log(table.toString());
}

module.exports = printTimeEntriesGroupedByTask;
