const immutable = require('immutable');
const momentUtils = require('../momentUtils');
const Table = require('cli-table');


function printTimeEntriesGroupedByTask(timeEntries) {
  const table = new Table({
    head: ['Project', 'Task', 'Duration'],
    colWidths: [20, 20, 20]
  });

  printTimeEntryGroups(groupByTask(timeEntries), table);
  printTable(table);
}

function printTimeEntryGroups(timeEntryGroups, table) {
  createReportData(timeEntryGroups).forEach(reportData => printReportData(reportData, table));
}

function groupByTask(timeEntries) {
  return timeEntries.groupBy(timeEntry => timeEntry.get('description'));
}

function createReportData(timeEntryGroups) {
  return timeEntryGroups.map(createReportDataForGroup);
}

function createReportDataForGroup(group) {
  const totalDurationForGroup = calculateDurationForGroup(group);
  const projectName = group.first().getIn(['project', 'name']);
  const description = group.first().get('description');

  return immutable.fromJS({
    projectName,
    description,
    duration: totalDurationForGroup,
  });
}

function calculateDurationForGroup(group) {
  return group.valueSeq().reduce((totalDuration, timeEntry) => totalDuration + timeEntry.get('duration'), 0);
}

function printReportData(reportData, table) {
  const durationAsString = momentUtils.getDurationInSecondsAsString(reportData.get('duration'));

  table.push([
    reportData.get('projectName'),
    reportData.get('description'),
    durationAsString,
  ]);
}

function printTable(table) {
  console.log(table.toString());
}

module.exports = printTimeEntriesGroupedByTask;
